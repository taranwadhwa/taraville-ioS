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
                <Text style={styles.header_txt}>Comments</Text>
            </View>
          <View style={styles.logo}>
            <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 10, width: 170, height: 55 }} />
          </View> 

          <View style={[styles.messagesCard, styles.elevation]}>
            <View style={{ flexDirection: 'column' }}>
               <Text style={styles.head_message}>Message</Text>                
                <Text style={styles.long_text}>
                 Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar
                 Lorem ipsum dolar Lorem ipsum dolar Lorem ipsum dolar
                 Lorem ipsum dolarLorem ipsum dolarLorem ipsum dolar
                </Text>
                <Text style={{borderBottomWidth: 1, borderBottomColor: '#C1C1C1'}}></Text>
            </View>           
          </View> 


           <ScrollView style={{ marginTop: 1, margin: 1, flex: 1, height: '100%', }} refreshControl={<RefreshControl refreshing={!data.screenLoader} onRefresh={handleAllComments} />}>                          
             
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
        flexDirection: 'row',
        margin: 1,
        borderRadius: 1,
        backgroundColor: '#1BB467',
        height: Platform.OS === 'ios' ? 50 : 60,
        borderColor: '#1BB467',
        justifyContent: 'center'
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
      head_message:{
        color:'#000000',
        fontSize: 22,        
        paddingTop: 5
      }
  
});
