import React,{ useEffect,useState  } from 'react';
import {
    StyleSheet, Text, View, StatusBar, Image,
    TextInput, TouchableOpacity, ScrollView, Modal, Pressable, Platform,KeyboardAvoidingView,ActivityIndicator,LogBox
} from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons'
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios  from 'axios';
LogBox.ignoreAllLogs();

const EditStatusScreen = (props) => {

    const [data, setData] = React.useState({
        status: 'Current Date',
        labelOne:'',
        labelTwo:'',
        fromDate:'',
        toDate:'',
        fromTime:'',
        toTime:'',
        prescheduleState:false,
        listing: [],
        labelThree:'',
        isButtonLoading:false,
        other_label:'',
        isButtonLoader:false        

    });

    const selectedIndex = (index) => {                       
        if(index=="PreScheduled"){            
            setData({...data,prescheduleState:true,status:'PreScheduled'})   
       }else{
        setData({...data,prescheduleState:false,status:'Current Date'})   
       }                
    }

    const selectedIndexLabelOne = (index) => {
        setData({
            ...data,
            labelOne: index,
        });
        

    }
    const selectedIndexLabelTwo = (index) => {
        setData({
            ...data,
            labelTwo: index,
        });        
    }
    const selectedIndexLabelThree=(index)=>{
        setData({
            ...data,
            labelThree: index,
        });   
    }
    const handleBack=()=>{
       props.navigation.goBack() 
    }
     
      function handleStaffListing(){        
        try {
          const syncUserInfo = AsyncStorage.getItem("user_info")
            .then(syncResponse => {
              let parseObject = JSON.parse(syncResponse);
              var uid = parseObject.id;
              var user_token = parseObject.token;
              if (uid != null) {
                try {
                  const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/old-status.php", {
                    uid, user_token,
                  })
                    .then(res => {
                      if(res.data.status=="OK"){                    
                        setData({
                          ...data,
                          labelOne: res.data.list.label_one,                          
                          labelTwo: res.data.list.label_two,
                          labelThree: res.data.list.employee_name,
                          other_label:res.data.list.other_info,
                          listing:res.data.emp_list,
                          status:'Current Date'                          
                        });                    
                      }
                      else{
                                        
                      }                 
                    })
                }
                catch (error) {
                  console.log("Error while fetching staff list edit current date status screen=" + error)
                }
              }
    
            });
        }
        catch (e) {
          console.log("Error while fetching staff list on edit current date status screen=" + e)
        }
    
    
      }
      useEffect(() => {
        handleStaffListing()   
       }, []);
    
       function handleUpdateStatus()
       {       
         setData({...data,isButtonLoader:true})                       
         const{status,labelOne,labelTwo,labelThree,other_label,} = data;                  
         if(status)
         {
            try {
              const syncUserInfo = AsyncStorage.getItem("user_info")
                .then(syncResponse => {
                  let parseObject = JSON.parse(syncResponse);
                  var uid = parseObject.id;
                  var user_token = parseObject.token;
                  if (uid != null) {
                    try {
                      const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/status.php", {
                        uid, user_token,status,labelOne,labelTwo,labelThree,other_label
                      })
                        .then(res => {                            
                          if(res.data.status=="OK")
                          {
                            alert("Your status has been successfully updated.");   
                            setData({...data,isButtonLoader:false});                         
                            props.navigation.replace('Status')       
                          
                          }                                                                  
                          else{
                            alert(res.data.status) 
                            setData({...data,isButtonLoader:false});                                        
                          }  

                        })
                    }
                    catch (error) {
                      console.log("Error while on edit current date status screen=" + error)
                    }
                  }
        
                });
            }
            catch (e) {
              console.log("Error while on edit current date status screen=" + e)
            }
         }
         else{
           alert("Please select status information.");
         }

       }

    return (
  
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}>   

            <View style={styles.topHeader}>
                <TouchableOpacity style={{marginTop:15,paddingLeft:10}} onPress={()=>handleBack()}><IonicIcon name={'arrow-back-outline'} color={'white'} size={25} /></TouchableOpacity>
                <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 4, width: 110, height: 49 }} />                            
            </View>

            <StatusBar backgroundColor="#271933" barStyle="light-content" />            
            <ScrollView style={{ marginTop: 2, margin: 3, flex: 1, height: '100%', }}>
                <View style={[styles.inputCard, styles.elevation]}>
                    <Text></Text>
                    <Text style={styles.heading}>Edit status Information <Text style={{fontSize:11}}>({data.status})</Text></Text>
                    <Picker  mode='dropdown'                                               
                         selectedValue={data.status}
                         style={styles.picker} itemStyle={{height: 150,}}
                         value={data.status}
                         onValueChange={(itemValue, itemIndex) => { selectedIndex(itemValue) }}
                    >                        
                        <Picker.Item label="Current Date" value="Current Date" />                        
                    </Picker>                                        
                </View>
               

                <View style={[styles.inputCard, styles.elevation]}>
                    <Text style={styles.heading}>Why?<Text style={{fontSize:11}}> {data.labelOne?data.labelOne:null}</Text></Text>
                    <Picker mode='dropdown'                      
                         selectedValue={data.labelOne}
                         style={styles.picker} itemStyle={{height: 130,}}
                         value={data.labelOne}
                         onValueChange={(itemValue, itemIndex) => { selectedIndexLabelOne(itemValue) }}
                         >       
                    
                        <Picker.Item label="Select day status" value="" />
                        <Picker.Item label="Not taking calls" value="Not taking calls" />
                        <Picker.Item label="Out of office" value="Out of office" />
                        <Picker.Item label="In a meeting" value="In a meeting" />
                        <Picker.Item label="Sick-day" value="Sick-day" />
                        <Picker.Item label="Out to lunch" value="Out to lunch" />
                        <Picker.Item label="Gone for the day" value="Gone for the day" />
                        <Picker.Item label="Vacation" value="Vacation" />
                    </Picker>                                        
                </View>

                <View style={[styles.inputCard, styles.elevation]}>
                    <Text style={styles.heading}>For how long? <Text style={{fontSize:11}}> {data.labelTwo?data.labelTwo:null}</Text></Text>
                    <Picker mode='dropdown'
                         selectedValue={data.labelTwo}
                         style={styles.picker} itemStyle={{height: 130,}}
                         value={data.labelTwo}
                         onValueChange={(itemValue, itemIndex) => { selectedIndexLabelTwo(itemValue) }}
                        
                    >
                        <Picker.Item label="Select" value="" />
                        <Picker.Item label="Until further notice" value="Until further notice" />
                        <Picker.Item label="Remainder of the day" value="Remainder of the day" />
                        <Picker.Item label="Next hour" value="Next hour" />
                        <Picker.Item label="Next 2 hours" value="Next 2 hours" />
                        <Picker.Item label="Transfer calls to" value="Transfer calls to" /> 
                    </Picker>                                        
                </View>

                <View style={[styles.inputCard, styles.elevation]}>
                    <Text style={styles.heading}>Transfer calls to who? <Text style={{fontSize:11}}> {data.labelThree}</Text></Text>
                    <Picker mode='dropdown'
                         selectedValue={data.labelThree}
                         value={data.labelThree}                        
                         style={styles.picker} itemStyle={{height: 130,}}                    
                         onValueChange={(itemValue, itemIndex) => { selectedIndexLabelThree(itemValue) }}                        
                    >
                       <Picker.Item label="Select Employee" value="" />
                       {                            
                            data.listing.map((records, index) => (                        
                                <Picker.Item key={records.id} label={records.full_name} value={records.full_name} />
                            ))
                        }                                                    
                    </Picker>                                        
                </View>
                <View style={[styles.inputCard, styles.elevation]}>
                <Text style={styles.heading}>Anything else? </Text>
                  <TextInput value={data.other_label} style={styles.input} onChangeText={(other)=>{setData({...data,other_label:other})}}  placeholder="Any other information"/>          
                </View>   

                <View>                               
                <TouchableOpacity style={styles.btnTouch} onPress={()=>handleUpdateStatus()}>
                {data.isButtonLoader ? (<ActivityIndicator animating={data.isButtonLoader} size="large" color="white" />
                        ) : (                   
                   <Text style={styles.btnText}>UPDATE</Text> 
                   )}                  
                </TouchableOpacity>          
                </View>      
               
            </ScrollView>


        </KeyboardAvoidingView>

    );
}

export default EditStatusScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#271933',
        flexDirection: 'column'
    },
    logo: {
        marginTop: 10,
        backgroundColor: '#271933',
        borderRadius: 8,
        height: 65,
        margin: 7,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 2,
        marginLeft:10,        
    },
    inputCard: {
        backgroundColor: 'white',
        borderRadius: 2,
        paddingVertical: 15,
        paddingHorizontal: 5,
        width: '100%',
        marginVertical: 2,
        
    },
    inputCardCalendar:{
        backgroundColor: 'white',
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 5,
        width: '100%',
        marginVertical: 2,
        height:100
    },
    picker: {
      width: '90%',             
      height: Platform.OS === 'ios' ? 100 : 50,        
    },
      pickerItem: {
        color: 'red'
      },
      datePicker: {
        width: 320,
        height: 290,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      blank_view:{
        marginTop: Platform.OS === 'ios' ? 20 : 30
      },
      btnTouch:{
        backgroundColor:'#1BB467',
        height:45,
        padding:10,
        width:'95%',
        margin:10,       
        borderRadius:50,
      },
      btnText:{
        fontSize:18,
        textAlign:"center",
        fontWeight:"bold",
        color:'#FFF',    
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
      header_txt:{
        color:'#FFF',
        fontSize: 22,
        marginTop: 15,
        padding: 15,
        height:'100%'
      },
      topHeader: {
        flexDirection:'row',
        margin: 1,
        borderRadius: 1,
        backgroundColor: '#1BB467',        
        height: Platform.OS === 'ios' ? 60 : 60,
        borderColor: '#1BB467',
        top:5,
        borderWidth:1,        
        alignContent:'flex-start'
      },

});