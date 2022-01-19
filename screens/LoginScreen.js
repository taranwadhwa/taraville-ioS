import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  Keyboard,
  ActivityIndicator
}
  from 'react-native';
import axios from 'axios';
import configData from "../components/config.json";
import { AuthContext } from '../components/context';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from "expo-constants";

const SignInScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    validation_status: true,
    loading: false,
    expoToken:''
  });


  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  
  const { signIn } = React.useContext(AuthContext);

  const textInputChange = (val) => {
    setData({
      ...data,
      email: val
    });
  }
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val
    });
  }
  const handleForgotPassword=()=>{
    navigation.navigate('ForgotPassword');
  }

  const loginHandle = (email, password) => {   
    if (email && password) 
    { 
      setData({ ...data, loading: true })           
    try {
      registerForPushNotificationsAsync().then(token => {        
        // start //        
        let push_token=token;
        try {        
          const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/login.php", {
            email,
            password,
            push_token
          })
            .then(res => {
              if (res.data.status == "OK") {              
                signIn(res.data.rem_token,res.data.id,res.data.bname);
              }
              else {                
                alert(res.data.status)
                setData({ ...data, loading:false })
              }
              
            })
            .catch(error => {
              throw error;
            })
  
        }
        catch (error) { console.log("error inside sign in" + error) } 

        // end //
      })

    }
    catch (error) {
      console.log("Error while getting expo token request login screen=" + error);
    }
  }
  else{
    alert("Please enter valid email and password.")
  } 

  }

return (
  <View style={styles.container}>
    <StatusBar backgroundColor="#271933" barStyle="light-content" />
   <View style={styles.login_container}> 
    <View style={styles.login_inner_container}>  
    <View style={styles.logo}>
      <Image source={require("../assets/tara_green_logo.png")} style={{width:200,height:50,resizeMode:'contain'}} />
    </View>
    <TextInput autoCapitalize='none' autoCorrect={false} style={styles.input} placeholder="Email-address:*" onChangeText={(email) => textInputChange(email)} />
    <TextInput autoCapitalize = 'none' style={styles.input} placeholder="Password:*" onChangeText={(password) => handlePasswordChange(password)} secureTextEntry={true} />

    <View style={styles.btnContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => { loginHandle(data.email, data.password) }}>
        {
          data.loading ? (<ActivityIndicator size="large" color="white" />) : (<Text style={styles.btnText}>SIGN IN</Text>)
        }

      </TouchableOpacity>
    </View>
    <View style={styles.passwordContainer}>
      <TouchableOpacity onPress={()=>handleForgotPassword()}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>    
    </View>
    </View>
    </View>
  </View>
)


  }

export default SignInScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,    
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#271933',

  },
  login_container:{    
    backgroundColor:'#FFFFFF',
    flexDirection:'column',    
    alignContent:'center',    
    borderRadius:6, 
    width:'95%',
    minHeight:'40%',
    shadowOpacity:1,
    
  },
  login_inner_container:{        
    alignContent:'center',
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',        
  },
  logo: {
    fontSize: 20,
    margin: 10,
    color: 'white'

  },
  input: {
    width: "95%",
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 3,
    fontSize: 18,
    borderWidth:1,
    borderColor:'#271833'
  },
  userBtn: {
    padding: 15,
    width: '45%',
    backgroundColor: '#32DD87',
    width: "90%",
    borderRadius: 3
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor:'#32DD87',
    borderRadius:5
  },
  btnText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: '#FFF'
  },
  passwordContainer: {
    flexDirection: "row-reverse",
    paddingTop: 25,
    width: '90%'

  },
  forgot_button: {
    fontSize: 14,
    textAlign: 'right',
    fontWeight: "normal",
    color: '#271833',

  },
  half_width: {
    borderWidth: 1,
    borderColor: '#C1C1C1',
    width: "90%",
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 3,
    fontSize: 18
  },
});
