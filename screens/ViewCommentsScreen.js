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
    ActivityIndicator,ScrollView,RefreshControl
}
    from 'react-native';
import axios from 'axios';
import IonicIcon from 'react-native-vector-icons/Ionicons'

const ViewCommentsScreen = ({ navigation }) => {

    const [data, setData] = React.useState({        
        screenLoader: false,
      })

      const handleAllComments=()=>{        
        setData({
            ...data,                        
            screenLoader:true
          });  
    }        
    
    useEffect(() => {
        handleAllComments();
     }, []);


    return (
        <View style={styles.container}>                    
          <StatusBar backgroundColor="#271933" barStyle="light-content" />
            <View style={styles.topHeader}>              
                <TouchableOpacity onPress={()=>navigation.navigate('Message')} style={{marginTop:15,paddingLeft:10}}><IonicIcon name={'arrow-back-outline'} color={'white'} size={25} /></TouchableOpacity>
                <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 4, width: 110, height: 49 }} />                            
            </View>          

          <View style={[styles.messagesCard, styles.elevation]}>
            <View style={{ flexDirection: 'column' }}>
               <Text style={styles.head_message}>Message</Text>                
                <Text style={styles.long_text}>
                 Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar
                 Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar
                 Lorem ipsum dolarLorem ipsum dolarLorem ipsum dolar
                </Text>
                <Text style={styles.innerSmallText}>Posted By: You</Text>                
                <Text style={styles.innerSmallText}>Date Posted: Jan,15,2021</Text>                
            </View>           
          </View> 


           <ScrollView style={{ marginTop: 1, margin: 1, flex: 1, height: '100%', }} refreshControl={<RefreshControl refreshing={!data.screenLoader} onRefresh={handleAllComments} />}>                          
            <View style={[styles.messagesCard, styles.elevation]}>
            <Text style={styles.head_message}>Comments (4)</Text> 
              <View style={{ flexDirection: 'column' }}>              
                <Text style={styles.long_text_comments}>
                Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar
                 Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar
                 Lorem ipsum dolarLorem ipsum dolarLorem ipsum dolar
                </Text>   
                <Text style={styles.innerSmallText}>Posted By: You</Text>                
                <Text style={styles.innerSmallText}>Date Posted: Jan 15,2021</Text> 
              </View>
                <View style={{marginTop:2,borderBottomWidth:1,borderBottomColor:'#CCCCCC'}}><Text></Text></View>

              <View style={{ flexDirection: 'column' }}>                
                <Text style={styles.long_text_comments}>
                Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar
                 Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar
                 Lorem ipsum dolarLorem ipsum dolarLorem ipsum dolar
                </Text>   
                <Text style={styles.innerSmallText}>Posted By: You</Text>                
                <Text style={styles.innerSmallText}>Date Posted: Jan 15,2021</Text> 
              </View>
              <View style={{marginTop:2,borderBottomWidth:1,borderBottomColor:'#CCCCCC'}}><Text></Text></View>
              
              <View style={{ flexDirection: 'column' }}>                
                <Text style={styles.long_text_comments}>
                Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar
                 Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar
                 Lorem ipsum dolarLorem ipsum dolarLorem ipsum dolar
                </Text>   
                <Text style={styles.innerSmallText}>Posted By: You</Text>                
                <Text style={styles.innerSmallText}>Date Posted: Jan 15,2021</Text> 
              </View>
              <View style={{marginTop:2,borderBottomWidth:1,borderBottomColor:'#CCCCCC'}}><Text></Text></View>
              
              <View style={{ flexDirection: 'column' }}>                
                <Text style={styles.long_text_comments}>
                Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar
                 Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar
                 Lorem ipsum dolarLorem ipsum dolarLorem ipsum dolar
                </Text>   
                <Text style={styles.innerSmallText}>Posted By: You</Text>                
                <Text style={styles.innerSmallText}>Date Posted: Jan 15,2021</Text> 
              </View>

            </View>
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
