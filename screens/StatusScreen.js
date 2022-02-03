import React, { useEffect } from 'react';
import {
  StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableOpacity, ScrollView,
  Modal, Pressable, Platform, ActivityIndicator, KeyboardAvoidingView, LogBox,RefreshControl
} from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons'
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

LogBox.ignoreAllLogs();

const StatusScreen = (props) => {
  const [data, setData] = React.useState({
    reminderVisible: false,
    reminder_time: '',
    cslist: [],
    pslist: [],
    cslist_len: '',
    pslist_len: '',
    isLoading: true,
    screenLoader: false,
  });

  const handleEditStatus = () => {
    props.navigation.navigate('EditStatus')
  }

  const handlePreStatus = (id) => {
    props.navigation.navigate('EditPreStatusScreen', { statusID: id })
  }
  const handleQuickStatus = ()=> {
    try {
      const syncUserInfo = AsyncStorage.getItem("user_info")
        .then(syncResponse => {
          let parseObject = JSON.parse(syncResponse);
          var uid = parseObject.id;
          var user_token = parseObject.token;
          if (uid != null) {
            try {
              const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/quick-status.php", {
                uid, user_token,
              })
                .then(res => {
                  if (res.data.status == "OK") {
                    setData({
                      ...data,
                      cslist: res.data.csstatus,
                      cslist_len: res.data.csstatus_len,                    
                      isLoading: false,
                      screenLoader: true,
                    });


                  }
                  else {                    
                    alert(res.data.status)  
                    props.navigation.navigate('UnauthScreen');
                   
                  }
                })
            }
            catch (error) {
              console.log("Error while fetching quick status on status screen=" + error)
            }
          }

        });
    }
    catch (e) {
      console.log("Error while fetching quick status on status screen=" + e)
    }
    
  }

  function fetchStatus() {       

    try {
      const syncUserInfo = AsyncStorage.getItem("user_info")
        .then(syncResponse => {
          let parseObject = JSON.parse(syncResponse);
          var uid = parseObject.id;
          var user_token = parseObject.token;
          if (uid != null) {
            try {
              const signInRes = axios.post("https://iosapi.taraville.com/api/v1/users/fetch-status.php", {
                uid, user_token,
              })
                .then(res => {
                  if (res.data.status == "OK") {
                    setData({
                      ...data,
                      cslist: res.data.csstatus,
                      cslist_len: res.data.csstatus_len,
                      psstatus_len: res.data.psstatus_len,
                      pslist: res.data.psstatus,
                      isLoading: false,
                      screenLoader: true,
                    });


                  }
                  else {                    
                    alert(res.data.status)  
                    props.navigation.navigate('UnauthScreen');
                   
                  }
                })
            }
            catch (error) {
              console.log("Error while fetching status on status screen=" + error)
            }
          }

        });
    }
    catch (e) {
      console.log("Error while fetching status on status screen=" + e)
    }
  }


  useEffect(() => {
    const timer = setTimeout(() => fetchStatus(), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (data.isLoading) {
    return (
      <View style={styles.activity_container}>
        <ActivityIndicator animating={true} size="large" color="#fff" />
        <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', width: 110, height: 49 }} />                            
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor="#271933" barStyle="light-content" />     
      <View style={[styles.messagesCard, styles.elevation]}>

        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text style={{ color: '#3E2B2C', textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>
            Need to step away?
          </Text>
          <Text style={{ textAlign: 'center', color: '#3E2B2C', fontSize: 17 }}>We've got your back. </Text>

        </View>
      </View>
      <ScrollView style={{ marginTop: 1, flex: 1 }} refreshControl={<RefreshControl refreshing={!data.screenLoader} onRefresh={fetchStatus} tintColor={'#FFFFFF'} />}>

        <View style={[styles.messagesCard, styles.elevation]}>


          <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Today {data.cslist.fcdate ? (data.cslist.fcdate) : null}</Text>
          </View>

          {
            data.cslist_len > 0 ? (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.status_card}>Current Status</Text>
                  <TouchableOpacity onPress={() => handleEditStatus()}><Text><IonicIcon name={'pencil'} color={'green'} size={20} /></Text></TouchableOpacity>
                </View>
                <View style={{ borderTopWidth: 3, borderTopColor: 'green', width: '44%' }}><Text></Text></View>

                {data.cslist.label_one ? (
                  <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                    <Text style={styles.long_txt_lable}>{data.cslist.label_one}</Text>
                  </View>
                ) : (null)}
                {data.cslist.label_two ? (
                  <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                    {data.cslist.label_two == "Transfer calls to" ? (
                      <Text style={styles.long_txt}>{data.cslist.label_two} - {data.cslist.employee_name}</Text>
                    ) : (<Text style={styles.long_txt}>{data.cslist.label_two}</Text>)}
                  </View>
                ) : (null)}

                {data.cslist.other_info ? (
                  <View style={{ flexDirection: 'row', paddingTop: 12 }}>
                    <Text style={styles.long_txt}>{data.cslist.other_info}</Text>
                  </View>
                ) : (null)}

              </View>
            ) : (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.status_card}>Current Status</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.status_card_empty}>No status has been saved by you.</Text>
                </View>
              </View>

            )}


          {data.psstatus_len > 0 ? (
            <View>
              {
                data.pslist.map((records, index) => (
                  <View key={records.id}>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                      <Text style={styles.status_card}>Prescheduled</Text>
                      <TouchableOpacity onPress={() => handlePreStatus(records.id)}><Text><IonicIcon name={'pencil'} color={'green'} size={20} /></Text></TouchableOpacity>
                    </View>
                    <View style={{ borderTopWidth: 3, borderTopColor: 'green', width: '42%', }}><Text></Text></View>
                    <View>
                      <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                        <Text style={styles.long_txt}>{records.ps_fulltext}</Text>
                      </View>
                      {records.label_one ? (
                        <View style={{ flexDirection: 'row', paddingTop: 15, }}>
                          <Text style={styles.long_txt_lable}>{records.label_one}</Text>
                        </View>
                      ) : (null)}

                      {records.label_two ? (<View style={{ flexDirection: 'row', paddingTop: 5, flexGrow: 1, flex: 1, }}>

                        {records.label_two == 'Transfer calls to' ? (
                          <Text style={styles.long_txt}>Transfer calls to - {records.employee_name}</Text>) : (<Text style={styles.long_txt}>{records.label_two}</Text>)}
                      </View>) : (null)}

                      {records.other_info ? (
                        <View style={{ flexDirection: 'row', }}>
                          <Text style={styles.long_txt}>{records.other_info}</Text>
                        </View>
                      ) : (null)}

                    </View>
                  </View>

                ))
              }
            </View>
          ) : (
            null
          )}
        

        </View>              

      </ScrollView>
       
        <View style={styles.quick_status_loader}>
        <TouchableOpacity onPress={()=>handleQuickStatus()}>
          <Text style={{textAlign:'center',alignContent:'center'}}>
            <IonicIcon name={'sync'} size={50} color={'#008080'} />
          </Text>
          </TouchableOpacity>
        </View>  
      <BottomTabNavigationScreen navigation={props.navigation} route={props.route} />
    </KeyboardAvoidingView>
  )


}

export default StatusScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,    
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
  activity_container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#271933',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  messagesCard: {
    backgroundColor: '#f1f1f1',
    borderRadius: 2,
    width: '100%',
    marginVertical: 2,
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },
    padding: 15,    
    

  },
  btnTouch: {
    backgroundColor: '#1BB467',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'space-around'

  },

  btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    padding: 5,
    paddingBottom: 5,

  },
  status_card: {
    width: '90%',
    fontSize: 22,
    fontWeight: 'bold',

  },
  status_card_empty: {
    width: '100%',
    fontSize: 15,
    fontWeight: 'bold',
  },
  available_card: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  long_txt: {
    fontSize: 16,
    textAlign: 'justify',
  },
  long_txt_lable: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '50%'
  },
  input: {
    width: "95%",
    borderColor: '#271833',
    padding: 10,
    margin: 8,
    borderRadius: 5,
    fontSize: 18,
    borderWidth: 1
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#F1F1F1',
    flex: 1
  },
  modalView: {
    margin: 3,
    backgroundColor: "#f1f1f1",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    height: Platform.OS === 'ios' ? '60%' : '52%'

  },
  innerModalText:
  {
    color: 'black',
    fontSize: 18,
    paddingLeft: 5,
    paddingTop: 5
  },
  buttonClose: {
    backgroundColor: "#1BB467",
    padding: 7,
    borderRadius: 5,
    color: 'white'
  },
  reminderContainer: {
    marginTop: Platform.OS === 'ios' ? 130 : 40
  },
  buttonPopupClose: {
    backgroundColor: "red",
    padding: 16,
    borderRadius: 5,
    color: 'white'
  },
  blank_view: {
    marginTop: Platform.OS === 'ios' ? 55 : 30,
  },
  quick_status_loader:{
    flexDirection:'column',
    justifyContent:'center',
    minHeight:Platform.OS === 'ios' ? 180 : 230,
  }
});
