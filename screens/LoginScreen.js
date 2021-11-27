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

class LoginScreen extends React.Component{
  constructor(props) {
    super(props); 
    this.state = {
        email:'',
        password:'',
        loading:false,
        validation_status:true                
    }
  }
  doLogin(){         
    Keyboard.dismiss()
    const{email,password} = this.state;
    if(email && password)
    {
      this.setState({loading:true})
      axios.post('',{

      })
      .then(res=>{
        alert(res.data.response);
      })  

    }
    else{
      alert(configData.SERVER_URL)  
      this.setState({validation_status:false})
        alert("Please enter email and password.")
    }
  }
  render(){ 
      const{loading} = this.state
      return(
        <View style={styles.container}>
          <StatusBar backgroundColor="#271933" barStyle="light-content"/>          
          <Text style={styles.logo}>
          <Image source = {require("../assets/logo.png")}/>

          </Text>
          <TextInput style={[styles.half_width, { borderColor: this.state.validation_status ? '#C1C1C1' : 'white' }]} placeholder="Email-address:" onChangeText={(email)=>this.setState({email:email})}/>
          <TextInput style={[styles.half_width, { borderColor: this.state.validation_status ? '#C1C1C1' : 'white' }]} placeholder="Password:" onChangeText={(password)=>this.setState({password:password})} secureTextEntry={true}/>
          
          <View style={styles.btnContainer}>            
            <TouchableOpacity activeOpacity={0.8} style={{...styles.userBtn,
            backgroundColor:loading ? "#CCC":"#32DD87"
            
            }} onPress={()=>this.doLogin()} disabled={loading}>
              <Text style={styles.btnText}>{loading ? "Loading...":"Sign in"}</Text>
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
