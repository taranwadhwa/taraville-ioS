import React, { useState, useCallback, useEffect } from 'react'
import {
    StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableOpacity, ScrollView,
    Modal, Pressable, Platform, ActivityIndicator, Switch, LogBox, RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
 
const SettingScreen = (props) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const [statusIsEnabled,setStatusEnabled] = useState(true);
    const [requestIsEnabled,setRequestEnabled] = useState(true);
    const [planIsEnabled,setPlanEnabled] = useState(true);
    const [billingIsEnabled,setBillingEnabled] = useState(true);

    const [data, setData] = React.useState({        
      IsLoading:true,
      isButtonLoading:false,
      secureCode:'',
      secureEntryCode:''      
    })

    const handleSettings=()=>{
        
        try {
            const syncUserInfo = AsyncStorage.getItem("user_info")
              .then(syncResponse => {
                let parseObject = JSON.parse(syncResponse);
                var uid = parseObject.id;
                var user_token = parseObject.token;                
                if (uid != null) {
                  try {
                    const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/fetch-settings.php", {
                      uid, user_token
                    })
                      .then(res => {
                        if (res.data.status == "OK") { 
                            setData({IsLoading:false,secureEntryCode:res.data.secure_code,secureCode:''});
                            if(res.data.status_type=="new_message")
                            {
                                if(res.data.isEnabled==1){
                                    setIsEnabled(true);
                                }
                                else{
                                    setIsEnabled(false);
                                }
                            }
                            if(res.data.own_status_type=="own_stat_changes")
                            {                                                           
                                if(res.data.own_is_enable==1){
                                    setStatusEnabled(true);
                                }
                                else{
                                    setStatusEnabled(false);
                                }
                            }
                            if(res.data.ar_type=="assist_request")
                            {                                                           
                                if(res.data.ar_is_enable==1){
                                    setRequestEnabled(true);
                                }
                                else{
                                    setRequestEnabled(false);
                                }
                            }
                            if(res.data.pr_type=="plan_request")
                            {                                                           
                                if(res.data.pr_is_enable==1){
                                    setPlanEnabled(true);
                                }
                                else{
                                    setPlanEnabled(false);
                                }
                            }
                            if(res.data.br_type=="bill_request")
                            {                                                           
                                if(res.data.br_is_enable==1){
                                    setBillingEnabled(true);
                                }
                                else{
                                    setBillingEnabled(false);
                                }
                            }
                          
      
                        }
                        else {                    
                          alert(res.data.status)  
                          props.navigation.navigate('UnauthScreen');
                         
                        }
                      })
                  }
                  catch (error) {
                    console.log("Error while fetching settings on settings screen=" + error)
                  }
                }
      
              });
          }
          catch (e) {
            console.log("Error while fetching settings on settings screen=" + e)
          }
    }



    const toggleSwitch = () =>
    {                     
        // Setting New Message status //
        try {
            const syncUserInfo = AsyncStorage.getItem("user_info")
              .then(syncResponse => {
                let parseObject = JSON.parse(syncResponse);
                var uid = parseObject.id;
                var user_token = parseObject.token;
                var status_type = 'new_message'
                var enable_status = isEnabled;
                if (uid != null) {
                  try {
                    const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/settings.php", {
                      uid, user_token,enable_status,status_type
                    })
                      .then(res => {
                        if (res.data.status == "OK") {                          
                           
      
                        }
                        else {                    
                          alert(res.data.status)  
                          props.navigation.navigate('UnauthScreen');
                         
                        }
                      })
                  }
                  catch (error) {
                    console.log("Error while fetching settings on settings screen=" + error)
                  }
                }
      
              });
          }
          catch (e) {
            console.log("Error while fetching settings on settings screen=" + e)
          }
         // Setting New Message status //
        setIsEnabled(previousState => !previousState);
        
    }
    const toggleStatusSwitch=()=>{

         // Setting New Message status //
         try {
            const syncUserInfo = AsyncStorage.getItem("user_info")
              .then(syncResponse => {
                let parseObject = JSON.parse(syncResponse);
                var uid = parseObject.id;
                var user_token = parseObject.token;
                var status_type = 'own_stat_changes'
                var enable_status = statusIsEnabled;
                if (uid != null) {
                  try {
                    const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/settings.php", {
                      uid, user_token,enable_status,status_type
                    })
                      .then(res => {
                        if (res.data.status == "OK") {                          
                           
      
                        }
                        else {                    
                          alert(res.data.status)  
                          props.navigation.navigate('UnauthScreen');
                         
                        }
                      })
                  }
                  catch (error) {
                    console.log("Error while fetching settings on settings screen=" + error)
                  }
                }
      
              });
          }
          catch (e) {
            console.log("Error while fetching settings on settings screen=" + e)
          }
         // Setting New Message status //

        setStatusEnabled(previousState => !previousState);
    }
    const toggleRequestSwitch=()=>{
        // Setting New Message status //
        try {
            const syncUserInfo = AsyncStorage.getItem("user_info")
              .then(syncResponse => {
                let parseObject = JSON.parse(syncResponse);
                var uid = parseObject.id;
                var user_token = parseObject.token;
                var status_type = 'assist_request'
                var enable_status = requestIsEnabled;
                if (uid != null) {
                  try {
                    const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/settings.php", {
                      uid, user_token,enable_status,status_type
                    })
                      .then(res => {
                        if (res.data.status == "OK") {                          
                           
      
                        }
                        else {                    
                          alert(res.data.status)  
                          props.navigation.navigate('UnauthScreen');
                         
                        }
                      })
                  }
                  catch (error) {
                    console.log("Error while fetching settings on settings screen=" + error)
                  }
                }
      
              });
          }
          catch (e) {
            console.log("Error while fetching settings on settings screen=" + e)
          }
         // Setting New Message status //

        setRequestEnabled(previousState => !previousState);
    }
    const togglePlanSwitch=()=>{
        try {
            const syncUserInfo = AsyncStorage.getItem("user_info")
              .then(syncResponse => {
                let parseObject = JSON.parse(syncResponse);
                var uid = parseObject.id;
                var user_token = parseObject.token;
                var status_type = 'plan_request'
                var enable_status = planIsEnabled;
                if (uid != null) {
                  try {
                    const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/settings.php", {
                      uid, user_token,enable_status,status_type
                    })
                      .then(res => {
                        if (res.data.status == "OK") {                          
                           
      
                        }
                        else {                    
                          alert(res.data.status)  
                          props.navigation.navigate('UnauthScreen');
                         
                        }
                      })
                  }
                  catch (error) {
                    console.log("Error while fetching settings on settings screen=" + error)
                  }
                }
      
              });
          }
          catch (e) {
            console.log("Error while fetching settings on settings screen=" + e)
          }
         // Setting New Message status //
        setPlanEnabled(previousState => !previousState);
    }
    const toggleBillingSwitch=()=>{
         // Setting New Message status //
         try {
            const syncUserInfo = AsyncStorage.getItem("user_info")
              .then(syncResponse => {
                let parseObject = JSON.parse(syncResponse);
                var uid = parseObject.id;
                var user_token = parseObject.token;
                var status_type = 'bill_request'
                var enable_status = billingIsEnabled;
                if (uid != null) {
                  try {
                    const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/settings.php", {
                      uid, user_token,enable_status,status_type
                    })
                      .then(res => {
                        if (res.data.status == "OK") {                          
                           
      
                        }
                        else {                    
                          alert(res.data.status)  
                          props.navigation.navigate('UnauthScreen');
                         
                        }
                      })
                  }
                  catch (error) {
                    console.log("Error while fetching settings on settings screen=" + error)
                  }
                }
      
              });
          }
          catch (e) {
            console.log("Error while fetching settings on settings screen=" + e)
          }
         // Setting New Message status //



        setBillingEnabled(previousState => !previousState);
    }
    const save_secure_code=()=>{
      
        if(data.secureCode==""){
          alert("Please enter your 6 digit secure code.");
        }
        else{
          // start //
          setData({isButtonLoading:true});
          try {
            const syncUserInfo = AsyncStorage.getItem("user_info")
              .then(syncResponse => {
                let parseObject = JSON.parse(syncResponse);
                var uid = parseObject.id;
                var user_token = parseObject.token;
                var secure_lock_code =  data.secureCode;              
                if (uid != null) {
                  try {
                    const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/secure-code.php", {
                      uid,user_token,secure_lock_code
                    })
                      .then(res => {
                        if (res.data.status == "OK") {        

                           setData({...data,
                            secureCode: '',
                            secureEntryCode:res.data.secure_code,                           
                            IsLoading:false,
                            isButtonLoading:false
                            });  
                            alert("Your security code has been successfully saved.")

                        }
                        else {                    
                          alert(res.data.status)  
                          props.navigation.navigate('UnauthScreen');
                         
                        }
                      })
                  }
                  catch (error) {
                    console.log("Error while fetching secure code settings on settings screen=" + error)
                  }
                }
      
              });
          }
          catch (e) {
            console.log("Error while fetching secure code settings  settings on settings screen=" + e)
          } 
        
        
        // end //
        }
    }

    useEffect(() => {      
        handleSettings();
     }, []);


     if (data.IsLoading) {
      return (
        <View style={styles.activity_container}>
          <ActivityIndicator animating={true} size="large" color="#FFF" />
          <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', width: 110, height: 49 }} />                            
        </View>
      )
    }

    return(
        <View style={styles.container}>
             <View style={[styles.messagesCard, styles.elevation]}>
                 <View style={{flexDirection:'row'}}>
                  <Text style={styles.inner_text}>New Messages</Text>
                  <Text style={styles.toggleButton}>
                  <Switch
                    trackColor={{ false: "#f4f3f4", true: "#32DD87" }}
                    thumbColor={isEnabled ? "#32DD87" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}                    
                />
                </Text>
                </View>

                <View style={{flexDirection:'row'}}>
                  <Text style={styles.inner_text}>Status changes</Text>
                  <Text style={styles.toggleButton}>
                  <Switch
                    trackColor={{ false: "#f4f3f4", true: "#32DD87" }}
                    thumbColor={statusIsEnabled ? "#32DD87" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleStatusSwitch}
                    value={statusIsEnabled}
                />
                </Text>
                </View>

                <View style={{flexDirection:'row'}}>
                  <Text style={styles.inner_text}>Assist requests</Text>
                  <Text style={styles.toggleButton}>
                  <Switch
                    trackColor={{ false: "#f4f3f4", true: "#32DD87" }}
                    thumbColor={requestIsEnabled ? "#32DD87" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleRequestSwitch}
                    value={requestIsEnabled}
                />
                </Text>
                </View>

                <View style={{flexDirection:'row'}}>
                  <Text style={styles.inner_text}>Plan usage</Text>
                  <Text style={styles.toggleButton}>
                  <Switch
                    trackColor={{ false: "#f4f3f4", true: "#32DD87" }}
                    thumbColor={planIsEnabled ? "#32DD87" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={togglePlanSwitch}
                    value={planIsEnabled}
                />
                </Text>
                </View>

                <View style={{flexDirection:'row'}}>
                  <Text style={styles.inner_text}>Billing</Text>
                  <Text style={styles.toggleButton}>
                  <Switch
                     trackColor={{ false: "#f4f3f4", true: "#32DD87" }}
                    thumbColor={billingIsEnabled ? "#32DD87" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleBillingSwitch}
                    value={billingIsEnabled}
                />
                </Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.inner_text}>6 digit secure code</Text>
                  <Text style={styles.toggleButton,{paddingTop:15}}>
                    {
                     data.secureEntryCode ? 
                     (                      
                       data.secureEntryCode
                      
                     ):('-')
                    }
                  </Text>
                </View>


             </View>

             <View style={[styles.messagesCard, styles.elevation]}>
              <Text style={styles.heading}>Your 6 digit code to access secure messages. </Text>  
              <TextInput value={data.secureCode} maxLength={6} style={styles.input} placeholder="Please enter 6 digit code:*" onChangeText={(secureCode)=>setData({...data,secureCode:secureCode})}/>          

              <TouchableOpacity style={styles.btnTouch} onPress={()=>save_secure_code()}>
              {
                data.isButtonLoading ? (
                <ActivityIndicator animating={data.isButtonLoading} size="large" color="white"/>
                ):(               
              <Text style={styles.btnText}>SUBMIT</Text>
               )}

          </TouchableOpacity>    

             </View>

             <BottomTabNavigationScreen navigation={props.navigation} route={props.route} />
             
        </View>
    )
}    
const styles = StyleSheet.create
  ({
    container: {
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: '#271933',
      flexDirection: 'column'
    },
    activity_container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#271933',
      flexDirection: 'column',
      justifyContent: 'center',
    },

    messagesCard: {
        backgroundColor: '#FFF',
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%',
        marginVertical: 3,
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {
          height: 0,
          width: 0
        },
        margin: 1,                
      },
      inner_text:{
        borderBottomColor:'#CCCCCC',
        borderBottomWidth:1,
        width:'85%',
        padding:15,
        fontSize:17
      },
      toggleButton:{
        borderBottomColor:'#CCCCCC',
        borderBottomWidth:1,
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
      heading:{
        backgroundColor: 'white',        
        width: '100%',
        marginVertical: 2,
        paddingLeft:10,
        fontSize:16,
        fontWeight:'bold'
      },
      btnTouch:{
        backgroundColor:'#1BB467',
        height:45,
        padding:10,
        width:'95%',
        margin:10,       
        borderRadius:5,
      },
      btnText:{
        fontSize:18,
        textAlign:"center",
        fontWeight:"bold",
        color:'#FFF'
      },
  })    
export default SettingScreen;