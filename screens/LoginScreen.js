import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar, 
  Keyboard} 
  from 'react-native';
  import axios  from 'axios';
  import configData from "../components/config.json";
  import { signIn } from '../components/User';
  import AsyncStorage from '@react-native-async-storage/async-storage';

class LoginScreen extends React.Component{
  constructor(props) {
    super(props); 
    this.state = {
        email:'',
        password:'',
        loading:false,
        validation_status:true,
        loading:false                
    }
  }
  doLogin = async ()=>{         
    Keyboard.dismiss()
    const{email,password} = this.state;  
    
    if(email && password){ 
      // start //
     
      try {
          const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/login.php", {
          email,
          password
        })
        .then(res => {
          if (res.data.status == "OK") {
            this.setState({loading:true})              
            let user_object={
              id:res.data.id,
              token:res.data.rem_token
            }            
            AsyncStorage.setItem("user_info", JSON.stringify(user_object));            
            this.props.navigation.navigate('Message')  
          }
          else {
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


      // end //
         //const res = await signIn(email,password)      
    }
    else{
        this.setState({validation_status:false})
        alert("Please enter email and password.")
    }
  }
  render(){ 
    const{loading} = this.state 
    //const { signIn } = React.useContext(AuthContext);
    
      return(
        <View style={styles.container}>
          <StatusBar backgroundColor="#271933" barStyle="light-content"/>          
          <View style={styles.logo}>
            <Image source = {require("../assets/logo.png")}/>
          </View>
          <TextInput autoCapitalize="none" style={[styles.half_width, { borderColor: this.state.validation_status ? '#C1C1C1' : 'white' }]} placeholder="Email-address:" onChangeText={(email)=>this.setState({email:email})}/>
          <TextInput style={[styles.half_width, { borderColor: this.state.validation_status ? '#C1C1C1' : 'white' }]} placeholder="Password:" onChangeText={(password)=>this.setState({password:password})} secureTextEntry={true}/>
          
          <View style={styles.btnContainer}>            
            <TouchableOpacity activeOpacity={0.8} style={{...styles.userBtn,
            backgroundColor:loading ? "#CCC":"#32DD87"
            
            }} onPress={()=>this.doLogin()} disabled={loading}>
              <Text style={styles.btnText}>{loading ? "Loading...":"Sign In"}</Text>
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
}
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#271933',
   
  },
  logo:{
    fontSize:20,
    margin:10,
    color:'white'
    
  },
  input:{
    width:"90%",
    backgroundColor:'#FFFFFF',
    padding:15,
    marginBottom:10,
    borderRadius:3,
    fontSize:18
    
  },
  userBtn:{
      padding:15,
      width:'45%',
      backgroundColor:'#32DD87',
      width:"90%",
      borderRadius:3
  },
  btnContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingTop:3,    
  },
  btnText:{
    fontSize:18,
    textAlign:"center",
    fontWeight:"bold",
    color:'#FFF'
  },
  passwordContainer:{
    flexDirection:"row-reverse",
    paddingTop:25,
    width:'90%'
    
  },
  forgot_button:{
    fontSize:14,
    textAlign:'right',
    fontWeight:"normal",
    color:'#fff',
    
  },
  half_width: {
    borderWidth: 1,
    borderColor: '#C1C1C1',
    width:"90%",
    backgroundColor:'#FFFFFF',
    padding:15,
    marginBottom:10,
    borderRadius:3,
    fontSize:18
},
});
