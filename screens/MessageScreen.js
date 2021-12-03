import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,
  TextInput,
  TouchableOpacity,
  Image,

} from 'react-native';
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen'

class MessageScreen extends React.Component{
    constructor(props) {
      super(props); 
    }
    render(){
        return(
          <View style={styles.container}>
            <View style={styles.logo}>
              <Image source = {require("../assets/logo.png")} style={{resizeMode:'contain',marginTop:10,width:170,height:55}}/>
            </View>   
              <Text>This is mesdddsage screen</Text>
          <StatusBar style="auto" />
          <BottomTabNavigationScreen navigation={this.props.navigation} route={this.props.route}/>  
        </View>
        )
    }
  }
  export default MessageScreen;
const styles = StyleSheet.create
({
  container: {
      flex: 1,
      alignItems:'stretch',
      justifyContent: 'center',
      backgroundColor:'#271933',
      flexDirection:'column'     
    },
    logo:{                
      marginTop:20,
      backgroundColor:'#271933',    
      borderRadius:8,
      height:65,
      margin:7,
          
    }, 
});