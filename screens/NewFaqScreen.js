import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, SafeAreaView, Image, TextInput, Platform, ActivityIndicator } from 'react-native';
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
                                        this.setState({ isButtonLoader: false });
                                        alert("FAQ information has been successfully saved.")
                                    }
                                    else {
                                        alert(res.data.status)
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
            <View style={styles.container}>
                <StatusBar backgroundColor="#271933" barStyle="light-content" />
                <View style={styles.logo}>
                    <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 10, width: 170, height: 55 }} />
                </View>
                <View style={[styles.inputCard, styles.elevation]}>
                    <Text style={styles.heading}>FAQ Information</Text>
                    <TextInput style={styles.input} placeholder="Enter your question:*" onChangeText={(question) => this.setState({ question: question })} />
                    <TextInput style={styles.input} placeholder="Enter answer:*" onChangeText={(answer) => this.setState({ answer: answer })} />
                </View>

                <View>
                    <TouchableOpacity onPress={this.handleFaq} style={styles.btnTouch}>
                        {isButtonLoader ? (<ActivityIndicator animating={isButtonLoader} size="large" color="white" />
                        ) : (
                            <Text style={styles.btnText}>SUBMIT</Text>
                        )}
                    </TouchableOpacity>
                </View>
                <BottomTabNavigationScreen navigation={this.props.navigation} route={this.props.route} />
            </View>

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