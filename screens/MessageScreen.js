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
  Picker,
  ActivityIndicator
} from 'react-native';
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { render } from 'react-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


class MessageScreen extends React.Component {
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

    }
    //this.searchMessages = this.searchMessages.bind(this);
    this.selectedIndex = this.selectedIndex.bind(this);
    this.unlockMessage = this.unlockMessage.bind(this);
  }

  componentDidMount() {
    this.handleListing();
  }
  handleListing = () => {
    try {
      const syncUserInfo = AsyncStorage.getItem("user_info")
        .then(syncResponse => {
          let parseObject = JSON.parse(syncResponse);
          var uid = parseObject.id;
          var user_token = parseObject.token;
          if (uid != null) {
            try {
              const signInRes = axios.post("https://iosapi.taraville.com/api/v1/messages/listing.php", {
                uid, user_token
              })
                .then(res => {                  
                  this.setState({
                    screenLoader: true,
                    listing: res.data.listing
                  });                  
                })
            }
            catch (error) {
              console.log("Error while fetching messages on message screen=" + error)
            }
          }

        });
    }
    catch (e) {
      console.log("Error while fetching messages on message screen=" + e)
    }

  }

  searchMessages = async () => {
    const user_id = AsyncStorage.getItem("id");
  }
  setModalVisible = (message_id,visible) => {

    this.setState({ modalVisible: visible,message_id:message_id })
    this.setState({ notesModalVisible: false })
    this.setState({ callModalVisible: false })
    this.setState({ reminderVisible: false })
  }


  setCallModalVisible = (visible) => {
    this.setState({ callModalVisible: visible })
    this.setState({ modalVisible: false })
    this.setState({ notesModalVisible: false })
    this.setState({ reminderVisible: false })
  }

  setNotesModalVisible = (message_id,visible) => {
    this.setState({ notesModalVisible: visible,message_id:message_id })
    this.setState({ modalVisible: false })
    this.setState({ callModalVisible: false })
    this.setState({ reminderVisible: false })
  }
  setReminderVisible = (visible) => {
    this.setState({ reminderVisible: visible })
    this.setState({ notesModalVisible: false })
    this.setState({ modalVisible: false })
    this.setState({ callModalVisible: false })

  }
  
  unlockMessage(){
    const{message_id,private_code} = this.state;    
    if(private_code){
      try {
        const syncUserInfo = AsyncStorage.getItem("user_info")
          .then(syncResponse => {
            let parseObject = JSON.parse(syncResponse);
            var uid = parseObject.id;
            var user_token = parseObject.token;
            if (uid != null) {
              try 
              {
                  const signInRes = axios.post("https://iosapi.taraville.com/api/v1/messages/verify-code.php", {
                    uid, user_token,message_id,private_code
                  })
                  .then(res => {                  
                    if(res.data.status=="OK"){
                        alert("Your code has been successfully verified.");
                        this.setState({screenLoader:false})
                        this.setModalVisible(message_id,false);
                        this.handleListing();
                    }
                    else{
                        alert("Sorry, this code is invalid.")
                    }
                    
                  })
              }
              catch (error) {
                console.log("Error while fetching messages on message screen=" + error)
              }
            }
    
          });
      }
      catch (e) {
        console.log("Error while fetching messages on message screen=" + e)
      }
    }
    else{
      alert("Please enter 6 digit code to unlock this message.")
    }
    

  }

  saveNotes() {
    const { notes } = this.state;
    try {
      const syncUserInfo = AsyncStorage.getItem("user_info").then(syncResponse => {
        let parseObject = JSON.parse(syncResponse);
      })

    }
    catch (error) {
      console.log("Error while getting asyncstorage on message screen=" + error);
    }
  }

  selectedIndex(index) {
    alert(index)
  }
  render() {

    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];

    const { modalVisible, callModalVisible, notesModalVisible, reminderVisible, screenLoader,listing } = this.state;
    if (screenLoader) {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#271933" barStyle="light-content" />
          <View style={styles.logo}>
            <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 10, width: 170, height: 55 }} />
          </View>
          <View style={[styles.messagesCard, styles.elevation]}>
            <View style={{ flexDirection: 'row' }}>
              <TextInput style={styles.input} placeholder="Search:" />
              <Text>
                <TouchableOpacity onPress={this.searchMessages}>
                  <IonicIcon name={'search-outline'} color={'black'} size={25} style={{ paddingTop: 18 }} />
                </TouchableOpacity>
              </Text>
            </View>
          </View>
          <ScrollView style={{ marginTop: 2, margin: 3, flex: 1, height: '100%', }}>
          {
             listing.map((records, index) => (
            <View style={[styles.messagesCard, styles.elevation]}>
                             
              <View style={{ flexDirection: 'row', margin: 2, width: '100%' }}>
                <Text style={{ width: '50%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}>Date: {records.date_added}</Text>
                  </View>
                </Text>

                <TouchableOpacity onPress={() => this.setCallModalVisible(true)}>
                  <Text style={{ width: '100%', borderWidth: 0, paddingRight: 10 }}>
                    <View style={styles.dateRow}>
                      <Text style={styles.innerText}>
                        <IonicIcon name={'call-outline'} color={'black'} size={20} /></Text>
                    </View>
                  </Text>
                </TouchableOpacity>
                {records.message_type=='Yes'?(
                <TouchableOpacity onPress={() => this.setModalVisible(records.id,true)}>
                  <Text style={{ width: '100%', borderWidth: 0, paddingRight: 10 }}>
                    <View style={styles.dateRow}>
                      <Text style={styles.innerText}>
                        <IonicIcon name={'lock-closed'} color={'#6E2E35'} size={20} /></Text>
                    </View>
                  </Text>
                </TouchableOpacity>)
                :(null)
              }

                <TouchableOpacity onPress={() => this.setNotesModalVisible(records.id,true)}>
                  <Text style={{ width: '100%', borderWidth: 0, paddingRight: 10 }}>
                    <View style={styles.dateRow}>
                      <Text style={styles.innerText}>
                        <IonicIcon name={'document-text-outline'} color={'black'} size={20} /></Text>
                    </View>
                  </Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                  <Text style={{ width: '100%', borderWidth: 0, paddingRight: 10 }}>
                    <View style={styles.dateRow}>
                      <Text style={styles.innerText}>
                        <IonicIcon name={'archive-outline'} color={'black'} size={20} /></Text>
                    </View>
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.setReminderVisible(true)}>
                  <Text style={{ width: '100%', borderWidth: 0, paddingRight: 10 }}>
                    <View style={styles.dateRow}>
                      <Text style={styles.bell_icon}>
                        <Image source={require("../assets/bell_icon.png")} style={{ resizeMode: 'contain', width: 22, height: 20 }} />
                      </Text>
                    </View>
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', margin: 1, width: '100%' }}>
                <Text style={{ width: '40%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}>Time: {records.log_time}</Text>
                  </View>
                </Text>
              </View>

              <View style={{ flexDirection: 'row', margin: 1, width: '100%' }}>
                <Text style={{ width: '70%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}>Customer name: {records.name}</Text>
                  </View>
                </Text>
              </View>

              <View style={{ flexDirection: 'row', margin: 1, width: '100%' }}>
                <Text style={{ width: '70%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}>Phone #: {records.phone}</Text>
                  </View>
                </Text>
              </View>
              {records.message_type=='Yes'?( 
              <View style={{ flexDirection: 'row', flexGrow: 1, flex: 1 }}>
                <Text style={styles.long_text}>
                  This message is private. Please unlock it by entering 6 digit code.
                </Text>
              </View>
              ):(<View style={{ flexDirection: 'row', flexGrow: 1, flex: 1 }}>
              <Text style={styles.long_text}>
                {records.call_notes}
              </Text>
            </View>)
              }

              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                
                <Text style={{ backgroundColor:'#'+records.color_code, padding: 5,  color: '#'+records.font_color_code, borderRadius: 5 }}>                                 
                  {records.action_taken}                 
                </Text>
              </View>

              <View style={{ borderBottomWidth: 1, borderBottomColor: '#C1C1C1', marginBottom: 6, }}><Text></Text></View>              

            </View>

            ))
          }

            <View style={styles.blank_view}>
              <Text style={styles.input}></Text>
            </View>
          </ScrollView>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onClickOutside={this.onClickOutside}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.innerModalText}>Please enter 6 digit code to unlock this message.</Text>
                <TextInput style={styles.modalInput} onChangeText={(private_code)=>this.setState({private_code:private_code})} placeholder="Enter code:" />


                <View>
                  <TouchableOpacity onPress={()=>this.unlockMessage()} style={styles.buttonClose}>
                    <Text style={{ color: 'white', padding: 5, alignSelf: 'center', textAlign: 'center', fontSize: 16 }}>Submit</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'flex-end', marginTop: 15 }}>
                  <Pressable
                    style={styles.buttonPopupClose}
                    onPress={() => this.setModalVisible('',!modalVisible)}
                  >
                    <Text style={{ color: 'white', padding: 5 }}>CLOSE</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={callModalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.innerModalText}>Request for call</Text>
                <TextInput style={styles.modalInput} numberOfLines={4} multiline={true} />
                <View>
                  <TouchableOpacity style={styles.buttonClose}>
                    <Text style={{ color: 'white', padding: 5, alignSelf: 'center', textAlign: 'center', fontSize: 16 }}>SUBMIT</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'flex-end', marginTop: 15 }}>
                  <Pressable
                    style={styles.buttonPopupClose}
                    onPress={() => this.setCallModalVisible(!callModalVisible)}
                  >
                    <Text style={{ color: 'white', padding: 5 }}>CLOSE</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>


          <Modal
            animationType="fade"
            transparent={true}
            visible={notesModalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.innerModalText}>Notes</Text>
                <TextInput onChangeText={(notes) => this.setState({ notes: notes })} style={styles.modalInput} multiline={true} numberOfLines={4} />
                <View>
                  <TouchableOpacity style={styles.buttonClose}>
                    <Text onPress={() => this.saveNotes()} style={{ color: 'white', padding: 5, alignSelf: 'center', textAlign: 'center', fontSize: 16 }}>SUBMIT</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'flex-end', marginTop: 15 }}>
                  <Pressable
                    style={styles.buttonPopupClose}
                    onPress={() => this.setNotesModalVisible('',!notesModalVisible)}
                  >
                    <Text style={{ color: 'white', padding: 5 }}>CLOSE</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={reminderVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.innerModalText}>Set Reminder</Text>
                <View style={{ borderWidth: 1, borderColor: '#C1C1C1', width: "100%", marginTop: 10 }}>
                  <Picker
                    selectedValue={"Select"}
                    style={{ height: 50, width: '100%', padding: 10, borderWidth: 1, borderColor: '#C1C1C1', }}
                    onValueChange={(itemValue, itemIndex) => this.selectedIndex(itemValue)}
                  >
                    <Picker.Item label="Select" value="" />
                    <Picker.Item label="15 min." value="15 min." />
                    <Picker.Item label="30 min." value="30 min." />
                    <Picker.Item label="1 hour" value="1 hour" />
                    <Picker.Item label="4 hours" value="4 hours" />
                    <Picker.Item label="24 hours" value="24 hours" />
                    <Picker.Item label="7 days" value="7 days" />
                    <Picker.Item label="30 days" value="30 days" />
                  </Picker>
                </View>
                <View style={styles.reminderContainer}>
                  <TouchableOpacity style={styles.buttonClose}>
                    <Text style={{ color: 'white', padding: 5, alignSelf: 'center', textAlign: 'center', fontSize: 16 }}>SUBMIT</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'flex-end', marginTop: 15 }}>
                  <Pressable
                    style={styles.buttonPopupClose}
                    onPress={() => this.setReminderVisible(!reminderVisible)}
                  >
                    <Text style={{ color: 'white', padding: 5 }}>CLOSE</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>



          <BottomTabNavigationScreen navigation={this.props.navigation} route={this.props.route} />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} size="large" color="#FFF" />
          <Text style={{ color: 'white', textAlign: 'center', alignItems: 'center' }}>Please wait... while we are fetching your messages.</Text>
        </View>
      )
    }
  }
}
export default MessageScreen;
const styles = StyleSheet.create
  ({
    container: {
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: '#271933',
      flexDirection: 'column'
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
      width: "85%",
      borderColor: '#271833',
      padding: 7,
      margin: 8,
      borderRadius: 5,
      fontSize: 18,
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
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 10,
      width: '100%',
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
      lineHeight: 20,
      fontSize: 15
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
      marginTop: Platform.OS === 'ios' ? 20 : 70
    },
  });