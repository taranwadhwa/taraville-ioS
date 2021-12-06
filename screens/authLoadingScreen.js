import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    StatusBar,
    Keyboard
}
    from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class AuthLoadingScreen extends React.Component {

    constructor(props){
        super(props);
        this.checkUser()
    }

    checkUser = async () => {
        try 
        {
            const value = await AsyncStorage.getItem('@id')
            if(value !== null) {
                this.props.navigation.navigate('App')
            }
            else{
                this.props.navigation.navigate('Auth')
            }
        } 
        catch(e) 
        {
            
        }

    }

    render() {
        return (
            <View style={styles.container}>
                    <ActivityIndicator/>
            </View>    
            )
    }
}

export default AuthLoadingScreen;
const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
})

