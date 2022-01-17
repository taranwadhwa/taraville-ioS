import React from 'react'
import { StyleSheet, Text, View,ActivityIndicator,LogBox,SafeAreaView,Image } from 'react-native';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import { ImageBackground } from 'react-native-web';

const CustomDrawer=(props)=>{
    return(
        <View style={{flex:1}}>
        <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:'#8200d6'}}>
            <ImageBackground source={require('assets/menu-bg.jpg')} style={{padding:20}}>
                <Image source={require('assets/user-profile.jpg')} style={{height:80,width:80,borderRadius:40,marginBottom:10}}/>
            </ImageBackground>
            <View style={{backgroundColor:'#FFFFFF',paddingTop:10}}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
        <View><Text>This is taran</Text></View>
        </View>
    )

}

export default CustomDrawer;