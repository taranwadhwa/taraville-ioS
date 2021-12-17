import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, SafeAreaView, Image, TextInput,Platform,ActivityIndicator,ScrollView } from 'react-native';
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios  from 'axios';
import IonicIcon from 'react-native-vector-icons/Ionicons';

const StaffScreen = ({ navigation }) => {
    return(
        <View style={styles.container}>
          <StatusBar backgroundColor="#271933" barStyle="light-content" />
          <View style={styles.logo}>
            <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 10, width: 170, height: 55 }} />
          </View>

          <View style={[styles.messagesCard, styles.elevation]}>
            
            <View style={{flexDirection:'row'}}>            
              <TouchableOpacity style={styles.btnTouch}>                
                  <Text style={styles.btnText}>
                    <IonicIcon name={'add-outline'} color={'white'} size={20} />Add New Employee
                  </Text>                                               
              </TouchableOpacity>                                                  
            </View>
          </View>

          <ScrollView style={{ marginTop: 2, margin: 3, flex: 1, height: '100%' }}>                              
            <View style={[styles.messagesCard, styles.elevation]}>            
                <View style={{ flexDirection: 'row', padding:3, margin: 2, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>                    
                    <Text style={{ width: '50%' }}>
                    <View style={styles.dateRow}>
                        <Text style={styles.innerText}><Text style={styles.label_trick}>Name:</Text> abcxyz</Text>
                    </View>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '40%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Email:</Text> dsdsdfsfd</Text>
                  </View>
                </Text>
              </View>

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Phone:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Position:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  


            </View> 
            <View style={[styles.messagesCard, styles.elevation]}>            
                <View style={{ flexDirection: 'row', padding:3, margin: 2, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>                    
                    <Text style={{ width: '50%' }}>
                    <View style={styles.dateRow}>
                        <Text style={styles.innerText}><Text style={styles.label_trick}>Name:</Text> abcxyz</Text>
                    </View>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '40%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Email:</Text> dsdsdfsfd</Text>
                  </View>
                </Text>
              </View>

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Phone:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Position:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  


            </View> 

            <View style={[styles.messagesCard, styles.elevation]}>            
                <View style={{ flexDirection: 'row', padding:3, margin: 2, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>                    
                    <Text style={{ width: '50%' }}>
                    <View style={styles.dateRow}>
                        <Text style={styles.innerText}><Text style={styles.label_trick}>Name:</Text> abcxyz</Text>
                    </View>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '40%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Email:</Text> dsdsdfsfd</Text>
                  </View>
                </Text>
              </View>

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Phone:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Position:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  


            </View> 

            <View style={[styles.messagesCard, styles.elevation]}>            
                <View style={{ flexDirection: 'row', padding:3, margin: 2, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>                    
                    <Text style={{ width: '50%' }}>
                    <View style={styles.dateRow}>
                        <Text style={styles.innerText}><Text style={styles.label_trick}>Name:</Text> abcxyz</Text>
                    </View>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '40%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Email:</Text> dsdsdfsfd</Text>
                  </View>
                </Text>
              </View>

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Phone:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Position:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  


            </View> 

            <View style={[styles.messagesCard, styles.elevation]}>            
                <View style={{ flexDirection: 'row', padding:3, margin: 2, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>                    
                    <Text style={{ width: '50%' }}>
                    <View style={styles.dateRow}>
                        <Text style={styles.innerText}><Text style={styles.label_trick}>Name:</Text> abcxyz</Text>
                    </View>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '40%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Email:</Text> dsdsdfsfd</Text>
                  </View>
                </Text>
              </View>

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Phone:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Position:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  


            </View> 


            <View style={[styles.messagesCard, styles.elevation]}>            
                <View style={{ flexDirection: 'row', padding:3, margin: 2, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>                    
                    <Text style={{ width: '50%' }}>
                    <View style={styles.dateRow}>
                        <Text style={styles.innerText}><Text style={styles.label_trick}>Name:</Text> abcxyz</Text>
                    </View>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '40%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Email:</Text> dsdsdfsfd</Text>
                  </View>
                </Text>
              </View>

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Phone:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Position:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  


            </View> 


            <View style={[styles.messagesCard, styles.elevation]}>            
                <View style={{ flexDirection: 'row', padding:3, margin: 2, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>                    
                    <Text style={{ width: '50%' }}>
                    <View style={styles.dateRow}>
                        <Text style={styles.innerText}><Text style={styles.label_trick}>Name:</Text> abcxyz</Text>
                    </View>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '40%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Email:</Text> dsdsdfsfd</Text>
                  </View>
                </Text>
              </View>

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Phone:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Position:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  


            </View> 

            <View style={[styles.messagesCard, styles.elevation]}>            
                <View style={{ flexDirection: 'row', padding:3, margin: 2, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>                    
                    <Text style={{ width: '50%' }}>
                    <View style={styles.dateRow}>
                        <Text style={styles.innerText}><Text style={styles.label_trick}>Name:</Text> abcxyz</Text>
                    </View>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '40%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Email:</Text> dsdsdfsfd</Text>
                  </View>
                </Text>
              </View>

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Phone:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  

              <View style={{ flexDirection: 'row', padding:3, margin: 1, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>
                <Text style={{ width: '80%' }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}><Text style={styles.label_trick}>Position:</Text> 34534534</Text>
                  </View>
                </Text>
              </View>  


            </View> 
            
    
          </ScrollView>


        </View>  
    )
}
export default StaffScreen;
const styles = StyleSheet.create
  ({
    container: {
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: '#271933',
      flexDirection: 'column'
    },
    messagesCard: {
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%',
        marginVertical: 2,
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {
          height: 0,
          width: 0
        },                            
  
      },

      dateRow: {
        borderWidth: 0,
        padding: 1
      },      
      innerText: {
        fontSize: 17,
        padding: 1,
      },
      label_trick:{
        fontWeight:'bold'
      },
      btnTouch:{
        backgroundColor:'#1BB467',      
        padding:8,            
        borderRadius:5, 
        flex:1,                 
        justifyContent:'space-around'
        
      },

      btnText:{
        fontSize:18,
        textAlign:'center' ,      
        color:'#fff',    
        padding:5,
        paddingBottom:5,      
            
      },
}); 