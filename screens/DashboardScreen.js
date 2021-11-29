
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar, 
  ScrollView,
  Keyboard} from 'react-native';


class DashboardScreen extends React.Component{
  constructor(props) {
    super(props); 
    this.state = {
      email:'',
      password:'',
      loading:false,
      validation_status:true                
  }
  }
  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor="#271933" barStyle="light-content"/>          
        <ScrollView>            
        <View style={styles.logo}>
          <Image source = {require("../assets/logo.png")}/>
        </View>
        <View style={styles.controls}>
          <TextInput style={styles.input} placeholder="Email-address:" onChangeText={(email)=>this.setState({email:email})}/>
          <TextInput style={styles.input} placeholder="Password:" onChangeText={(password)=>this.setState({password:password})} secureTextEntry={true}/>
        </View>
        </ScrollView>
      </View>
    ) 



  }
}
export default DashboardScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,    
    alignItems:'stretch',
    justifyContent: 'center',
    backgroundColor:'#271933',
  },
  logo:{
    fontSize:20,            
    marginTop:60,
    width:'20%',
    resizeMode:'contain'    
  },
  controls:{
    
  },
  input:{
    width:"95%",
    backgroundColor:'#FFFFFF',
    padding:13,
    marginLeft:12,
    marginBottom:10,
    borderRadius:5,
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
 
});
