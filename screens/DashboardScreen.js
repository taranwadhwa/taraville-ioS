
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
  Modal,
  useIsFocused  
} from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons'
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios  from 'axios';
import configData from "../components/config.json";

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
      ccnumber:'',
      expiryMonth:'', 
      expiryYear:'', 
      cvv:'', 
      buisness_name:'',
      website:'',
      address:'',
      description:'',
      hooperations:'',
      plan_name:'',
      modalVisible: false,
      staffVisible:false,              
  }
  this.loadNewStaff = this.loadNewStaff.bind(this);
  this._updateInfo = this._updateInfo.bind(this);  
  }
   
  loadNewStaff()
  {     
    this.setState({staffVisible:true})    
  }
  triggerStaffModal()
  {   
    this.props.navigation.navigate('Staff')
    this.setState({ modalVisible: false });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  componentDidMount(){
   try{
      const syncUserInfo = AsyncStorage.getItem("user_info").then(syncResponse=>{
       let parseObject = JSON.parse(syncResponse);  
       var uid =  parseObject.id;
       var user_token =  parseObject.token;   

       if(uid!=null)
       {
        try{
          const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/fetch.php", {
            user_token,uid           
          })
          .then(res=>{
              if(res.data.status == "OK")
              {
                this.setState({
                  fname:res.data.user_records.first_name,
                  lname:res.data.user_records.last_name,
                  email:res.data.user_records.email,
                  phone:res.data.user_records.phone,
                  buisness_name:res.data.user_records.business,
                  website:res.data.user_records.website,
                  address:res.data.user_records.address,  
                  description:res.data.user_records.description, 
                  hooperations:res.data.user_records.hooperations,    
                })
                
              }
              else{
                alert(res.data.status)
              }
             
          })

          }
          catch(error){
            alert("Error while fetching request for dashboard update="+error)
          }

       }   

    });
   }
   catch(error){
     console.log("Error while getting fetch asyncstorage on dashboard screen="+error);
   }
        

  }

  _updateInfo(){    
    const{
      fname,lname,email,password,phone,ccnumber,
      expiryMonth,expiryYear,cvv,buisness_name,
      website,address,description,hooperations,plan_name
    } = this.state;

    try{
        const syncUserInfo = AsyncStorage.getItem("user_info").then(syncResponse=>{
          let parseObject = JSON.parse(syncResponse);  
          var uid =  parseObject.id;
          var user_token =  parseObject.token;                      
          if(uid!=null)
          {            
            try{
            const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/update.php", {
              fname,lname,phone,ccnumber,expiryMonth,expiryYear,cvv,buisness_name,
              website,address,description,hooperations,plan_name,uid,user_token              
            })
            .then(res=>{
                if(res.data.status == "OK"){
                  alert("Profile information has been successfully saved.")
                }else{
                  alert(res.data.status)
                }
               
            })

            }
            catch(error){
              alert("Error while sendign request for dashboard update="+error)
            }

          }

      });       
    }
    catch(error){
      console.log("Error while getting asyncstorage on dashboard screen="+error);
    }



  }

   render(){    
    const{loading} = this.state
    let iconName='add-outline';
    let iconColor = '#271833'   
    let staffIconName='person-add-outline';
    const { modalVisible,staffVisible,fname,lname,email,phone,buisness_name,website,address,description,hooperations } = this.state; 
   
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
        
        <TouchableOpacity onPress={() => this.setModalVisible(true)}>
          <View style={styles.staff_container}>   
				    <IonicIcon name={'add-outline'} color={'black'} size={45} style={{paddingBottom:3}} />
          </View>  
        </TouchableOpacity> 

         <View style={[styles.inputCard, styles.elevation]}>  
           <Text style={styles.heading}>Personal Information</Text>            
          <TextInput value={fname} style={styles.input} placeholder="First name:" onChangeText={(fname)=>this.setState({fname:fname})}/>          
          <TextInput value={lname} style={styles.input} placeholder="Last name:" onChangeText={(lname)=>this.setState({lname:lname})}/>          
          <TextInput  editable = {false} value={email}  style={styles.input} placeholder="E-mail:" onChangeText={(email)=>this.setState({email:email})}/>
          <TextInput value={phone} style={styles.input} placeholder="Phone #:" onChangeText={(phone)=>this.setState({phone:phone})}/>          
        </View>         
          <View style={[styles.inputCard, styles.elevation]}>
          <Text style={styles.heading}>Business Information</Text>            
          <TextInput value={buisness_name} style={styles.input} placeholder="Buisness name:" onChangeText={(buisness_name)=>this.setState({buisness_name:buisness_name})}/>          
          <TextInput value={website} style={styles.input} placeholder="Website:" onChangeText={(website)=>this.setState({website:website})}/>          
          <TextInput value={address} style={styles.input} placeholder="Address:" onChangeText={(address)=>this.setState({address:address})}/>          
          <TextInput value={description} multiline={true}  numberOfLines={4} style={styles.input} placeholder="Description:" onChangeText={(description)=>this.setState({description:description})}/>
          <TextInput value={hooperations} style={styles.input} placeholder="Hours of operations:" onChangeText={(hooperations)=>this.setState({hooperations:hooperations})}/>                   
        </View> 
                     
        <View style={[styles.inputCard, styles.elevation]}>
          <Text style={styles.heading}>Billing Details</Text>  

          <TextInput style={styles.input} placeholder="Plan name:" onChangeText={(plan_name)=>this.setState({plan_name:plan_name})}/>          
          <TextInput keyboardAppearance="light" keyboardType="numeric" style={styles.input} placeholder="C.C.Number:" onChangeText={(ccnumber)=>this.setState({ccnumber:ccnumber})}/>          
          
          <View style={styles.text_container}>
            <TextInput keyboardAppearance="light" keyboardType="numeric" 
              style={[styles.half_input, { borderColor: this.state.validation_status ? '#C1C1C1' : 'red' }]}
              label="Expiry month" mode="flat"
              placeholder="Expiry month e.g. 05" maxLength={2} ref="exp_month" 
              onChangeText={(expiryMonth)=>this.setState({expiryMonth:expiryMonth})}
              />

            <TextInput keyboardAppearance="light" keyboardType="numeric" 
              style={[styles.half_input, { borderColor: this.state.validation_status ? '#C1C1C1' : 'red' }]}
              label="Expiry year" mode="flat"
              placeholder="Expiry year e.g. 25" maxLength={2}
              onChangeText={(expiryYear)=>this.setState({expiryYear:expiryYear})}
              />
          </View>
         <TextInput secureTextEntry={true} keyboardAppearance="light" keyboardType="numeric" maxLength={4} style={styles.input} placeholder="CVV:" onChangeText={(cvv)=>this.setState({cvv:cvv})}/>                                 
        </View>
        <View>                     
          <TouchableOpacity style={styles.btnTouch} onPress={()=>this._updateInfo()}>
              <Text style={styles.btnText}>UPDATE</Text>
            </TouchableOpacity>          
        </View>
        <View style={styles.blank_view}>
             <Text style={styles.input}></Text> 
        </View>

        </ScrollView>     

        <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}               
          onClickOutside={this.onClickOutside}                  
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{marginTop:2}}></Text>

              <TouchableOpacity style={styles.btnFaq}>
              <Button 
                onPress = {this.triggerStaffModal.bind(this)}
                title = "CREATE ADDITIONAL STAFF" 
                textAlign="left"               
                color = "#FFF">
              </Button>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnFaq}>
              <Button                    
                onPress = {this.triggerFAQModal}
                title = "CREATE FAQ'S"
                textAlign="left"
                titleStyle="left"                 
               color = "#FFF">
              </Button>  
              </TouchableOpacity>                          
              <View style={{flexDirection:'column',alignItems:'flex-end',marginTop:15}}>                            
              <Pressable
                style={styles.buttonClose}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={{color:'white',fontWeight:'bold'}}>CLOSE</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>        
      </View>
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

  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28
  },

  modalView: {
    margin: 3,
    backgroundColor: "#f1f1f1",
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
    backgroundColor:'#F1F1F1',
    alignSelf:'center'   
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
