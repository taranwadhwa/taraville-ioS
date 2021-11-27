import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import StatusScreen from '../screens/StatusScreen';
import {Dimensions} from 'react-native'

const fullScreenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function loginStackScreen(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="Login" component={LoginScreen}/>
    </Tab.Navigator>
  );
}

function dashboardStackScreen(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen}/>
    </Tab.Navigator>
  );
}
function statusStackScreen(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="Status" component={StatusScreen}/>
    </Tab.Navigator>
  );
}

export default function Route(props)
{
  return(    
    <NavigationContainer>
      <Stack.Navigator>        
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={dashboardStackScreen} />
        <Stack.Screen name="Status" component={statusStackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
