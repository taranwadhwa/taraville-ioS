import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class MessageScreen extends React.Component{
    constructor(props) {
      super(props); 
    }
    render(){
        return(
          <View style={styles.container}>
          <Text onPress={this.props.navigation.navigate('Status')}>This is message screen</Text>
          <StatusBar style="auto" />
        </View>
        )
    }
  }
  export default MessageScreen;
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#271933',
      },
  });