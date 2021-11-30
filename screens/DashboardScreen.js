
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
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';


class DashboardScreen extends React.Component{
  constructor(props) {
    super(props); 
    this.state = {
      fname:'',
      lname:'',
      email:'',
      password:'',
      phone:'',
      loading:false,
      validation_status:true,
      expmonth:'', 
      exp_year:''               
  }
  }
  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor="#271933" barStyle="light-content"/>          
        <View style={styles.logo}>
          <Image source = {require("../assets/logo.png")} style={{resizeMode:'contain',marginTop:10,width:170,height:55}}/>
        </View>
        <KeyboardAvoidingView behavior="height" enabled>
        <ScrollView style={{marginTop:2}}>            
         <View style={[styles.inputCard, styles.elevation]}>  
           <Text style={styles.heading}>Personal Information</Text>            
          <TextInput style={styles.input} placeholder="First name:" onChangeText={(fname)=>this.setState({fname:fname})}/>          
          <TextInput style={styles.input} placeholder="Last name:" onChangeText={(lname)=>this.setState({lname:lname})}/>          
          <TextInput style={styles.input} placeholder="E-mail:" onChangeText={(email)=>this.setState({email:email})}/>
          <TextInput style={styles.input} placeholder="Phone #:" onChangeText={(phone)=>this.setState({phone:phone})}/>          
        </View>         
          <View style={[styles.inputCard, styles.elevation]}>
          <Text style={styles.heading}>Business Information</Text>            
          <TextInput style={styles.input} placeholder="Buisness name:" onChangeText={(fname)=>this.setState({fname:fname})}/>          
          <TextInput style={styles.input} placeholder="Website:" onChangeText={(lname)=>this.setState({lname:lname})}/>          
          <TextInput style={styles.input} placeholder="Address:" onChangeText={(email)=>this.setState({email:email})}/>          
          <TextInput style={styles.input} placeholder="Description:" onChangeText={(phone)=>this.setState({phone:phone})}/>
        </View> 

        <View style={[styles.inputCard, styles.elevation]}>
          <Text style={styles.heading}>Plan Information</Text>            
          <TextInput style={styles.input} placeholder="Plan name:" onChangeText={(fname)=>this.setState({fname:fname})}/>          
          <TextInput style={styles.input} placeholder="Hours of operations:" onChangeText={(lname)=>this.setState({lname:lname})}/>                   
        </View> 

        <View style={[styles.inputCard, styles.elevation]}>
          <Text style={styles.heading}>Credit Card Information</Text>            
          <TextInput keyboardAppearance="light" keyboardType="numeric" style={styles.input} placeholder="C.C.Number:" onChangeText={(fname)=>this.setState({fname:fname})}/>          
          
        <View style={styles.text_container}>
        <TextInput keyboardAppearance="light" keyboardType="numeric" 
          style={[styles.half_input, { borderColor: this.state.validation_status ? '#C1C1C1' : 'red' }]}
          label="Expiry month" mode="flat"
          placeholder="Expiry month e.g. 05" maxLength={2} ref="exp_month" 
          onChangeText={(expmonth)=>this.setState({expiryMonth:expmonth})}
          />

        <TextInput keyboardAppearance="light" keyboardType="numeric" 
          style={[styles.half_input, { borderColor: this.state.validation_status ? '#C1C1C1' : 'red' }]}
          label="Expiry year" mode="flat"
          placeholder="Expiry year e.g. 25" maxLength={2}
          onChangeText={(exp_year)=>this.setState({expiryYear:exp_year})}
          />
        </View>

          <TextInput style={styles.input} placeholder="CVV:" onChangeText={(lname)=>this.setState({lname:lname})}/>                   

        </View> 
        </ScrollView>
        </KeyboardAvoidingView>
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
    marginTop:20,
    backgroundColor:'#271933',    
    borderRadius:8,
    height:65,
    margin:7,
       
  }, 
  input:{
    width:"95%",    
    borderColor:'#271833',
    padding:10,
    margin:10,
    borderRadius:5,
    fontSize:18,
    borderWidth:1
    
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
  businessContainer:{
    margin:4,
    backgroundColor:'#32DD87',    
    padding:5,
    borderRadius:2,    
  },
  heading:{
    backgroundColor: 'white',        
    width: '100%',
    marginVertical: 2,
    paddingLeft:10,
    fontSize:16
  },
  inputCard:{
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
    marginVertical: 5,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#FFF',
  },
  text_container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
},
half_input:{
  width:"45%",    
  borderColor:'#271833',
  padding:10,
  margin:10,
  borderRadius:5,
  fontSize:18,
  borderWidth:1
}
 
});
