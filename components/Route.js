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
    <Stack.Navigator initialRouteName="Status" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Dashboard">{()=>(
          <Tab.Navigator screenOptions={({route})=>({
              headerTitle:()=><Text>Header</Text>,
              tabBarIcon:({focused,color,size,padding}) => {
                  let iconName;
                    if(route.name =='Status'){
                      iconName = focused ? 'status' : 'status-outline';
                    }
                    else if(route.name == 'Profile'){
                      iconName = focused ? 'person' : 'person-outline';
                    }

                    return(
                      <IonicIcon name={iconName} size={size} color={color} style={{paddingBottom:padding}}/>
                    )

              }

          })}
            tabBarOptions={{
              activeTintColor:'lightseagreen',
              inactiveTintColor:'grey',
              labelStyle:{fontSize:14},
              style:{width:fullScreenWidth}
            }}
          >           
             <Tab.Screen name="Status" component={StatusScreen} />            
             <Tab.Screen name="Profile" component={DashboardScreen} />
             <Tab.Screen name="Messages" component={MessageScreen} />
             <Tab.Screen name="Insights" component={InsightScreen} />
           
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
