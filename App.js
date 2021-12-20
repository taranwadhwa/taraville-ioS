import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,{ useEffect } from 'react';
import { NavigationContainer,useRoute } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator,DrawerButton } from '@react-navigation/drawer';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import StatusScreen from './screens/StatusScreen';
import NewStatusScreen from './screens/NewStatusScreen';
import InsightScreen from './screens/InsightScreen';
import StaffScreen from './screens/StaffScreen';
import MessageScreen from './screens/MessageScreen';
import FaqScreen  from './screens/FaqScreen';
import NewFaqScreen from './screens/NewFaqScreen';
import NewStaffScreen from './screens/AddStaffScreen';
import { AuthContext } from './components/context';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import axios  from 'axios';
import IonicIcon from 'react-native-vector-icons/Ionicons';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const App = (props) => {  
  const initialLoginState = {
    isLoading: true,    
    userToken: null,
  };

  const DrawerRoute=()=>{     
    return (
      <Drawer.Navigator screenOptions={{        
        drawerStyle: {
          backgroundColor: '#FFF',
          padding:10,
          width:250,                    
        },
        headerStyle: {
          height: 60,
          backgroundColor:'#1BB467',          
                    
        },        
        overlayColor: 'transparent',
        headerTintColor: '#FFF',        
        drawerItemStyle:{          
          padding:3,
          borderBottomWidth:1,
          borderBottomColor:'#1BB467'          
        },
        drawerContentStyle:{
          top:50,          
        },           
                
      }}>                   
        <Drawer.Screen name="Status" component={StatusScreen} options={{ 
          drawerActiveBackgroundColor:'#1BB467',
          drawerActiveTintColor:'#FFF',
          drawerInactiveTintColor:'#000',
          drawerLabel: 'Status',          
          drawerIcon: ({focused, size}) => (
          <IonicIcon
             name="person-outline"
             size={20}
             color={'#271933'}                                       
          />
          ), }} />   

        <Drawer.Screen name="New Status"  component={NewStatusScreen}  options={{ 
          drawerActiveBackgroundColor:'#1BB467',
          drawerActiveTintColor:'#FFF',
          drawerInactiveTintColor:'#000',
          drawerLabel: 'New Status',
        drawerIcon: ({focused, size}) => (
          <IonicIcon
             name="person-circle-outline"
             size={20}
             color={'#271933'}                         
          />
       ), }} />      
        
        <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{
          drawerActiveBackgroundColor:'#1BB467',
          drawerActiveTintColor:'#FFF',
          drawerInactiveTintColor:'#000', 
          drawerLabel: 'My Profile',          
          drawerIcon: ({focused, size}) => (
          <IonicIcon
             name="person-outline"
             size={20}
             color={'#271933'}             
          />
          ), }} />                                   
        <Drawer.Screen name="My Staff"  component={StaffScreen}  options={{ 
           drawerActiveBackgroundColor:'#1BB467',
           drawerActiveTintColor:'#FFF',
           drawerInactiveTintColor:'#000', 
           drawerLabel: 'My Staff',
        drawerIcon: ({focused, size}) => (
          <IonicIcon
             name="person-circle-outline"
             size={20}
             color={'#271933'}             
             
          />
       ), }} />
        
        <Drawer.Screen name="Add New Staff" component={NewStaffScreen} options={{ drawerLabel: 'New Staff',         
          drawerActiveBackgroundColor:'#1BB467',
          drawerActiveTintColor:'#FFF',
          drawerInactiveTintColor:'#000', 
         
         drawerIcon: ({focused, size}) => (
          <IonicIcon
             name="person-add-outline"
             size={20}
             color={'#271933'}
          />
       ), }}       />
               
              
        <Drawer.Screen name="My Faq" component={FaqScreen} options={{ drawerLabel: 'FAQ',
         drawerActiveBackgroundColor:'#1BB467',
         drawerActiveTintColor:'#FFF',
         drawerInactiveTintColor:'#000',
         
         drawerIcon: ({focused, size}) => (
          <IonicIcon
             name="newspaper-outline"
             size={20}
             color={'#271933'}
          />
       ), }}     
        />     

      <Drawer.Screen name="Add New Question" component={NewFaqScreen} options={{ drawerLabel: 'New FAQ',
        drawerActiveBackgroundColor:'#1BB467',
        drawerActiveTintColor:'#FFF',
        drawerInactiveTintColor:'#000',
        drawerIcon: ({focused, size}) => (
          <IonicIcon
             name="add-outline"
             size={20}
             color={'#271933'}
          />
       ), }}     
        />     

      </Drawer.Navigator>
    );
  }

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
              <Stack.Screen name="Status" component={DrawerRoute}   />
              <Stack.Screen name="Dashboard" component={DrawerRoute}  />                                                  
              <Stack.Screen name="Message" component={MessageScreen} />               
              <Stack.Screen name="Insight" component={InsightScreen}  />                          
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
