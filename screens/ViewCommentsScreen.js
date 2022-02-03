import React,{ useEffect }  from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    Keyboard,
    ActivityIndicator,ScrollView,RefreshControl,Platform
}
    from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';    
import axios from 'axios';
import IonicIcon from 'react-native-vector-icons/Ionicons'

const ViewCommentsScreen = ({ navigation,route }) => {

    const [data, setData] = React.useState({        
        screenLoader: false,
        listing: [],
        original_message:'',
        original_dp:'',
        total_comments:'',
        IsLoading:true

      })

      const handleAllComments=(messageID)=>{     
        if(messageID)
        {
          try {
            const syncUserInfo = AsyncStorage.getItem("user_info")
              .then(syncResponse => {
                let parseObject = JSON.parse(syncResponse);
                var uid = parseObject.id;
                var user_token = parseObject.token;
                if (uid != null) {
                  try {
                    const signInRes = axios.post("https://iosapi.taraville.com/api/v1/messages/comments.php", {
                      uid, user_token,messageID
                    })
                      .then(res => {
                        if (res.data.status == "OK") {
                          setData({...data,screenLoader: true,
                          listing: res.data.comment_listing,
                          original_message:res.data.org_message.call_notes,
                          original_dp:res.data.org_message.date_submitted, 
                          total_comments:res.data.numComments,
                          IsLoading:false
                          });  

                         
                        }
                        else {
                          this.setState({ screenLoader: true,IsLoading:false });
                        }
                      })
                  }
                  catch (error) {
                    console.log("Error while fetching comments on comments screen=" + error)
                  }
                }
      
              });
          }
          catch (e) {
            console.log("Error while fetching comments on comment screen=" + e)
          }


        }
       
    }        
    
    useEffect(() => {      
        handleAllComments(route.params.messageID);
     }, []);


     if (data.IsLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating={true} size="large" color="#000" />
          <Text style={{ color: 'black', textAlign: 'center', alignItems: 'center' }}>Please wait... while we are fetching data.</Text>
        </View>
      )
    }

    return (
        <View style={styles.container}>                    
          <StatusBar backgroundColor="#271933" barStyle="light-content" />
            <View style={styles.topHeader}>              
                <TouchableOpacity onPress={()=>navigation.navigate('Message')} style={{marginTop:15,paddingLeft:10}}><IonicIcon name={'arrow-back-outline'} color={'white'} size={25} /></TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Status')}><Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 4, width: 110, height: 49 }} /></TouchableOpacity>                            
            </View>          

          <View style={[styles.messagesCard, styles.elevation]}>
            <View style={{ flexDirection: 'column' }}>
               <Text style={styles.head_message}>Message</Text>                
                <Text style={styles.long_text}>
                  {data.original_message}
                </Text>
                             
                <Text style={styles.innerSmallText}>Date Posted: {data.original_dp}</Text>                
            </View>           
          </View> 


           <ScrollView style={{ marginTop: 1, margin: 1, flex: 1, height: '100%', }} refreshControl={<RefreshControl refreshing={!data.screenLoader} onRefresh={handleAllComments} />}>                          
           {data.listing.length > 0 ? (
            <View  style={[styles.messagesCard, styles.elevation]}>
            <Text style={styles.head_message}>Comments ({data.total_comments})</Text> 
                { 
              data.listing.map((records, index) => (           
              <View key={records.id}>  
              <View style={{ flexDirection: 'column' }}>              
                <Text style={styles.long_text_comments}>
                 {records.comments}
                </Text>                               
                <Text style={styles.innerSmallText}>Posted by: {records.uname}</Text> 
                <Text style={styles.innerSmallText}>Date posted: {records.date_added_comments}</Text> 
              </View>
              <View style={{marginTop:2,borderBottomWidth:1,borderBottomColor:'#CCCCCC'}}><Text></Text></View>                                                    
              </View>
               ))
              }  
                           
            </View>
           ):(null)
           }
           </ScrollView> 
        </View>
    )

   

}

export default ViewCommentsScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#271933',
        flexDirection: 'column'
    },
    logo: {
        marginTop: 20,
        backgroundColor: '#271933',
        borderRadius: 8,
        height: 65,
        margin: 7,
      },
      header_txt: {
        color: '#FFF',
        fontSize: 22,
        marginTop: Platform.OS === 'ios' ? 2 : 10,
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
      },
      topHeader: {
        flexDirection:'row',
        margin: 1,
        borderRadius: 1,
        backgroundColor: '#1BB467',        
        height: Platform.OS === 'ios' ? 60 : 60,
        borderColor: '#1BB467',
        top:5,
        borderWidth:1,        
        alignContent:'flex-start'
      },
    
      messagesCard: {
        backgroundColor: '#f1f1f1',
        borderRadius: 2,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%',
        marginVertical: 3,
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {
          height: 0,
          width: 0
        },
        margin: 1
      },
      long_text: {
        padding: 2,
        lineHeight: 28,
        fontSize: 16,
        textAlign: 'justify'
      },
      long_text_comments: {
        padding: 2,
        lineHeight: 30,
        fontSize: 14,
        textAlign: 'justify'
      },
      head_message:{
        color:'#000000',
        fontSize: 22,        
        paddingTop: 5
      },
      innerSmallText:{
        color:'#000000',
        fontSize: 16,
        padding:4,              
        fontWeight:'bold'
      },
  
});
