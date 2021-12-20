import React from 'react';
import {
    StyleSheet, Text, View, StatusBar, Image,
    TextInput, TouchableOpacity, ScrollView, Modal, Pressable, Platform
} from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons'
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const NewStatusScreen = (props) => {

    const [data, setData] = React.useState({
        status: 'Current Date',
        labelOne:'',
        labelTwo:'',
        fromDate:'',
        toDate:'',
        fromTime:'',
        toTime:'',
        prescheduleState:false,

    });
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [isDateToPickerVisible, setDateToPickerVisibility] = React.useState(false);

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
    const showDatePicker = () => {        
        setDatePickerVisibility(true)                          
      };
    
      const showToDatePicker=()=>{
        setDateToPickerVisibility(true)      
      }
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {                
        setData({ ...data,
            fromDate:moment(date).format('L'),
            fromTime:moment(date).format('LT')
        });             
        hideDatePicker();
      };

      const hideDateToPicker = () => {
        setDateToPickerVisibility(false)      
      };


      const handleToConfirm=(date)=>{   
        setData({ ...data,
            toDate:moment(date).format('L'),
            toTime:moment(date).format('LT')
        });              
        hideDateToPicker();
      }
     
    
    return (

        <View style={styles.container}>
            <StatusBar backgroundColor="#271933" barStyle="light-content" />
            <View style={styles.logo}>
                <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 10, width: 170, height: 55 }} />
            </View>
            <ScrollView style={{ marginTop: 2, margin: 3, flex: 1, height: '100%', }}>
                <View style={[styles.inputCard, styles.elevation]}>
                    <Text style={styles.heading}>Add your status Information ({data.status})</Text>
                    <Picker  mode='dropdown'                                               
                         selectedValue={data.status}
                         style={{width: '100%', height: 150}} itemStyle={{height: 150,}}
                         value={data.status}
                         onValueChange={(itemValue, itemIndex) => { selectedIndex(itemValue) }}
                    >
                        <Picker.Item label="Select Status Type" value="" />
                        <Picker.Item label="Current Date" value="Current Date" />
                        <Picker.Item label="PreScheduled" value="PreScheduled" />
                    </Picker>                                        
                </View>
                {data.prescheduleState?(                                        
               <View>
                <View style={[styles.inputCardCalendar, styles.elevation]}>
                    <View style={{flexDirection:'row',padding:1}}>
                        <Text style={styles.heading}>From date: {data.fromDate}</Text>
                        <Text style={styles.heading}>Time: {data.fromTime}</Text>
                    </View>
                     <View style={{marginTop:1}}>
                    <TouchableOpacity onPress={showDatePicker}>
                        <Text style={{paddingLeft:5}}> <IonicIcon name={'calendar-outline'} color={'black'} size={25} /></Text>
                    </TouchableOpacity>
                    </View>                                                                             
                </View>
                <View style={[styles.inputCardCalendar, styles.elevation]}>                    
                    <View style={{flexDirection:'row',padding:1}}>
                            <Text style={styles.heading}>To date: {data.toDate}</Text>
                            <Text style={styles.heading}>To Time: {data.toTime}</Text>
                    </View>
                    <View style={{marginTop:1}}>
                    <TouchableOpacity onPress={showToDatePicker}>
                        <Text style={{paddingLeft:5}}> <IonicIcon name={'calendar-outline'} color={'black'} size={25} /></Text>                                   
                    </TouchableOpacity> 
                    </View>                           
                </View>
                </View>
                ):(null)}

                <View style={[styles.inputCard, styles.elevation]}>
                    <Text style={styles.heading}>Additional Information</Text>
                    <Picker mode='dropdown'
                      
                         style={{width: '100%', height: 104,}} itemStyle={{height: 104,}}
                        
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
                    <Text style={styles.heading}>Further Information</Text>
                    <Picker mode='dropdown'
                         style={{width: '100%', height: 104,}} itemStyle={{height: 104,}}
                        
                    >
                        <Picker.Item label="Select" value="" />
                        <Picker.Item label="Until further notice" value="Until further notice" />
                        <Picker.Item label="Remainder of the day" value="Remainder of the day" />
                        <Picker.Item label="Next hour" value="Next hour" />
                        <Picker.Item label="Next 2 hours" value="Next 2 hours" />
                        <Picker.Item label="Transfer calls to" value="Transfer calls to" /> 
                    </Picker>                                        
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"                    
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}                    
                    style={styles.datePicker}
                    
                />
                <DateTimePickerModal
                    isVisible={isDateToPickerVisible}
                    mode="datetime"
                    onConfirm={handleToConfirm}
                    onCancel={hideDateToPicker}
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}                    
                    style={styles.datePicker}
                />

            </ScrollView>


        </View>

    );
}

export default NewStatusScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#271933',
        flexDirection: 'column'
    },
    logo: {
        marginTop: 20,
        backgroundColor: '#271933',
        borderRadius: 8,
        height: 65,
        margin: 7,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 2,
        marginLeft:10
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
        width: 200,
        backgroundColor: '#FFF0E0',
        borderColor: 'black',
        borderWidth: 1,        
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

});