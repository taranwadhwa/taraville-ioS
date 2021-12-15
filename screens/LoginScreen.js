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

const SignInScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    validation_status: true,
    loading: false,
  });

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
  const loginHandle = (email, password) => {
    if (email && password) {
      setData({ ...data, loading: true })
      try {
        const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/login.php", {
          email,
          password
        })
          .then(res => {
            if (res.data.status == "OK") {              
              signIn(res.data.rem_token,res.data.id);
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
      alert("Please enter valid email and password.")
    }    

}

return (
  <View style={styles.container}>
    <StatusBar backgroundColor="#271933" barStyle="light-content" />
    <View style={styles.logo}>
      <Image source={require("../assets/logo.png")} />
    </View>
    <TextInput autoCapitalize='none' autoCorrect={false} style={styles.input} placeholder="Email-address:" onChangeText={(email) => textInputChange(email)} />
    <TextInput autoCapitalize = 'none' style={styles.input} placeholder="Password:" onChangeText={(password) => handlePasswordChange(password)} secureTextEntry={true} />

    <View style={styles.btnContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => { loginHandle(data.email, data.password) }}>
        {
          data.loading ? (<ActivityIndicator size="large" color="white" />) : (<Text style={styles.btnText}>SIGN IN</Text>)
        }

      </TouchableOpacity>
    </View>
    <View style={styles.passwordContainer}>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>

  </View>
)


  }

export default SignInScreen;
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
    paddingTop: 3,
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
