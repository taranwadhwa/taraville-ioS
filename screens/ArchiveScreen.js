import React from 'react';
import {
  StyleSheet, Text, View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Modal,
  Pressable,
  Platform,
  Alert,  
  ActivityIndicator,
  TouchableWithoutFeedback, Keyboard,LogBox,RefreshControl 
} from 'react-native';
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

LogBox.ignoreAllLogs();

class ArchiveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dobText: '',
      dobDate: null,
      modalVisible: false,
      callModalVisible: false,
      notesModalVisible: false,
      reminderVisible: false,
      notes: '',
      listing: [],
      screenLoader: false,
      private_code:'',
      message_id:'',
      reminder_time:'',
      notes_input:'',
      call_request:'',
      call_input:'',
      search_txt:'',
      scrollLoader:false,

    }        
    this.refreshScreen = this.refreshScreen.bind(this);
  }

  componentDidMount() {
    this.handleArchiveListing();
  }
  handleArchiveListing = () => {   
    try {
      const syncUserInfo = AsyncStorage.getItem("user_info")
        .then(syncResponse => {
          let parseObject = JSON.parse(syncResponse);
          var uid = parseObject.id;
          var user_token = parseObject.token;
          if (uid != null) {
            try {
              const signInRes = axios.post("https://iosapi.taraville.com/api/v1/messages/archived-listing.php", {
                uid, user_token
              })
                .then(res => {
                  if(res.data.status=="OK"){                    
                    this.setState({
                      screenLoader: true,
                      listing: res.data.listing,                                                               
                    }); 
                  }
                  else{
                    this.setState({ screenLoader: true });                           
                  }                 
                })
            }
            catch (error) {
              console.log("Error while fetching messages on archive message screen=" + error)
            }
          }

        });
    }
    catch (e) {
      console.log("Error while fetching messages on archive message screen=" + e)
    }

  }

  handleSearch = async () => {        
    Keyboard.dismiss();
    const{search_txt} = this.state;    
    if(search_txt)
    {
      try {
        const syncUserInfo = AsyncStorage.getItem("user_info")
          .then(syncResponse => {
            let parseObject = JSON.parse(syncResponse);
            var uid = parseObject.id;
            var user_token = parseObject.token;
            if (uid != null) {
              try {
                const searchRes = axios.post("https://iosapi.taraville.com/api/v1/messages/search.php", {
                  uid, user_token,search_txt
                })
                  .then(res => {                       
                    if(res.data.status=="OK"){               
                    this.setState({
                      listing: res.data.listing
                    });
                  }
                  else{
                    alert("No record(s) found")
                  }                  
                  })
              }
              catch (error) {
                console.log("Error while search fetching messages on message screen=" + error)
              }
            }
  
          });
      }
      catch (e) {
        console.log("Error while search fetching messages on message screen=" + e)
      }


    }

  }
  


  
 
  openSelectedMessage(messageID){      
    if(messageID)
    {
       this.setState({scrollLoader:true});
      // START //
        try {
          const syncUserInfo = AsyncStorage.getItem("user_info")
            .then(syncResponse => {
              let parseObject = JSON.parse(syncResponse);
              var uid = parseObject.id;
              var user_token = parseObject.token;              
              if (uid != null) {
                try {
                  const searchRes = axios.post("https://iosapi.taraville.com/api/v1/messages/open.php", {
                    uid,user_token,messageID
                  })
                    .then(res => {                                            
                      if(res.data.status=="OK"){                                    
                        this.setState({                            
                            listing: res.data.listing,
                            scrollLoader: false,                                                               
                          }); 
                     
                    }
                    else{
                      alert("No record(s) found")
                      this.setState({scrollLoader:false});
                    }  
                                   
                    })
                }
                catch (error) {
                  console.log("Error while search fetching messages on archive message screen=" + error)
                }
              }
    
            });
        }
        catch (e) {
          console.log("Error while search fetching messages on archive message screen=" + e)
        }

        // ENDS //
    }

  }

  OpenMessage(messageID){
    Alert.alert(
      "Archive Message",
      "Are you sure you want to restore this message",
      [        
        {
          text: "No",         
          style: "cancel"
        },
        { text: "YES", onPress: () => this.openSelectedMessage(messageID) }
      ]
    );

  }
  

 
  refreshScreen(){    
    this.props.navigation.replace('Archive')
  }
  

  render() {    
    const {screenLoader,listing } = this.state;
    if (screenLoader) {
      return (
        <View style={styles.container}>          

          <StatusBar backgroundColor="#271933" barStyle="light-content"/> 
          <View style={styles.topHeader}>           
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Status')}><Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 4, width: 110, height: 49 }} /></TouchableOpacity>                            
          </View>                    
        
        
          <View style={styles.tabMessagesCard}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Message')}  style={{textAlign:'center',width:'50%',padding:13,fontSize:16,backgroundColor:'#D3D3D3',borderRadius:5,color:'#A9A9A9'}}>
                <Text style={{color:'#A9A9A9'}}>
                <IonicIcon name={'notifications'} color={'#A9A9A9'} size={15}  /> New Messages </Text>  
            </TouchableOpacity>                 
                <Text style={{width:'1%'}}></Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Archive')} style={{textAlign:'center',width:'50%',padding:13,fontSize:16,backgroundColor:'#1BB467',borderRadius:5,color:'#FFFFFF'}}>
                  <Text style={{color:'#FFFFFF'}}>
                  <IonicIcon name={'archive'} color={'#FFFFFF'} size={15}  /> Archived Messages</Text>
                </TouchableOpacity>
             </View>           
          
            {this.state.scrollLoader?(
            <View style={[styles.messagesCard, styles.elevation]}><ActivityIndicator animating={true} size="large" color="#FFF"></ActivityIndicator>
            <Text style={{color:'black',textAlign:'center',alignItems:'center'}}>Please wait... while we are restoring this message.</Text>
            </View>):(

          <ScrollView style={{ marginTop: 1, margin: 1, flex: 1, height: '100%', }} refreshControl={<RefreshControl refreshing={!screenLoader} onRefresh={this.handleListing} />}>                          
             
             {listing.length>0?(                      
            <View style={[styles.messagesCard, styles.elevation]}>              
            {                            
               listing.map((records, index) => (
              <View key={records.id}>
              <View style={{ flexDirection: 'row', padding:3, margin: 2, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '50%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Date:</Text> {records.fdate_added}</Text>
                  </View>
                </Text>                                           
                <TouchableOpacity onPress={() => this.OpenMessage(records.id)}>
                  <Text style={{ width: '100%', borderWidth: 0, paddingRight: 10 }}>
                    <View style={styles.dateRow}>
                      <Text style={styles.innerText}>
                        <IonicIcon name={'refresh-outline'} color={'black'} size={20} /></Text>
                    </View>
                  </Text>
                </TouchableOpacity>

                
              </View>
              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '40%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Time:</Text> {records.log_time}</Text>
                  </View>
                </Text>
              </View>

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Customer name:</Text> {records.name}</Text>
                  </View>
                </Text>
              </View>

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '70%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Phone #:</Text> {records.phone}</Text>
                  </View>
                </Text>
              </View>
              

              {records.message_type=='Yes'?( 
              <View style={{ flexDirection: 'row', flexGrow: 1, flex: 1,padding:3,margin: 1 }}>
                <Text style={styles.long_text}>
                  This message is private. Please unlock it by entering 6 digit code.
                </Text>
              </View>
              ):(
              
              <View style={{ flexDirection: 'row', flexGrow: 1, flex: 1,padding:3,margin: 1 }}>
              <Text style={styles.long_text}>
                {records.call_notes}
              </Text>
              
            </View>)
              }
              
              {
              records.numberOfComments>0?(
              <View style={{ flexDirection: 'row', flexGrow: 1, flex: 1,padding:3,margin:1 }}>
                <Text style={{paddingLeft:3,fontSize:11}}>
                  {records.numberOfComments} Comment(s) added by you.
                </Text>              
              </View>)              
            :(null)
              }                             
              <View style={{ flexDirection: 'row', justifyContent:'flex-end' }}>                                               
                <Text style={{ textAlign:'right', alignItems:'flex-end', backgroundColor:'#'+records.color_code, padding: 8,  color: '#'+records.font_color_code }}>                                 
                  {records.action_taken}                 
                </Text>
              </View>

              <View style={{ borderBottomWidth: 1, borderBottomColor: '#C1C1C1', marginBottom: 6, marginTop:6 }}><Text></Text></View>              
              </View>                              
              ))
          }
        
            </View>
             ):(
              <View style={[styles.messagesEmptyCard, styles.elevation]}>
                <Text style={{textAlign:'center',padding:10,fontSize:18}}>No message(s) found.</Text>                
              </View> 

             )
             }

            <View style={styles.blank_view}>
              <Text style={styles.input}></Text>
            </View>
    
          </ScrollView>
            )}
        

          
          <BottomTabNavigationScreen navigation={this.props.navigation} route={this.props.route} />
        </View>
      )
    }
    else {
      return (
        <View style={styles.activity_container}>
          <ActivityIndicator animating={true} size="large" color="#FFF" />
          <Text style={{ color: 'white', textAlign: 'center', alignItems: 'center' }}>Please wait... while we are fetching your messages.</Text>
        </View>
      )
    }
  }
}
export default ArchiveScreen;
const styles = StyleSheet.create
  ({
    container: {
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: '#271933',
      flexDirection: 'column'
    },
    activity_container:{
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#271933',
      flexDirection: 'column',
      justifyContent: 'center',
    },

    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#F1F1F1',
      flex: 1
    },
    dropdown: {
      width: '80%',
    },

    innerModalText:
    {
      color: 'black',
      fontSize: 16,
      paddingLeft: 10,
      paddingTop: 5
    },
    input: {
      width: "78%",
      borderColor: '#271833',
      padding: 7,
      margin: 8,
      borderRadius: 5,
      fontSize: 16,
      borderWidth: 1
    },
    modalInput: {
      width: "98%",
      borderColor: '#271833',
      padding: 7,
      margin: 4,
      marginBottom: 5,
      borderRadius: 5,
      fontSize: 18,
      borderWidth: 1
    },
    buttonClose: {
      backgroundColor: "#1BB467",
      padding: 7,
      borderRadius: 5,
      color: 'white'
    },
    buttonPopupClose: {
      backgroundColor: "red",
      padding: 16,
      borderRadius: 5,
      color: 'white'
    },
    logo: {
      marginTop: 20,
      backgroundColor: '#271933',
      borderRadius: 8,
      height: 65,
      margin: 7,
    },
    calendarCard: {
      backgroundColor: 'white',
      borderRadius: 8,
      paddingVertical: 15,
      paddingHorizontal: 15,
      width: '100%',
      marginVertical: 5,
      flexDirection: 'row'
    },
    elevation: {
      elevation: 20,
      shadowColor: '#FFF',
    },
    heading: {
      backgroundColor: 'white',
      width: '100%',
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'left'
    },
    messagesCard: {
      backgroundColor: '#f1f1f1',
      borderRadius: 5,
      paddingVertical:10,
      paddingHorizontal:10,
      width: '100%',
      marginVertical: 3,
      shadowOpacity: 1,
      shadowRadius: 3,
      shadowOffset: {
        height: 0,
        width: 0
      },      
      margin:1
    },
    tabMessagesCard: {
      flexDirection:'row',
      backgroundColor: '#f1f1f1',
      borderRadius: 5,
      paddingVertical:10,
      paddingHorizontal:10,
      width: '100%',
      marginVertical: 3,
      shadowOpacity: 1,
      shadowRadius: 3,
      shadowOffset: {
        height: 0,
        width: 0
      },      
      margin:1
    },
    messagesEmptyCard:{
      backgroundColor: '#f1f1f1',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 10,
      width: '100%',
      height:'50%',
      marginVertical: 2,
      shadowOpacity: 1,
      shadowRadius: 3,
      shadowOffset: {
        height: 0,
        width: 0
      },

    },
    dateRow: {
      borderWidth: 0,
      padding: 1
    },
    dateColumn: {
      width: '50%',

    },
    innerText: {
      fontSize: 17,
      padding: 1,
    },
    btnTouch: {
      backgroundColor: '#1BB467',
      width: '35%',
      padding: 1,
      borderRadius: 5,
      color: 'white',
      borderWidth: 0,
      alignSelf: 'flex-end'

    },
    long_text: {
      padding: 2,
      lineHeight: 25,
      fontSize: 16,
      textAlign:'justify'
    },

    modalView: {
      margin: 3,
      backgroundColor: "#f1f1f1",
      borderRadius: 15,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '80%',
      height: Platform.OS === 'ios' ? '60%' : '52%'

    },

    bell_icon: {
      marginTop: Platform.OS === 'ios' ? 5 : 1
    },
    reminderContainer: {
      marginTop: Platform.OS === 'ios' ? 130 : 40
    },
    blank_view: {
      marginTop: Platform.OS === 'ios' ? 20 : 40
    },
    label_trick:{
      fontWeight:'bold'
    },
    header_txt: {
      color: '#FFF',
      fontSize: 20,
      marginTop: Platform.OS === 'ios' ? 5 : 10,
      padding: 10,
      alignContent:'space-around',      
    },
    topHeader: {
      flexDirection:'row',
      margin: 1,
      borderRadius: 1,
      backgroundColor: '#271933',        
      height: Platform.OS === 'ios' ? 60 : 60,
      borderColor: '#8658A5',
      top:5,      
      alignContent:'flex-start'
    },
  });