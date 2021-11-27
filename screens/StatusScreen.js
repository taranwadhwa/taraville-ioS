import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


class StatusScreen extends React.Component{
  constructor(props) {
    super(props); 
  }
  render(){ 
      return(
        <View style={styles.container}>
        <Text onPress={()=>this.props.navigation.navigate('Dashboard')}>This is status screen</Text>
        <StatusBar style="auto" />
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
