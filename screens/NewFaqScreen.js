import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, SafeAreaView, Image,ScrollView,TextInput, Platform, ActivityIndicator,LogBox,KeyboardAvoidingView, Keyboard } from 'react-native';
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
LogBox.ignoreAllLogs();

class NewFaqScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
            isButtonLoader: false
        }
        this.handleFaq = this.handleFaq.bind(this);

    }

    handleFaq() {
        Keyboard.dismiss();    
        this.setState({ isButtonLoader: true });    
        const { question, answer } = this.state;
        if (question && answer) {
            try {
                const syncUserInfo = AsyncStorage.getItem("user_info").then(syncResponse => {
                    let parseObject = JSON.parse(syncResponse);
                    var uid = parseObject.id;
                    var user_token = parseObject.token;
                    if (uid != null) {
                        try {
                            const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/faq.php", {
                                question, answer, uid, user_token
                            })
                                .then(res => {
                                    if (res.data.status == "OK") {
                                        alert("FAQ information has been successfully saved.")
                                        this.setState({ isButtonLoader: false,question:'',answer:'' });
                                        this.props.navigation.navigate('My Faq')
                                    }
                                    else {
                                        alert(res.data.status)
                                        this.setState({ isButtonLoader: false,question:'',answer:'' });
                                    }                                    

                                })

                        }
                        catch (error) {
                            alert("Error while sending request for saving add new faq information=" + error)
                        }

                    }

                });
            }
            catch (error) {
                console.log("Error while getting asyncstorage on add new faq screen=" + error);
            }
        }
        else{
            this.setState({ isButtonLoader: false });
            alert("Please enter question and answer.")
        }

    }

    render() {
        const { isButtonLoader } = this.state;
        return (
            <><KeyboardAvoidingView style={styles.container}>
                <StatusBar backgroundColor="#271933" barStyle="light-content" />  
                <View> 
                    <View style={[styles.inputCard, styles.elevation]}>
                        <Text style={styles.heading}>Add New Question</Text>                    
                        <Text style={styles.innerSmallText}>Please enter new faq question and answer.</Text>
                        <Text style={{marginTop:5}}></Text>
                        <TextInput value={this.state.question} style={styles.input} multiline={true} numberOfLines={5} placeholder="Enter question:*" onChangeText={(question) => this.setState({ question: question })} />
                        <TextInput  value={this.state.answer} style={styles.input} multiline={true} numberOfLines={5} placeholder="Enter answer:*" onChangeText={(answer) => this.setState({ answer: answer })} />
                        <TouchableOpacity onPress={this.handleFaq} style={styles.btnTouch}>
                            {isButtonLoader ? (<ActivityIndicator animating={isButtonLoader} size="large" color="white" />
                            ) : (
                                <Text style={styles.btnText}>SUBMIT</Text>
                            )}
                        </TouchableOpacity>
                    </View>               
                </View>                                                              
            </KeyboardAvoidingView>
            <View><Text><BottomTabNavigationScreen navigation={this.props.navigation} route={this.props.route} /></Text></View></>
            

        );
    }
}
export default NewFaqScreen;
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
        borderColor: '#C1C1C1',
        padding: 7,
        margin: 4,
        marginBottom: 5,
        borderRadius: 5,
        fontSize: 18,
        borderWidth: 1,
        textAlignVertical:'top',
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

});