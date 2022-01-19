import React from 'react'
import { StyleSheet, Text, View,LogBox,SafeAreaView,Image,ImageBackground } from 'react-native';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import  AsyncStorage  from "@react-native-async-storage/async-storage";

const CustomDrawer=(props)=>{
    const [data, setData] = React.useState({
        userID:'',
        userBuisness:'',
      })

    const syncUserInfo = AsyncStorage.getItem("user_info")
    .then(syncResponse => {
        let parseObject = JSON.parse(syncResponse);
        var uid = parseObject.id;
        var buisness_name = parseObject.bname;        
        if (uid != null) 
        {
            setData({...data,userID:uid,userBuisness:buisness_name});
        }            
    }); 
   
    return(
        <View style={{flex:1}}>
        <DrawerContentScrollView {...props}>
        <ImageBackground 
        source={require('../assets/menu-bg.jpg')} 
        style={{padding:20}}>
            <Image source={require('../assets/user-profile.jpg')} style={{height:80,width:80,borderRadius:40,marginBottom:10}}/>
        <Text style={{color:'#FFF',fontSize:12,fontFamily:'Roboto-Medium'}}>Buisness name: {data.userBuisness}</Text>
        <Text style={{color:'#FFF',fontSize:12,fontFamily:'Roboto-Medium'}}>Account #: {data.userID}</Text>
        </ImageBackground> 
            <View style={{backgroundColor:'#FFFFFF',paddingTop:10}}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
       
        </View>
    )

}

export default CustomDrawer;