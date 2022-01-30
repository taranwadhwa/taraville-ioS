import React, { useState, useCallback, useEffect } from 'react'
import {
    StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableOpacity, ScrollView,
    Modal, Pressable, Platform, ActivityIndicator, Switch, LogBox, RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
 
const SettingScreen = (props) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const [statusIsEnabled,setStatusEnabled] = useState(true);
    const [requestIsEnabled,setRequestEnabled] = useState(true);
    const [planIsEnabled,setPlanEnabled] = useState(true);
    const [billingIsEnabled,setBillingEnabled] = useState(true);

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

    useEffect(() => {      
        handleSettings();
     }, []);


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


             </View>


             
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
    messagesCard: {
        backgroundColor: '#FFF',
        borderRadius: 2,
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
      }
  })    
export default SettingScreen;