import * as React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar, 
  Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signIn } = React.useContext(AuthContext);

  return(
    <View style={styles.container}>
      <StatusBar backgroundColor="#271933" barStyle="light-content"/>          
      <View style={styles.logo}>
        <Image source = {require("../assets/logo.png")}/>
      </View>
      <TextInput autoCapitalize="none"  onChangeText={(email)=>this.setState({email:email})}/>
      <TextInput placeholder="Password:" onChangeText={(password)=>this.setState({password:password})} secureTextEntry={true}/>
      
      <View style={styles.btnContainer}>            
        <TouchableOpacity onPress={()=>this.doLogin()}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>  
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#271933',
   
  },
  logo:{
    fontSize:20,
    margin:10,
    color:'white'
    
  },
  input:{
    width:"90%",
    backgroundColor:'#FFFFFF',
    padding:15,
    marginBottom:10,
    borderRadius:3,
    fontSize:18
    
  },
  userBtn:{
      padding:15,
      width:'45%',
      backgroundColor:'#32DD87',
      width:"90%",
      borderRadius:3
  },
  btnContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingTop:3,    
  },
  btnText:{
    fontSize:18,
    textAlign:"center",
    fontWeight:"bold",
    color:'#FFF'
  },
  passwordContainer:{
    flexDirection:"row-reverse",
    paddingTop:25,
    width:'90%'
    
  },
  forgot_button:{
    fontSize:14,
    textAlign:'right',
    fontWeight:"normal",
    color:'#fff',
    
  },
  half_width: {
    borderWidth: 1,
    borderColor: '#C1C1C1',
    width:"90%",
    backgroundColor:'#FFFFFF',
    padding:15,
    marginBottom:10,
    borderRadius:3,
    fontSize:18
},
});
