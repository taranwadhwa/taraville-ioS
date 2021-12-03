import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen'

class InsightScreen extends React.Component{
    constructor(props) {
      super(props); 
    }
    render(){
        return(
          <View style={styles.container}>
          <StatusBar backgroundColor="#271933" barStyle="light-content"/> 
          <Text>This is insight screen</Text>          
          <BottomTabNavigationScreen navigation={this.props.navigation} route={this.props.route}/>        
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