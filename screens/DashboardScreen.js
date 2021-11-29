import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


class DashboardScreen extends React.Component{
  constructor(props) {
    super(props); 
  }
  render(){
      return(
        <View style={styles.container}>
        <Text onPress={this.props.navigation.navigate('Status')}>This is dadshboard screen</Text>
        <StatusBar style="auto" />
      </View>
      )
  }
}
export default DashboardScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
