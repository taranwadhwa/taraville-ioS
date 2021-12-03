import React from 'react';
import { StyleSheet, Text, View,StatusBar,  } from 'react-native';
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen'

class StatusScreen extends React.Component{
  constructor(props) {
    super(props); 
  }
  render(){ 
      return(
        <View style={styles.container}>
        <StatusBar backgroundColor="#271933" barStyle="light-content"/>      
        <Text>This is status sdcreen</Text>
        <BottomTabNavigationScreen navigation={this.props.navigation} route={this.props.route}/>            
      </View>
      )
  }
}
export default StatusScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',    
  },
});
