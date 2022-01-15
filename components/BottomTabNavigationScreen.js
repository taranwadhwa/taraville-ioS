import React from 'react';
import { StyleSheet, Text, View,StatusBar, Pressable,  } from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../components/context';

const BottomTab=(props)=>
{   
  const [data, setData] = React.useState({
    croute:props.route.name,    
  });  
    
  const {signOut} = React.useContext(AuthContext);  
  return(      
    <View style={styles.container}>
      <View style={styles.NavigationContainer}>
        <View style={styles.NavigationInnerContainer}>          
            <Text style={styles.NavigationText}>
            <Pressable onPress={()=>props.navigation.navigate('Status')}>
              <View style={styles.icon}>
              {                
                data.croute =='Status'?
                  <><IonicIcon name={'options'} size={20} color={'#3E2B2C'} style={{ paddingBottom: 2 }} />
                  <Text style={{ paddingLeft:8,color:'#3E2B2C' }}>Status</Text></>
                  :
                  <><IonicIcon name={'options-outline'} size={20} color={'#9E9E9E'} style={{ paddingBottom: 2 }} />
                  <Text style={{ paddingLeft:8,color:'#9E9E9E'}}>Status</Text></>

                }
              </View>
            </Pressable>
            </Text>  

            <Text style={styles.NavigationText}>
              <Pressable onPress={()=>props.navigation.navigate('Message')}>
            <View style={styles.icon}>
            {                
                data.croute=='Message'? 
            <><IonicIcon name={'ios-mail'} size={22} color={'#3E2B2C'} style={{ paddingBottom: 2 }} />
             <Text style={{ paddingLeft:8,color:'#3E2B2C' }}>Message</Text></>
            :
            <><IonicIcon name={'ios-mail-outline'} size={22} backgroundColor={'#9E9E9E'} color={'#6E6865'} style={{ paddingBottom: 2 }} />
            <Text style={{ paddingLeft:8,color:'#9E9E9E'}}>Message</Text></>
            }

            </View>
            </Pressable>
            
            </Text> 


            <Text style={styles.NavigationText}>
            <Pressable onPress={()=>props.navigation.replace('Insight')}>
            <View style={styles.icon}>
            {                
                data.croute=='Insight'?   
            <><IonicIcon name={'analytics'} size={22} color={'#3E2B2C'} style={{ paddingBottom: 2 }} />
                      <Text style={{ paddingLeft:8,color:'#3E2B2C' }}>Insight</Text></>
              :
              <><IonicIcon name={'analytics-outline'} size={22} color={'#9E9E9E'} style={{ paddingBottom: 2 }} />
              <Text style={{ paddingLeft:8,color:'#9E9E9E'}}>Insight</Text></>
            }
             
            </View>
            </Pressable>
            </Text> 


            <Text style={styles.NavigationText}>
            <Pressable onPress={()=>props.navigation.navigate('Dashboard')}>
            <View style={styles.icon}>
            {                
                data.croute=='Dashboard'?   
                <><IonicIcon name={'person'} size={20} color={'#3E2B2C'} style={{ paddingBottom: 2 }} />
                <Text style={{ paddingLeft:8,color:'#3E2B2C' }}>Profile</Text></>
              :
              <><IonicIcon name={'person-outline'} size={20} color={'#9E9E9E'} style={{ paddingBottom: 2 }} />
              <Text style={{ paddingLeft:8,color:'#9E9E9E'}}>Profile</Text></>
            }
             
            </View>
            </Pressable>
            </Text>   

            <Text style={styles.NavigationText}>
            <Pressable onPress={()=>{signOut()}}>
            <View style={styles.icon}>                  
                <IonicIcon name={'log-out-outline'} size={20} color={'#9E9E9E'} style={{paddingBottom:2}}/>
            
              <Text style={{paddingLeft:8,color:'#9E9E9E'}}>Logout</Text>
             
            </View>
            </Pressable>
            </Text>          
          
        </View>
      </View>
    </View>
  )
}
export default BottomTab;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems:'center',
    justifyContent: 'center',    
    flexDirection:'column',    
    position:'absolute',
    bottom:1,
    height:'10%',
    borderRadius:5,            
    alignSelf:'center',
    margin:5,
    borderTopWidth:1,
    borderTopColor:'#CCCCCC'      
  },
  
  NavigationContainer:{ 
    justifyContent:'center',
    textAlign:'center',    
    width:'100%',
    backgroundColor:'#FFF',        
    flexDirection:'row',
    margin:1,    
    borderRadius:13,
    
  },
  NavigationInnerContainer:{
    borderWidth:1,
    borderColor:'#FFF',
    borderRadius:13,
    flexDirection:'row',
    width:'100%',
    borderRadius:10,
    shadowOpacity:0.1,
    shadowRadius:3,
    shadowOffset:{
      height:0,
      width:0
    },
    justifyContent:'space-evenly'
    
  },
  NavigationText:{    
    margin:13,    
    fontSize:17,
    shadowOpacity:0.1,
    shadowRadius:3,
    shadowOffset:{
      height:0,
      width:0
    },
   
  },
  icon:{
    flexDirection:'column',
    alignItems:'center',    
    
  }
});