import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, SafeAreaView, Image,ScrollView,TextInput, Platform, ActivityIndicator,LogBox,KeyboardAvoidingView, Keyboard } from 'react-native';
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import IonicIcon from 'react-native-vector-icons/Ionicons'
LogBox.ignoreAllLogs();

class ContactScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email:'',
            buisness_name:'',
            phone:'',
            isLoading:false,
            isButtonLoader: false,
            labelTwo:'',
            comments:'' 
        }
        this.handleContactUs = this.handleContactUs.bind(this);

    }
    toggleDrawer = () => {    
        this.props.navigation.openDrawer()
          
        };

    handleFetchdata(){    

        try{
          const syncUserInfo = AsyncStorage.getItem("user_info").then(syncResponse=>{
           let parseObject = JSON.parse(syncResponse);  
           var uid =  parseObject.id;
           var user_token =  parseObject.token;       
    
           if(uid!=null)
           {
            try{
              const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/contact-fetch.php", {
                user_token,uid           
              })
              .then(res=>{                            
                  if(res.data.status == "OK")
                  {
                    this.setState({isLoading:true});
                    this.setState({
                      fname:res.data.user_records.first_name,
                      lname:res.data.user_records.last_name,
                      email:res.data.user_records.email,
                      phone:res.data.user_records.phone,
                      buisness_name:res.data.user_records.business,
                      isLoading:true                     
                    })
                    
                  }
                  else{                                   
                    alert(res.data.status)
                    this.setState({isLoading:true})
                  }
                 
              })
    
              }
              catch(error){
                  
                alert("Error while fetching request for on contact us update="+error)
              }
    
           }   
    
        });
       }
       catch(error){
         console.log("Error while getting fetch asyncstorage on contact us screen="+error);
       }  
      }
      componentDidMount(){
        this.handleFetchdata();
      }

      selectedIndexLabelTwo(dvalue){
        this.setState({labelTwo:dvalue})          

      }
      handleContactUs() {          
        Keyboard.dismiss();    
        this.setState({ isButtonLoader: true });    
        const { labelTwo, comments } = this.state;
        if (labelTwo && comments) {
            try {
                const syncUserInfo = AsyncStorage.getItem("user_info").then(syncResponse => {
                    let parseObject = JSON.parse(syncResponse);
                    var uid = parseObject.id;
                    var user_token = parseObject.token;
                    if (uid != null) {
                        try {
                            const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/contact-us.php", {
                                labelTwo, comments, uid, user_token
                            })
                                .then(res => {
                                    if (res.data.status == "OK") {
                                        alert("Your query has been submitted successfully. We will get back to you soon.")
                                        this.setState({ isButtonLoader: false,labelTwo:'',comments:'' });                                        
                                    }
                                    else {
                                        alert(res.data.status)
                                        this.setState({ isButtonLoader: false,labelTwo:'',comments:'' });
                                    }                                    

                                })

                        }
                        catch (error) {
                            alert("Error while sending request for saving contact us information=" + error)
                        }

                    }

                });
            }
            catch (error) {
                console.log("Error while getting asyncstorage on contact us screen=" + error);
            }
        }
        else{
            this.setState({ isButtonLoader: false });
            alert("Please enter contact reason and comments.")
        }

    }

    render() {
        const { isLoading,fname,email,buisness_name,phone,isButtonLoader,labelTwo,comments } = this.state;
        if(!isLoading){
            return (
                <View style={styles.activity_container}>
                  <ActivityIndicator animating={true} size="large" color="#FFF" />                    
                    <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', width: 110, height: 49 }} />                                                
                </View>
              )
        }
        else{
        return (
            <KeyboardAvoidingView style={styles.container}>
                <StatusBar backgroundColor="#271933" barStyle="light-content" />  
                <View style={styles.topHeader}>           
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)} style={{marginTop:10,padding:5}}>
                <IonicIcon name={'menu-outline'} color={'white'} size={30} />
          </TouchableOpacity>  
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Status')}><Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 4, width: 110, height: 49 }} /></TouchableOpacity>                            
                 </View>
                <ScrollView style={{marginTop:2,margin:3,flex: 1,height:'100%',}}>
                    <View style={[styles.inputCard, styles.elevation]}>
                        <Text style={styles.heading}>Contact Us</Text>                    
                        <Text style={styles.innerSmallText}>Need help? We're standing by Mon-Fri 8 -6 PM</Text>
                        <Text style={{marginTop:5}}></Text>
                        <TextInput editable = {false} value={fname} style={styles.input} placeholder="Name:*" onChangeText={(question) => this.setState({ question: question })} />
                        <TextInput editable = {false} value={email} style={styles.input} placeholder="Email:*" onChangeText={(answer) => this.setState({ answer: answer })} />
                        <TextInput editable = {false} value={buisness_name} style={styles.input} placeholder="Business:*" onChangeText={(answer) => this.setState({ answer: answer })} />
                        <TextInput editable = {false} value={phone} style={styles.input} placeholder="Phone number:*" onChangeText={(answer) => this.setState({ answer: answer })} />


                        <Picker mode='dropdown'
                         selectedValue={labelTwo}
                         style={{width: '90%'}} itemStyle={{height: 130,}}
                         value={labelTwo}
                         onValueChange={(itemValue, itemIndex) => { this.selectedIndexLabelTwo(itemValue) }}
                        
                    >
                        <Picker.Item label="Select Reason" value="" />
                        <Picker.Item label="Account Update" value="Account Update" />
                        <Picker.Item label="Billing" value="Billing" />
                        <Picker.Item label="Concerns" value="Concerns" />
                        <Picker.Item label="Plan Change" value="Plan Change" />
                        <Picker.Item label="Technical Difficulties" value="Technical Difficulties" /> 
                        <Picker.Item label="Other" value="Other" /> 
                    </Picker>       
                    <TextInput value={comments} style={styles.input} multiline={true} numberOfLines={6} placeholder="Comments:*" onChangeText={(comments) => this.setState({ comments: comments })} />

                        <TouchableOpacity onPress={this.handleContactUs} style={styles.btnTouch}>
                            {isButtonLoader ? (<ActivityIndicator animating={isButtonLoader} size="large" color="white" />
                            ) : (
                                <Text style={styles.btnText}>SUBMIT</Text>
                            )}
                        </TouchableOpacity>
                    </View>  
                    <View style={styles.blank_view}>
                        <Text></Text>
                    </View>                                 
                </ScrollView>                                                                                     
           <BottomTabNavigationScreen navigation={this.props.navigation} route={this.props.route} />
           </KeyboardAvoidingView>

        );
                            }
    }
}
export default ContactScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: '#271933',
        flexDirection: 'column',                

    },
    activity_container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#271933',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    inputCard: {
        backgroundColor: '#F1F1F1',
        borderRadius: 2,
        paddingVertical: 20,
        paddingHorizontal: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        minHeight: Platform.OS === 'ios' ? '60%' : '70%'

    },
    elevation: {
        elevation: 20,
        shadowColor: '#FFF',
    },

    logo: {
        marginTop: 20,
        backgroundColor: '#271933',
        borderRadius: 8,
        height: 65,
        margin: 7,
    },
    input: {
        width: "98%",
        borderColor: '#1BB467',
        padding: 7,
        margin: 4,
        marginBottom: 5,
        borderRadius: 5,
        fontSize: 18,
        borderWidth: 1,
        textAlignVertical:'top',
        color:'#000000'
    },
    btnTouch: {
        backgroundColor: '#1BB467',
        height: 45,
        padding: 10,
        width: '98%',
        margin: 5,
        borderRadius: 5,
    },
    btnText: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
        color: 'white',
    },
    heading: {                
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft:8
      },
      innerSmallText:{
        color:'#C1C1C1',
        fontSize: 14,
        paddingLeft: 8,
        paddingTop: 5
      },
      blank_view:{
        marginTop: Platform.OS === 'ios' ? 30 : 30
      },
      topHeader: {
        flexDirection:'row',
        margin: 1,
        borderRadius: 1,
        backgroundColor: '#271933',        
        height: Platform.OS === 'ios' ? 60 : 60,
        borderColor: '#8658A5',
        top:5,      
        alignContent:'flex-start'
      },

});