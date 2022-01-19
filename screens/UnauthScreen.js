import React, { useEffect } from 'react';
import {
    StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableOpacity, ScrollView,
    Modal, Pressable, Platform, ActivityIndicator, KeyboardAvoidingView, LogBox, RefreshControl
} from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons'
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen';
import { AuthContext } from '../components/context';


const UnauthScreen = ({ navigation, props }) => {
    const { signOut } = React.useContext(AuthContext);
    return (
        <View style={styles.container}>
            <View style={styles.login_container}>
                <View style={styles.login_inner_container}>
                    <View style={styles.logo}>
                        <Image source={require("../assets/tara_green_logo.png")} style={{ width: 200, height: 50, resizeMode: 'contain' }} />
                    </View>
                    <Text>Unauthorize access of the app.</Text>
                    <TouchableOpacity onPress={() => { signOut() }}><Text >LOGOUT</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default UnauthScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#271933',
        flexDirection: 'column'
    },
    logo: {
        marginTop: 20,
        backgroundColor: '#271933',
        borderRadius: 8,
        height: 65,
        margin: 7,
    },
    messagesCard: {
        backgroundColor: '#f1f1f1',
        borderRadius: 2,
        width: '100%',
        marginVertical: 2,
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0
        },
        padding: 15


    },
    btnTouch: {
        backgroundColor: '#1BB467',
        padding: 8,
        borderRadius: 5,
        flex: 1,
        justifyContent: 'space-around'

    },

    btnText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        padding: 5,
        paddingBottom: 5,

    },
});