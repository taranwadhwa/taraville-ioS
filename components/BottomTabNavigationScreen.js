import React from 'react';
import { StyleSheet, Text, View,StatusBar, Pressable,  } from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons'

class StatusScreen extends React.Component{
  constructor(props) {        
    super(props);     
    this.state={
      croute:props.route.name,
      text_color:'black'
    }
        
  }  
  render(){     
      return(
        <View style={styles.container}>
          <View style={styles.NavigationContainer}>
            <View style={styles.NavigationInnerContainer}>
                <Text style={styles.NavigationText}>
                <Pressable onPress={()=>this.props.navigation.replace('Status')}>
                <View style={styles.icon}>
                {
                    this.state.croute=='Status'
                    ?
                    <><IonicIcon name={'options-outline'} size={20} color={'#3E2B2C'} style={{ paddingBottom: 2 }} />
                      <Text style={{ paddingLeft:8,color:'#3E2B2C' }}>Status</Text></>
                    :
                    <><IonicIcon name={'options-outline'} size={20} color={'#6E6865'} style={{ paddingBottom: 2 }} />
                    <Text style={{ paddingLeft:8,color:'#6E6865'}}>Status</Text></>
                }
                </View>
                </Pressable>
                </Text>

                <Text style={styles.NavigationText}>
                <Pressable onPress={()=>this.props.navigation.replace('Message')}>
                <View style={styles.icon}>
                {
                    this.state.croute=='Message'
                    ?
                    <><IonicIcon name={'ios-mail-outline'} size={20} color={'#3E2B2C'} style={{ paddingBottom: 2 }} />
                      <Text style={{ paddingLeft:8,color:'#3E2B2C' }}>Message</Text></>
                    :
                    <><IonicIcon name={'ios-mail-outline'} size={20} color={'#6E6865'} style={{ paddingBottom: 2 }} />
                    <Text style={{ paddingLeft:8,color:'#6E6865'}}>Message</Text></>
                }
                </View>
                </Pressable>
                </Text>  

                <Text style={styles.NavigationText}>
                <Pressable onPress={()=>this.props.navigation.replace('Insight')}>
                <View style={styles.icon}>
                {
                    this.state.croute=='Insight'
                    ?
                    <><IonicIcon name={'analytics-outline'} size={20} color={'#3E2B2C'} style={{ paddingBottom: 2 }} />
                      <Text style={{ paddingLeft:8,color:'#3E2B2C' }}>Insight</Text></>
                    :
                    <><IonicIcon name={'analytics-outline'} size={20} color={'#6E6865'} style={{ paddingBottom: 2 }} />
                    <Text style={{ paddingLeft:8,color:'#6E6865'}}>Insight</Text></>
                }
                </View>
                </Pressable>
                
                </Text> 


                <Text style={styles.NavigationText}>
                <Pressable onPress={()=>this.props.navigation.replace('Dashboard')}>
                <View style={styles.icon}>
                {
                    this.state.croute=='Dashboard'
                    ?
                    <><IonicIcon name={'person-outline'} size={20} color={'#3E2B2C'} style={{ paddingBottom: 2 }} />
                      <Text style={{ paddingLeft:8,color:'#3E2B2C' }}>Profile</Text></>
                    :
                    <><IonicIcon name={'person-outline'} size={20} color={'#6E6865'} style={{ paddingBottom: 2 }} />
                    <Text style={{ paddingLeft:8,color:'#6E6865'}}>Profile</Text></>
                }
                </View>
                </Pressable>
                </Text> 

              
              
            </View>
          </View>
        </View>
      )
  }
}
export default StatusScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c1c1c1',
    alignItems:'center',
    justifyContent: 'center',    
    flexDirection:'column',    
    position:'absolute',
    bottom:2,
    height:'9%',
    borderRadius:5,            
    alignSelf:'center'  
  },
  
  NavigationContainer:{ 
    justifyContent:'center',
    textAlign:'center',    
    width:'100%',
    backgroundColor:'#C0C0C0',        
    flexDirection:'row',
    margin:1,    
    borderRadius:13,    
  },
  NavigationInnerContainer:{
    borderWidth:1,
    borderColor:'#c1c1c1',
    borderRadius:13,
    flexDirection:'row',
    width:'100%',
    borderRadius:10,
    shadowOpacity:0.3,
    shadowRadius:3,
    shadowOffset:{
      height:0,
      width:0
    },
    justifyContent:'space-evenly'
    
  },
  NavigationText:{
    padding:8,
    margin:13,    
    fontSize:17,
    shadowOpacity:0.3,
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
