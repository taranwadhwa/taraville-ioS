import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,{ useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import StatusScreen from './screens/StatusScreen';
import InsightScreen from './screens/InsightScreen';
import StaffScreen from './screens/StaffScreen';
import MessageScreen from './screens/MessageScreen';
import FaqScreen  from './screens/FaqScreen';
import { AuthContext } from './components/context';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import axios  from 'axios';

const Stack = createStackNavigator();

const App = () => {  
  const initialLoginState = {
    isLoading: true,    
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,          
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,          
          userToken: null,
          isLoading: false
        };
      case 'REGISTER':
        return {
          ...prevState,          
          userToken: action.token,
          isLoading: false
        };
    }

  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const authContext = React.useMemo(() => ({
    signIn: async (userAuthToken,userID) => {      
      let userToken;
      userToken = null;      
      if(userAuthToken && userID) 
      {
        let user_object={
          id:userID,
          token:userAuthToken,
        }          
        userToken = userAuthToken;   
        AsyncStorage.setItem("token", userToken);                        
        AsyncStorage.setItem("user_info", JSON.stringify(user_object));             
        dispatch({ type: 'LOGIN', token: userToken });       
      }     
      else{alert("Unauthorize access.")}
    },
    signOut: async () => {      
      try {
        await AsyncStorage.removeItem("token");
      }
      catch (error) {
        console.log(error)
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      setIsLoading(false);
      setUserToken('anything');
    },

  }), []);


  useEffect(() => {
    setTimeout(async () => {
      //setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("token");
      }
      catch (error) {
        console.log(error)
      }


      dispatch({ type: 'REGISTER', token: userToken });
    }, 1000)
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  // ends //
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          loginState.userToken == null ? (
            <Stack.Navigator screenOptions={{
              headerShown: false,
            }}>
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
          )
            :
            <Stack.Navigator initialRouteName="Status" screenOptions={{
              headerShown: false,
            }}>

              <Stack.Screen name="Status" component={StatusScreen} />
              <Stack.Screen name="Insight" component={InsightScreen} />
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="Staff" component={StaffScreen} />
              <Stack.Screen name="Message" component={MessageScreen}/>
              <Stack.Screen name="Faq" component={FaqScreen}/>       
            </Stack.Navigator>
        }

      </NavigationContainer>
    </AuthContext.Provider>

  );
}


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
