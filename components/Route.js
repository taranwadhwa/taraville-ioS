import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import StatusScreen from '../screens/StatusScreen';
import MessageScreen from '../screens/MessageScreen';
import InsightScreen from '../screens/InsightScreen';
import StaffScreen  from '../screens/StaffScreen';
import {Dimensions} from 'react-native'
import IonicIcon from 'react-native-vector-icons/Ionicons'

const fullScreenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function loginStackScreen(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}/>
    </Stack.Navigator>
  );
}

function dashboardStackScreen(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Dashboard"  component={DashboardScreen}/>
    </Stack.Navigator>
  );
}
function statusStackScreen(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Status" component={StatusScreen} />
    </Stack.Navigator>
  );
}
function staffStackScreen(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Staff" component={StaffScreen} />
    </Stack.Navigator>
  );
}

export default function Route(props)
{
  return(
    <NavigationContainer>    
    <Stack.Navigator initialRouteName="Message" screenOptions={{
        headerShown: false,        
      }}>        
        <Stack.Screen name="Message" component={MessageScreen}/>
        <Stack.Screen name="Status" component={StatusScreen}/>        
        <Stack.Screen name="Insight" component={InsightScreen}/>
        <Stack.Screen name="Dashboard" component={DashboardScreen}/>      
        <Stack.Screen name="Login" component={LoginScreen}/>          
     </Stack.Navigator>              
    </NavigationContainer>
       
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#271933',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
