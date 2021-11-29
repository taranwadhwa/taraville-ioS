import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class InsightScreen extends React.Component{
    constructor(props) {
      super(props); 
    }
    render(){
        return(
          <View style={styles.container}>
          <Text onPress={this.props.navigation.navigate('Status')}>This is insight screen</Text>
          <StatusBar style="auto" />
        </View>
        )
    }
  }
  export default InsightScreen;
  const styles = StyleSheet.create({
    container: {
        flex: 1,        
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#271933',
      },
  });