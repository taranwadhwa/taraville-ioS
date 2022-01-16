import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, SafeAreaView, Image, 
    TextInput, Platform, ActivityIndicator,ScrollView,RefreshControl } from 'react-native';
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
class FaqScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listing: [],
            isButtonLoader: false,
            screenLoader:false
        }


    }
    componentDidMount(){
        this.fetchFaq();
    }

    fetchFaq = () => {
        
        try {
            const syncUserInfo = AsyncStorage.getItem("user_info")
              .then(syncResponse => {
                let parseObject = JSON.parse(syncResponse);
                var uid = parseObject.id;
                var user_token = parseObject.token;
                if (uid != null) {
                  try {
                    const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/faq-listing.php", {
                      uid, user_token
                    })
                      .then(res => {
                        if(res.data.status=="OK"){                    
                          this.setState({
                            isButtonLoader: true,
                            listing: res.data.listing,
                            screenLoader:true
                          });                           
                        }
                        else{
                          this.setState({ isButtonLoader: true });                           
                        }                 
                      })
                  }
                  catch (error) {
                    console.log("Error while fetching messages on faq screen=" + error)
                  }
                }
      
              });
          }
          catch (e) {
            console.log("Error while fetching messages on faq screen=" + e)
          }

    }

    render() {
        const { isButtonLoader,listing } = this.state;
        if(isButtonLoader){
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#271933" barStyle="light-content" />                
                <ScrollView  style={{ marginTop: 1, margin: 1, flex: 1, height: '100%', }} refreshControl={<RefreshControl refreshing={!this.state.screenLoader} onRefresh={this.fetchFaq} />}>
                {listing.length>0?(                                      
                    <View style={[styles.messagesCard, styles.elevation]}>
                        {                            
                        listing.map((records, index) => (   
                         <View key={records.id}>       
                            <View style={{ flexDirection: 'row', padding:3, margin: 2, width: '100%',borderBottomWidth:1,borderBottomColor:'#C1C1C1' }}>                    
                                <Text style={{ width: '100%' }}>
                                    <View style={styles.dateRow}>
                                        <Text style={styles.innerText}>Q{index+1}. {records.question}:</Text>
                                    </View>
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', flexGrow: 1, flex: 1,padding:3,margin: 1 }}>                    
                                <Text style={styles.long_text}>
                                {records.answer}
                                </Text>
                            </View>
                            </View> 
                            ))
                        }
                     </View>
                ):(
                <View style={[styles.messagesEmptyCard, styles.elevation]}>
                    <Text style={{textAlign:'center',padding:5,fontSize:18}}>No record(s) found.</Text>
                    <Text style={{textAlign:'center',fontSize:11}}>(Pull down for refresh this screen.)</Text>                 
                </View> 
                )}    

              <View style={styles.blank_view}>
                <Text style={styles.input}></Text>
              </View>
   


                </ScrollView>                 
                
                <BottomTabNavigationScreen navigation={this.props.navigation} route={this.props.route} />
            </View>

        );
        }
        else{
            return (
            <View style={styles.activity_container}>
                <ActivityIndicator animating={true} size="large" color="#FFF" />
                <Text style={{ color: 'white', textAlign: 'center', alignItems: 'center' }}>Please wait... while we are fetching your records.</Text>
            </View>
            );
        }
    }
}
export default FaqScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: '#271933',
        flexDirection: 'column',

    },    
    activity_container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#271933',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    elevation: {
        elevation: 20,
        shadowColor: '#FFF',
    },

    logo: {
        marginTop: 20,
        backgroundColor: '#271933',
        borderRadius: 8,
        height: 65,
        margin: 7,

    },   
    btnTouch: {
        backgroundColor: '#1BB467',
        height: 45,
        padding: 10,
        width: '95%',
        margin: 10,
        borderRadius: 50,
    },
    btnText: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
        color: 'white',
    },
    messagesCard: {
        backgroundColor: '#f1f1f1',
        borderRadius: 2,
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
        fontWeight:'bold'
      },
      long_text: {
        padding: 2,
        lineHeight: 25,
        fontSize: 16,
        textAlign:'justify'
      },
      messagesEmptyCard:{
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%',
        height:'100%',
        marginVertical: 2,
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {
          height: 0,
          width: 0
        },
  
      },
      blank_view: {
        marginTop: Platform.OS === 'ios' ? 40 : 70
      },

});