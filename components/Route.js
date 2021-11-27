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
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}/>
    </Stack.Navigator>
  );
}

function dashboardStackScreen(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen}/>
    </Stack.Navigator>
  );
}
function statusStackScreen(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Status" component={StatusScreen}/>
    </Stack.Navigator>
  );
}

export default function Route(props)
{
  return(    
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Dashboard">{()=>(
          <Tab.Navigator screenOptions={{
            headerShown: false
          }}>           
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Status" component={StatusScreen} />
          </Tab.Navigator>  
        )
      }
      </Stack.Screen>
      <Stack.Screen name="Login" component={LoginScreen}/>
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
