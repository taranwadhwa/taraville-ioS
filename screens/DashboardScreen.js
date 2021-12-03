
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
  Button,
  Pressable,  
  useIsFocused  
} from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons'
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen'

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
      modalVisible: false,
      staffVisible:false,              
  }
  this.loadNewStaff = this.loadNewStaff.bind(this);
    
  }
   
  loadNewStaff()
  {     
    this.setState({staffVisible:true})    
  }

   render(){    
    const{loading} = this.state
    let iconName='add-outline';
    let iconColor = '#271833'   
    let staffIconName='person-add-outline';
    const { modalVisible,staffVisible } = this.state; 
   
   {
    if(!this.state.staffVisible){
    return(                  
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.container}>                                   
        <StatusBar backgroundColor="#271933" barStyle="light-content"/>          
        <View style={styles.logo}>
          <Image source = {require("../assets/logo.png")} style={{resizeMode:'contain',marginTop:10,width:170,height:55}}/>
        </View>            

        <ScrollView style={{marginTop:2,margin:3,flex: 1,height:'100%',}}>  
        
          <View style={styles.staff_container}>           

            <Pressable style={{width:'50%'}} onPress={this.loadNewStaff} > 
              <Text  style={{fontSize:14,borderWidth:2,backgroundColor:'#1BB467',color:'white',margin:5,padding:8,borderRadius:7}}>
              <IonicIcon name={iconName} color={'white'} size={25}/>
              CREATE NEW STAFF
              </Text>
            </Pressable>  
            <TouchableOpacity style={{width:'50%'}}> 
              <Text style={{fontSize:16,borderWidth:2, backgroundColor:'#1BB467',color:'white',margin:5,padding:8,borderRadius:7}}>
                <IonicIcon name={iconName} color={'white'} size={25}  />
                CREATE FAQ'S
              </Text>
            </TouchableOpacity>  
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
          <TextInput multiline={true}  numberOfLines={4} style={styles.input} placeholder="Description:" onChangeText={(phone)=>this.setState({phone:phone})}/>
          <TextInput style={styles.input} placeholder="Hours of operations:" onChangeText={(lname)=>this.setState({lname:lname})}/>                   
        </View> 
                     
        <View style={[styles.inputCard, styles.elevation]}>
          <Text style={styles.heading}>Billing Details</Text>  

          <TextInput style={styles.input} placeholder="Plan name:" onChangeText={(fname)=>this.setState({fname:fname})}/>          

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
        <BottomTabNavigationScreen navigation={this.props.navigation} route={this.props.route}/>            
        </KeyboardAvoidingView>                                

    )     
    }
    else{
      return(      
        <View style={styles.container}>
            <StatusBar backgroundColor="#271933" barStyle="light-content"/>          
            <View style={styles.logo}>
                <Image source = {require("../assets/logo.png")} style={{resizeMode:'contain',marginTop:10,width:170,height:55}}/>
            </View>               
            <View style={[styles.inputCard, styles.elevation]}> 
            <Text style={styles.heading}>Staff Information</Text>            
                <TextInput style={styles.input} placeholder="Full name:" onChangeText={(fname)=>this.setState({fname:fname})}/>          
                <TextInput style={styles.input} placeholder="Position:" onChangeText={(position)=>this.setState({position:position})}/>          
                <TextInput style={styles.input} placeholder="E-mail:" onChangeText={(email)=>this.setState({email:email})}/>
                <TextInput style={styles.input} placeholder="Phone #:" onChangeText={(phone)=>this.setState({phone:phone})}/>          
             </View>

             <View>                     
            <TouchableOpacity style={styles.btnTouch}>
                <Text style={styles.btnText}>SUBMIT</Text>
                <Text style={styles.btnText}>BACK</Text>
            </TouchableOpacity>          
            </View>            
            
            </View>
      
        )
    }
   } 
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

  modalView: {
    margin: 3,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:'80%',
    height: Platform.OS === 'ios' ? '60%' : '52%'

  },
  staff_container:{
    flex: 1,    
    borderRadius: 8,    
    width: '99%',         
    alignItems:'center',
    flexDirection:'row',    
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
    backgroundColor:'#1BB467',
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

blank_view:{
  marginTop: Platform.OS === 'ios' ? 20 : 30
},
modalText: {
  margin: 7,  
  fontSize:18,    
  padding:10
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign:'right',
  borderRadius:5
},
buttonClose: {
  backgroundColor: "#1BB467",  
  padding:16,
  borderRadius:5,    
},
btnFaq:{
    backgroundColor:'#1BB467',    
    padding:5,
    width:'95%',
    margin:3,       
    borderRadius:5,     
    
}

});
