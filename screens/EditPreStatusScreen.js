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

const EditPreStatusScreen = (props) => {

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
        other_label:''        

    });
    const [isDatePickerVisible,setDatePickerVisibility] = React.useState(false);
    const [isDateToPickerVisible, setDateToPickerVisibility] = React.useState(false);

    const [isTimePickerVisible,setTimePickerVisibility] = React.useState(false);
    const [isToTimePickerVisible,setToTimePickerVisibility] = React.useState(false);


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
    const showDatePicker = () => {        
        setDatePickerVisibility(true)                          
      };

      const showTimePicker=()=>{
        setTimePickerVisibility(true) 
      }

      const showToTimePicker=() =>{
        setToTimePickerVisibility(true) 
      }
    
      const showToDatePicker=()=>{
        setDateToPickerVisibility(true)      
      }
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {                
        setData({ ...data,
            fromDate:moment(date).format('L'),            
            //fromTime:moment(date).format('LT')
        });             
        hideDatePicker();
      };

      const handleTimeConfirm = (date) => {                
        setData({ ...data,            
            fromTime:moment(date).format('LT')
        });             
        hideTimePicker();
      };
      const handleToTimeConfirm=(date)=>{
          setData({ ...data,            
            toTime:moment(date).format('LT')
        });             
        hideToTimePicker();
      }

      const hideToTimePicker = () => {
        setToTimePickerVisibility(false);
      };

      const hideTimePicker = () => {
        setTimePickerVisibility(false);
      };

      const hideDateToPicker = () => {
        setDateToPickerVisibility(false)      
      };


      const handleToConfirm=(date)=>{   
        setData({ ...data,
            toDate:moment(date).format('L'),
            //toTime:moment(date).format('LT')
        });              
        hideDateToPicker();
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
              var status_id = props.route.params.statusID;
              if (uid != null) {
                try {
                  const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/old-pre-status.php", {
                    uid, user_token,status_id
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
                          status:'PreScheduled',
                          fromDate:res.data.list.fdate,
                          fromTime:res.data.list.ftime,
                          toDate:res.data.list.tdate,
                          toTime:res.data.list.ttime                          
                        });                    
                      }
                      else{
                                        
                      }                 
                    })
                }
                catch (error) {
                  console.log("Error while fetching staff list on edit preschedule status screen=" + error)
                }
              }
    
            });
        }
        catch (e) {
          console.log("Error while fetching staff list on edit preschedule status screen=" + e)
        }
    
    
      }


      useEffect(() => {
        handleStaffListing()   
       }, []);
    
       function handleSavePreStatus()
       {   
        setData({...data,isButtonLoader:true})                             
         const{status,labelOne,labelTwo,labelThree,fromDate,toDate,fromTime,toTime,other_label} = data;                  
         if(status)
         {
            try {
              const syncUserInfo = AsyncStorage.getItem("user_info")
                .then(syncResponse => {
                  let parseObject = JSON.parse(syncResponse);
                  var uid = parseObject.id;
                  var user_token = parseObject.token;
                  var status_id = props.route.params.statusID;
                  if (uid != null) {
                    try {
                      const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/update-pre-status.php", {
                        uid, user_token,status,labelOne,labelTwo,labelThree,fromDate,toDate,fromTime,toTime,other_label,status_id
                      })
                        .then(res => {
                          if(res.data.status=="OK")
                          {
                            alert("Your status has been successfully saved.");
                            setData({...data,isButtonLoading:false})
                            props.navigation.replace('Status')       
                          
                          }                                                                  
                          else{
                            alert(res.data.status)  
                            setData({...data,isButtonLoading:false})                                      
                          }  

                        })
                    }
                    catch (error) {
                      console.log("Error while on edit preschedule status screen=" + error)
                    }
                  }
        
                });
            }
            catch (e) {
              console.log("Error while on on edit preschedule status screen=" + e)
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
                <TouchableOpacity onPress={()=>handleBack()}><Text style={styles.header_txt}><IonicIcon name={'arrow-back-outline'} color={'white'} size={25} /></Text></TouchableOpacity>
                <Text style={styles.header_txt}>Edit Status</Text>
            </View>

            <StatusBar backgroundColor="#271933" barStyle="light-content" />
            <View style={styles.logo}>
                <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 5, width: 170, height: 55 }} />
            </View>
            <ScrollView style={{ marginTop: 2, margin: 3, flex: 1, height: '100%', }}>
                <View style={[styles.inputCard, styles.elevation]}>
                    <Text></Text>
                    <Text style={styles.heading}>Edit status Information <Text style={{fontSize:11}}>({data.status})</Text></Text>
                    <Picker  mode='dropdown'                                               
                         selectedValue={data.status}
                         style={styles.picker} itemStyle={{height: 120}}
                         value={data.status}
                         onValueChange={(itemValue, itemIndex) => { selectedIndex(itemValue) }}
                    >                        
                        <Picker.Item label="PreScheduled" value="PreScheduled" />
                    </Picker>                                        
                </View>
                                                     
               <View>
                <View style={[styles.inputCardCalendar, styles.elevation]}>
                    <View style={{flexDirection:'row',padding:1}}>
                        <Text style={styles.heading}>From date: <Text style={{fontSize:11}}>{data.fromDate}</Text></Text>
                        <Text style={styles.heading}>From Time: <Text style={{fontSize:11}}>{data.fromTime}</Text></Text>                        
                    </View>

                     <View style={{marginTop:1,flexDirection:'row'}}>
                      <TouchableOpacity onPress={showDatePicker} style={{width:'48%'}}>
                          <Text style={{paddingLeft:5}}> <IonicIcon name={'calendar-outline'} color={'black'} size={25} /></Text>                                                  
                      </TouchableOpacity>
                      <TouchableOpacity onPress={showTimePicker} >
                          <Text style={{paddingLeft:5}}> <IonicIcon name={'calendar-outline'} color={'black'} size={25} /></Text>                                                  
                      </TouchableOpacity>
                    </View>
                                                                                                  
                </View>
                <View style={[styles.inputCardCalendar, styles.elevation]}>                    
                    <View style={{flexDirection:'row',padding:1}}>
                        <Text style={styles.heading}>To date: <Text style={{fontSize:11}}>{data.toDate}</Text> </Text>
                        <Text style={styles.heading}>To Time: <Text style={{fontSize:11}}>{data.toTime}</Text></Text>
                    </View>
                    <View style={{marginTop:1,flexDirection:'row'}}>
                    <TouchableOpacity onPress={showToDatePicker} style={{width:'48%'}}>
                        <Text style={{paddingLeft:5}}> <IonicIcon name={'calendar-outline'} color={'black'} size={25} /></Text>                                   
                    </TouchableOpacity> 

                    <TouchableOpacity onPress={showToTimePicker}>
                        <Text style={{paddingLeft:5}}> <IonicIcon name={'calendar-outline'} color={'black'} size={25} /></Text>                                   
                    </TouchableOpacity> 

                    </View>                           
                </View>
                </View>
               

                <View style={[styles.inputCard, styles.elevation]}>
                    <Text style={styles.heading}>Additional Information<Text style={{fontSize:11}}> {data.labelOne?data.labelOne:null}</Text></Text>
                    <Picker mode='dropdown'                      
                         selectedValue={data.labelOne}
                         style={styles.picker} itemStyle={{height: 120}}
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
                    <Text style={styles.heading}>Further Information <Text style={{fontSize:11}}> {data.labelTwo?data.labelTwo:null}</Text></Text>
                    <Picker mode='dropdown'
                         selectedValue={data.labelTwo}
                         style={styles.picker} itemStyle={{height: 120}}
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
                    <Text style={styles.heading}>Employee Information <Text style={{fontSize:11}}> {data.labelThree}</Text></Text>
                    <Picker mode='dropdown'
                         selectedValue={data.labelThree}
                         value={data.labelThree}                        
                         style={styles.picker} itemStyle={{height: 120}}                    
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
                <Text style={styles.heading}>Other Information </Text>
                  <TextInput value={data.other_label} style={styles.input} onChangeText={(other)=>{setData({...data,other_label:other})}}  placeholder="Any other information"/>          
                </View>   

                <View>                               
                <TouchableOpacity style={styles.btnTouch} onPress={()=>handleSavePreStatus()}>
                {data.isButtonLoader ? (<ActivityIndicator animating={data.isButtonLoader} size="large" color="white" />
                        ) : (                      
                   <Text style={styles.btnText}>UPDATE</Text> 
                   )}                   
                </TouchableOpacity>          
                </View>                            
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"                    
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}                    
                    style={styles.datePicker}
                    
                />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideTimePicker}                                      
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}                    
                    style={styles.datePicker}
                    
                />

                <DateTimePickerModal
                isVisible={isToTimePickerVisible}
                mode="time"
                onConfirm={handleToTimeConfirm}
                onCancel={hideToTimePicker}                                      
                is24Hour={true}
                display={Platform.OS === 'ios' ? 'inline' : 'default'}                    
                style={styles.datePicker}

                />

                <DateTimePickerModal
                    isVisible={isDateToPickerVisible}
                    mode="date"
                    onConfirm={handleToConfirm}
                    onCancel={hideDateToPicker}
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}                    
                    style={styles.datePicker}
                />

            </ScrollView>


        </KeyboardAvoidingView>

    );
}

export default EditPreStatusScreen;

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
        borderRadius: 4,
        paddingVertical: 5,
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
        height: Platform.OS === 'ios' ? 120 : 50,        
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
        marginTop: Platform.OS === 'ios' ? 20 : 10
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
      topHeader:{
        flexDirection: 'row', 
        margin:1, 
        borderRadius:1, 
        backgroundColor: '#1BB467', 
        height: 70,
        borderColor:'#1BB467',
        top:6,
      },

});