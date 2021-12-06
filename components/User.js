import React from 'react';
import { AppRegistry, View, Text, StyleSheet } from 'react-native'
import axios  from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signIn = async (email, password) => {
    try {
        const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/login.php", {
            email,
            password
        })
        .then(res=>{                          
            if (res.data.status == "OK") {    
                const token = res.data.rem_token;
                 AsyncStorage.setItem("token",token);  
                                                                  
            }
            else
            {
              alert(res.data.status)
            }
          })
          .catch(error => {
            alert(error)
            throw error;
        })  
       
    }
    catch (error) {
        console.log("error inside sign in" + error)
    }

}