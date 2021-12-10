import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, SafeAreaView, Image, TextInput,Platform,ActivityIndicator } from 'react-native';
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios  from 'axios';
class StaffScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            full_name:'',
            position:'',
            email:'',
            phone:'',
            isButtonLoading:false
        }
        this.handleStaff = this.handleStaff.bind(this);

    }

    handleStaff(){      
        this.setState({isButtonLoading:true});  
        const{full_name,position,email,phone} = this.state;   
        if(email && full_name){        
        try {
            const syncUserInfo = AsyncStorage.getItem("user_info").then(syncResponse => {
                let parseObject = JSON.parse(syncResponse);
                var uid = parseObject.id;
                var user_token = parseObject.token;
                if (uid != null) {
                    try {
                        const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/staff.php", {
                            full_name, position,email,phone,uid,user_token
                        })
                        .then(res => {
                            console.log(res)
                            if (res.data.status == "OK") {
                                this.setState({isButtonLoading:false});  
                                alert("Staff information has been successfully saved.")
                            } 
                            else if(res.data.status == "EXISTS"){
                                this.setState({isButtonLoading:false});  
                                alert("Entered staff information already exists. This can not be added again.")   
                            }
                            else {       
                                this.setState({isButtonLoading:false});                           
                                alert(res.data.status)
                            }

                        })

                    }
                    catch (error) {
                        alert("Error while sending request for saving staff information=" + error)
                    }

                }

            });
        }
        catch (error) {
            alert("catch of")
            console.log("Error while getting asyncstorage on staff screen=" + error);
        }
    }


    }

    render() {
        const{isButtonLoading}=this.state;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#271933" barStyle="light-content" />
                <View style={styles.logo}>
                    <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 10, width: 170, height: 55 }} />
                </View>
                <View style={[styles.inputCard, styles.elevation]}>
                    <Text style={styles.heading}>Staff Information</Text>
                    <TextInput style={styles.input} placeholder="Full name:*" onChangeText={(full_name) => this.setState({ full_name: full_name })} />
                    <TextInput style={styles.input} placeholder="Position:" onChangeText={(position) => this.setState({ position: position })} />
                    <TextInput style={styles.input} placeholder="E-mail:*" onChangeText={(email) => this.setState({ email: email })} />
                    <TextInput style={styles.input} placeholder="Phone #:" onChangeText={(phone) => this.setState({ phone: phone })} />
                </View>

                <View>
                    <TouchableOpacity onPress={this.handleStaff} style={styles.btnTouch}>
                        {isButtonLoading? (
                        <ActivityIndicator animating={isButtonLoading} size="large" color="white"/>
                        ) : (<Text style={styles.btnText}>SUBMIT</Text>)
                        }   
                    </TouchableOpacity>
                </View>
                <BottomTabNavigationScreen navigation={this.props.navigation} route={this.props.route} />
            </View>

        );
    }
}
export default StaffScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: '#271933',
        flexDirection: 'column',

    },
    inputCard: {
        backgroundColor: '#F1F1F1',
        borderRadius: 8,
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
        height: Platform.OS === 'ios' ? '60%' : '52%'

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
        width: "95%",
        borderColor: '#271833',
        padding: 10,
        margin: 8,
        borderRadius: 5,
        fontSize: 18,
        borderWidth: 1

    },
    btnTouch: {
        backgroundColor: '#1BB467',
        height: 45,
        padding: 10,
        width: '95%',
        margin: 10,
        borderRadius: 50,
    },
    btnText: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
        color: 'white',
    },


});