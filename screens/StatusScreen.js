import React,{ useEffect  } from 'react';
import { StyleSheet, Text, View,StatusBar,Image,TextInput,TouchableOpacity,ScrollView,
Modal,Pressable,Platform,ActivityIndicator  } from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons'
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios  from 'axios';
const StatusScreen = (props) => {    
  const [data, setData] = React.useState({    
    reminderVisible: false,
    reminder_time:'',
    cslist: [],
    pslist: [],
    cslist_len:'',
    pslist_len:'',
    isLoading:true
  });


  function fetchStatus(){        
    try {
      const syncUserInfo = AsyncStorage.getItem("user_info")
        .then(syncResponse => {
          let parseObject = JSON.parse(syncResponse);
          var uid = parseObject.id;
          var user_token = parseObject.token;
          if (uid != null) {
            try {
              const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/fetch-status.php", {
                uid, user_token,
              })
                .then(res => {
                  if(res.data.status=="OK"){                    
                    setData({
                      ...data,
                      cslist:res.data.csstatus,
                      cslist_len:res.data.csstatus_len,
                      psstatus_len:res.data.psstatus_len,
                      pslist:res.data.psstatus,
                      isLoading:false                      
                    });                       
                  
                  }
                  else{
                    alert("in status")
                  }                 
                })
            }
            catch (error) {
              console.log("Error while fetching status on status screen=" + error)
            }
          }

        });
    }
    catch (e) {
      console.log("Error while fetching status on status screen=" + e)
    }
  }
  

  useEffect(() => {    
    const timer = setTimeout(() =>  fetchStatus(), 2000);
    return () => clearTimeout(timer);     
   }, []);
  
   if(data.isLoading){
    return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator animating={true} size="large" color="#000"/>
        <Text style={{color:'black',textAlign:'center',alignItems:'center'}}>Please wait... while we are fetching your status information.</Text>
      </View>
    )
  }

  return(
    <View style={styles.container}>       
       <StatusBar backgroundColor="#271933" barStyle="light-content" />
          <View style={styles.logo}>
            <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 10, width: 170, height: 55 }} />
          </View>
          
          <View style={[styles.messagesCard, styles.elevation]}>
            
            <View style={{flexDirection:'row'}}>
            
              <TouchableOpacity style={styles.btnTouch}>                
                  <Text style={styles.btnText}>
                   MY STATUS
                  </Text>                                               
              </TouchableOpacity>                                                  
            </View>
          </View>
          <ScrollView style={{marginTop:2,flex: 1,height:'100%',}}>              
            {
              data.cslist_len>0?(
              <View style={[styles.messagesCard, styles.elevation]}>
                <View style={{flexDirection:'row',paddingBottom:10}}>
                  <Text style={{fontSize:16,fontWeight:'bold'}}>Today ({data.cslist.fcdate})</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.status_card}>Current Status</Text>                                  
                </View>

                <View style={{flexDirection:'row',paddingTop:15,flexGrow: 1, flex: 1,}}>
                  <Text style={styles.long_txt}>{data.cslist.label_one}</Text>
                </View>   
                {data.cslist.label_two?(
                <View  style={{flexDirection:'row',paddingTop:15,flexGrow: 1, flex: 1,}}>
                  {data.cslist.label_two=="Transfer calls to"?(
                    <Text style={styles.long_txt}t>{data.cslist.label_two} - {data.cslist.employee_name}</Text>                    
                  ):(<Text style={styles.long_txt}t>{data.cslist.label_two}</Text>)}
                </View>
                ):(null)}

            </View> 
              ):(
                <View style={[styles.messagesCard, styles.elevation]}>     

                <View style={{flexDirection:'row'}}>
                  <Text style={styles.status_card}>Current Status</Text>                                  
                </View>

                <View style={{flexDirection:'row'}}>
                  <Text style={styles.status_card_empty}>No status has been saved by you.</Text>                                  
                </View>

                <View style={styles.blank_view}>
                   <Text></Text>
                </View> 
                
            </View> 
              )}

              <View style={[styles.messagesCard, styles.elevation]}> 
                <View style={{flexDirection:'row',paddingBottom:5}}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>Prescheduled Status</Text>
                  </View>
                 {data.psstatus_len>0?(
               <View>
                 {                            
                data.pslist.map((records, index) => (                     
              <View key={records.id}>
                <View style={{flexDirection:'row',paddingTop:5,flexGrow: 1, flex: 1,}}>
                  <Text style={styles.long_txt_lable}>From: </Text><Text style={styles.long_txt}>{records.pfdate} 
                  {records.ftime?' at '+records.ftime:null}
                  </Text>
                </View> 
         
                <View style={{flexDirection:'row',paddingTop:10,flexGrow: 1, flex: 1,}}>
                  <Text style={styles.long_txt_lable}>To: </Text><Text style={styles.long_txt}>{records.ptdate} 
                  {records.ttime?' at '+records.ttime:null}</Text>
                </View> 

                
                <View style={{flexDirection:'row',paddingTop:15,flexGrow: 1, flex: 1,}}>
                    <Text style={styles.long_txt}>{records.label_one}</Text>                                          
                </View>
                {records.label_two!='Transfer calls to'?( 
                <View style={{flexDirection:'row',paddingTop:15,flexGrow: 1, flex: 1,}}>
                    <Text style={styles.long_txt}>{records.label_two}</Text>                              
                </View>
                ):(null)}

                {records.employee_name?(
                  <View style={{flexDirection:'row',paddingTop:10,flexGrow: 1, flex: 1,}}>
                  <Text style={styles.long_txt}>Transfer calls to - {records.employee_name}</Text>
              </View>
                ):(null)}

                <View style={styles.blank_view}>
                   <Text></Text>
                </View>   
                  
              </View>  
               ))
              } 
              </View>
                 ):(
                  <View style={[styles.messagesCard, styles.elevation]}>               
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.status_card_empty}>No prescheduled status was saved by you.</Text>                                  
                  </View>
                  
              </View> 
                 )} 
              </View>
                 

          </ScrollView>          
        <BottomTabNavigationScreen navigation={props.navigation} route={props.route} />           
      </View>
  )

  
}

export default StatusScreen;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'stretch',          
      justifyContent: 'center',
      backgroundColor:'#271933',
      flexDirection:'column'
    }, 
    logo: {
      marginTop: 20,
      backgroundColor: '#271933',
      borderRadius: 8,
      height: 65,
      margin: 7,
    },
    messagesCard: {
      backgroundColor: '#f1f1f1',
      borderRadius: 8,      
      width: '100%',
      marginVertical: 2,
      shadowOpacity: 1,
      shadowRadius: 3,
      shadowOffset: {
        height: 0,
        width: 0
      },
      padding:15
      

    }, 
    btnTouch:{
      backgroundColor:'#1BB467',      
      padding:8,            
      borderRadius:5, 
      flex:1,                 
      justifyContent:'space-around'
      
    },
    
    btnText:{
      fontSize:18,
      textAlign:'center' ,      
      color:'#fff',    
      padding:5,
      paddingBottom:5,      
          
    },
    status_card:{
      width:'70%',
      fontSize:20,
      fontWeight:'bold'
    },
    status_card_empty:{
      width:'100%',
      fontSize:17,
      fontWeight:'bold',
      alignContent:'center',
      paddingLeft:1,
      padding:10,
      margin:2
    },
    available_card:{
      fontSize:18,
      fontWeight:'bold'            
    },
    long_txt:{      
      fontSize: 21,
      textAlign:'justify',      
    },
    long_txt_lable:{
      fontSize: 20,
      fontWeight:'bold',
      width:'20%'
    },
    input:{
      width:"95%",    
      borderColor:'#271833',
      padding:10,
      margin:8,
      borderRadius:5,
      fontSize:18,
      borderWidth:1      
    },
    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#F1F1F1',
      flex: 1
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
    innerModalText:
    {
      color: 'black',
      fontSize: 18,
      paddingLeft: 5,
      paddingTop: 5
    },
    buttonClose: {
      backgroundColor: "#1BB467",
      padding: 7,
      borderRadius: 5,
      color: 'white'
    },
    reminderContainer: {
      marginTop: Platform.OS === 'ios' ? 130 : 40
    },
    buttonPopupClose: {
      backgroundColor: "red",
      padding: 16,
      borderRadius: 5,
      color: 'white'
    },
    blank_view:{
      marginTop: Platform.OS === 'ios' ? 20 : 10
    },
});
