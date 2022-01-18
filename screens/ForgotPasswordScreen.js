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
  ActivityIndicator,Linking
}
  from 'react-native';
import axios from 'axios';

const ForgotPasswordScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: '',    
    validation_status: true,
    loading: false,
  });

  
 
  const textInputChange = (val) => {
    setData({
      ...data,
      email: val
    });
  }
  
  const handleBackLogin=()=>{
    navigation.navigate('Login');
  }

  const passwordHandle = (email) => {
    if (email) {
      setData({ ...data, loading: true })
      try {
        const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/fpassword.php", {
          email,          
        })
          .then(res => {
            if (res.data.status == "OK") {              
              alert("Please check your inbox to reset your password.")
              setData({ ...data, loading:false })
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
    }
    else{
      alert("Please enter valid registered email.")
    }    

}

return (
  <View style={styles.container}>
    <StatusBar backgroundColor="#271933" barStyle="light-content" />
    <View style={styles.logo}>
      <Image source={require("../assets/logo.png")} />
    </View>
    <TextInput autoCapitalize='none' autoCorrect={false} style={styles.input} placeholder="Email-address:*" onChangeText={(email) => textInputChange(email)} />       
      <TouchableOpacity activeOpacity={0.8} onPress={() => { passwordHandle(data.email) }} style={styles.touchBtn}>
      <View style={styles.userBtn}>
        {
          data.loading ? (<ActivityIndicator size="large" color="white" />) : (<Text style={styles.btnText}>SUBMIT</Text>)
        }
        </View>
      </TouchableOpacity>
    
    <View style={styles.passwordContainer}>
      <TouchableOpacity onPress={()=>handleBackLogin()}>
        <Text style={styles.forgot_button}>Back to Login</Text>
      </TouchableOpacity>
    </View>

  </View>
)


  }

export default ForgotPasswordScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#271933',

  },
  logo: {
    fontSize: 20,
    margin: 10,
    color: 'white'

  },
  input: {
    width: "90%",
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 3,
    fontSize: 18

  },
  touchBtn:{
    backgroundColor: '#32DD87',
    width: "90%",
    borderRadius: 3
  },
  userBtn: {
    padding: 10,    
    backgroundColor: '#32DD87',
    width: "90%",
    borderRadius: 3,
    justifyContent:'center',
    flexDirection:'row'
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 3,
  },
  btnText: {
    fontSize: 18,
    textAlign: "center",    
    color: '#FFF',
    alignContent:'center',
    paddingLeft:20
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
    color: '#fff',

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
