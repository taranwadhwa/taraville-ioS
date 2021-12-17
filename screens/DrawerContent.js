import React from 'react';
import {
  StyleSheet, Text, View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Modal,
  Pressable,
  Platform,
  Alert,  
  ActivityIndicator,
  TouchableWithoutFeedback, Keyboard,

} from 'react-native';
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import IonicIcon from 'react-native-vector-icons/Ionicons';
const DrawerContent = (props) => {
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.DrawerContent}>
                    <Text style={styles.menuItem}>My Staff</Text>
                    <Text style={styles.menuItem}>My FAQ</Text>
                </View>
            </DrawerContentScrollView>
            
            <DrawerItem label="Sign out"> 

            </DrawerItem>

        </View>
    );
}
const styles = StyleSheet.create
({
    DrawerContent:{
      padding:10,
      margin:20,
        
    },
    menuItem:{
        color:'blue',
        padding:20
    }
});

export default DrawerContent;




