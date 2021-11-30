
import React from 'react';
import { 
  Platform,
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
import IonicIcon from 'react-native-vector-icons/Ionicons'

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
      exp_year:'', 
      cvv:'',     
  }
  }
  render(){
    const{loading} = this.state
    let iconName='add-outline';
    let iconFaq = 'add-outline'
    return(
     
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.container}>          
        <StatusBar backgroundColor="#271933" barStyle="light-content"/>          
        <View style={styles.logo}>
          <Image source = {require("../assets/logo.png")} style={{resizeMode:'contain',marginTop:10,width:170,height:55}}/>
        </View>            

        <ScrollView style={{marginTop:2,margin:3,flex: 1,height:'100%',}}>


        <View style={styles.staff_container}>  
          <Text style={{borderWidth:0, width:'60%'}}>         
          	<TouchableOpacity>
				<Text style={styles.button}><IonicIcon name={iconName} size={20} style={{paddingBottom:3}} /> NEW STAFF</Text>
			</TouchableOpacity>
          </Text>     
          <Text style={{borderWidth:0, width:'60%'}}>         
          	<TouchableOpacity>
				<Text style={styles.button}><IonicIcon name={iconName} size={20} style={{paddingBottom:3}} /> CREATE FAQ</Text>
			</TouchableOpacity>
          </Text>       
        </View>   


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
         <TextInput secureTextEntry={true} keyboardAppearance="light" keyboardType="numeric" maxLength={4} style={styles.input} placeholder="CVV:" onChangeText={(cvv)=>this.setState({cvv:cvv})}/>                                 
        </View>
        <View>                     
          <TouchableOpacity style={styles.btnTouch} onPress={()=>this.doLogin()} disabled={loading}>
              <Text style={styles.btnText}>{loading ? "Loading...":"UPDATE"}</Text>
            </TouchableOpacity>          
        </View>
        <View style={styles.blank_view}>
             <Text style={styles.input}></Text> 
        </View>

        </ScrollView>
        
        </KeyboardAvoidingView>                      
     
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
    flexDirection:'column'
  },
  staff_container:{
    flex: 1,
    flexDirection:'row',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '100%',     
    marginVertical: 5,    
  },
  faq:{
    fontSize:18,
            
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
    margin:8,
    borderRadius:5,
    fontSize:18,
    borderWidth:1
    
  },
  btnTouch:{
    backgroundColor:'#32DD87',
    height:45,
    padding:10,
    width:'95%',
    margin:10,       
    borderRadius:50,
  },
  btnText:{
    fontSize:18,
    textAlign:"center",
    fontWeight:"bold",
    color:'#32DD87',    
  },
  passwordContainer:{
    flexDirection:"row-reverse",
    paddingTop:25,
    width:'90%'
    
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
    fontSize:16,
    fontWeight:'bold'
  },
  inputCard:{
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '100%',     
    marginVertical: 5,        
  },
  inputCreditCard:{
    backgroundColor: '#271933',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%', 
    height:'22%',
    marginVertical: 2,        
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
},
userBtn:{
  padding:8,  
  backgroundColor:'#32DD87',
  width:"100%",
  borderRadius:3,
  margin:5,
  
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
button:{
  backgroundColor:'#32DD87',
  borderColor:'#00AAE7',
  width:250,
  height:50,
  borderRadius:120,
  color:'white',
  fontWeight:'bold',
  alignItems: "center",
  paddingTop: 15,
  marginTop:10,
  fontWeight:'bold'
   
},
blank_view:{
  marginTop: Platform.OS === 'ios' ? 20 : 30
},
button:{
  backgroundColor:'#1BB467',
  width:130,
  borderRadius:10,
  color:'white',
  alignItems: "center",
  padding:8  
},
 
});
