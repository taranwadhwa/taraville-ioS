import React from 'react';
import { StyleSheet, Text, View,StatusBar,Image,TextInput,TouchableOpacity,ScrollView,Modal,Pressable  } from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons'
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen';
import { Picker } from '@react-native-picker/picker';
const StatusScreen = (props) => {  
  
  const [data, setData] = React.useState({    
    reminderVisible: false,
    reminder_time:'',
  });


  const setReminderVisible = (visible) => {
    setData({
      ...data,
      reminderVisible: visible
    });
 
  }

  const selectedIndex=(index)=> {        
    setData({
      ...data,
      reminder_time: index
    });

  }
    
  return(
    <View style={styles.container}>       
       <StatusBar backgroundColor="#271933" barStyle="light-content" />
          <View style={styles.logo}>
            <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 10, width: 170, height: 55 }} />
          </View>
          
          <View style={[styles.messagesCard, styles.elevation]}>
            
            <View style={{flexDirection:'row'}}>
            <Text style={{width:'20%',margin:5,padding:3}}>
                   <IonicIcon name={'calendar-outline'} color={'black'} size={25} />
            </Text>
              <TouchableOpacity style={styles.btnTouch} onPress={()=>{setReminderVisible(true)}}>                
                  <Text style={styles.btnText}>
                    <IonicIcon name={'add-outline'} color={'white'} size={20} />Add New Status
                  </Text>                                               
              </TouchableOpacity>                                                  
            </View>
          </View>

          <ScrollView style={{marginTop:2,margin:3,flex: 1,height:'100%',}}>              
            <View style={[styles.messagesCard, styles.elevation]}>
                <View style={{flexDirection:'row',paddingBottom:10}}>
                  <Text>Today (Dec 15, 2021)</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.status_card}>Current Status:</Text>
                  <Text style={styles.available_card}>AVAILABLE</Text>                  
                </View>

                <View style={{flexDirection:'row',paddingTop:10,flexGrow: 1, flex: 1,}}>
                  <Text style={styles.long_txt}>Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar</Text>
                </View>

            </View> 
          </ScrollView>

          <Modal
            animationType="fade"
            transparent={true}
            visible={data.reminderVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.innerModalText}>Add Status (Dec 15,2021)</Text>
                <View style={{ borderWidth: 1, borderColor: '#C1C1C1', width: "100%", marginTop: 10 }}>
                  <Picker
                    mode='dropdown'
                    selectedValue={data.reminder_time}
                    style={{ height: 50, width: '100%', padding: 6, borderWidth: 1, borderColor: '#C1C1C1', }}
                    value={data.reminder_time}
                    onValueChange={(itemValue, itemIndex) => {selectedIndex(itemValue)}}
                  >
                    <Picker.Item label="Select" value="" />
                    <Picker.Item label="Available" value="Available" />
                    <Picker.Item label="Unavailable" value="Unavailable" />                    
                  </Picker>
                </View>
                <View style={styles.reminderContainer}>
                  <TouchableOpacity onPress={()=>handleReminder()} style={styles.buttonClose}>
                    <Text style={{ color: 'white', padding: 5, alignSelf: 'center', textAlign: 'center', fontSize: 16 }}>SUBMIT</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'flex-end', marginTop: 25 }}>
                  <Pressable
                    style={styles.buttonPopupClose}
                    onPress={() => setReminderVisible(false)}
                  >
                    <Text style={{ color: 'white', padding: 5 }}>CLOSE</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>



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
      fontSize:17,
      fontWeight:'bold'
    },
    available_card:{
      fontSize:18,
      fontWeight:'bold'            
    },
    long_txt:{
      lineHeight: 25,
      fontSize: 16,
      textAlign:'justify'
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
});
