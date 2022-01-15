import React from 'react';
import {
  StyleSheet, Text, View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Modal,
  Pressable,
  Platform,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback, Keyboard, LogBox, RefreshControl,Linking
} from 'react-native';
import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

LogBox.ignoreAllLogs();

class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dobText: '',
      dobDate: null,
      modalVisible: false,
      callModalVisible: false,
      notesModalVisible: false,
      reminderVisible: false,
      notes: '',
      listing: [],
      screenLoader: false,
      private_code: '',
      message_id: '',
      reminder_time: '',
      notes_input: '',
      call_request: '',
      call_input: '',
      search_txt: '',
      isCallButtonLoading: false,
      isCommentButtonLoading: false,
      isReminderButtonLoading: false,

    }
    //this.searchMessages = this.searchMessages.bind(this);
    this.selectedIndex = this.selectedIndex.bind(this);
    this.unlockMessage = this.unlockMessage.bind(this);
    this.refreshScreen = this.refreshScreen.bind(this);
  }

  componentDidMount() {
    this.handleListing();
  }
  handleListing = () => {

    try {
      const syncUserInfo = AsyncStorage.getItem("user_info")
        .then(syncResponse => {
          let parseObject = JSON.parse(syncResponse);
          var uid = parseObject.id;
          var user_token = parseObject.token;
          if (uid != null) {
            try {
              const signInRes = axios.post("https://iosapi.taraville.com/api/v1/messages/listing.php", {
                uid, user_token
              })
                .then(res => {
                  if (res.data.status == "OK") {
                    this.setState({
                      screenLoader: true,
                      listing: res.data.listing,
                      screenLoader: true
                    });
                  }
                  else {
                    this.setState({ screenLoader: true });
                  }
                })
            }
            catch (error) {
              console.log("Error while fetching messages on message screen=" + error)
            }
          }

        });
    }
    catch (e) {
      console.log("Error while fetching messages on message screen=" + e)
    }

  }

  handleSearch = async () => {
    Keyboard.dismiss();
    const { search_txt } = this.state;
    if (search_txt) {
      try {
        const syncUserInfo = AsyncStorage.getItem("user_info")
          .then(syncResponse => {
            let parseObject = JSON.parse(syncResponse);
            var uid = parseObject.id;
            var user_token = parseObject.token;
            if (uid != null) {
              try {
                const searchRes = axios.post("https://iosapi.taraville.com/api/v1/messages/search.php", {
                  uid, user_token, search_txt
                })
                  .then(res => {
                    if (res.data.status == "OK") {
                      this.setState({
                        listing: res.data.listing
                      });
                    }
                    else {
                      alert("No record(s) found")
                    }
                  })
              }
              catch (error) {
                console.log("Error while search fetching messages on message screen=" + error)
              }
            }

          });
      }
      catch (e) {
        console.log("Error while search fetching messages on message screen=" + e)
      }


    }

  }
  setModalVisible = (message_id, visible) => {

    this.setState({ modalVisible: visible, message_id: message_id })
    this.setState({ notesModalVisible: false })
    this.setState({ callModalVisible: false })
    this.setState({ reminderVisible: false })
  }


  setCallModalVisible = (message_id, visible) => {
    this.setState({ callModalVisible: visible, message_id: message_id })
    this.setState({ modalVisible: false })
    this.setState({ notesModalVisible: false })
    this.setState({ reminderVisible: false })
  }

  setNotesModalVisible = (message_id, visible) => {
    this.setState({ notesModalVisible: visible, message_id: message_id })
    this.setState({ modalVisible: false })
    this.setState({ callModalVisible: false })
    this.setState({ reminderVisible: false })
  }
  setReminderVisible = (message_id, visible) => {
    this.setState({ reminderVisible: visible, message_id: message_id })
    this.setState({ notesModalVisible: false })
    this.setState({ modalVisible: false })
    this.setState({ callModalVisible: false })

  }

  archiveSelectedMessage(messageID) {
    if (messageID) {

      // START //
      try {
        const syncUserInfo = AsyncStorage.getItem("user_info")
          .then(syncResponse => {
            let parseObject = JSON.parse(syncResponse);
            var uid = parseObject.id;
            var user_token = parseObject.token;
            if (uid != null) {
              try {
                const searchRes = axios.post("https://iosapi.taraville.com/api/v1/messages/archive.php", {
                  uid, user_token, messageID
                })
                  .then(res => {
                    if (res.data.status == "OK") {

                      this.setState({
                        listing: res.data.listing,
                      });


                    }
                    else {
                      alert("No record(s) found")
                    }

                  })
              }
              catch (error) {
                console.log("Error while search fetching messages on message screen=" + error)
              }
            }

          });
      }
      catch (e) {
        console.log("Error while search fetching messages on message screen=" + e)
      }

      // ENDS //
    }

  }

  archiveMessage(messageID) {
    Alert.alert(
      "Archive Message",
      "Are you sure you want to archive this message",
      [
        {
          text: "No",
          style: "cancel"
        },
        { text: "YES", onPress: () => this.archiveSelectedMessage(messageID) }
      ]
    );

  }

  unlockMessage() {

    const { message_id, private_code } = this.state;
    if (private_code) {
      try {
        const syncUserInfo = AsyncStorage.getItem("user_info")
          .then(syncResponse => {
            let parseObject = JSON.parse(syncResponse);
            var uid = parseObject.id;
            var user_token = parseObject.token;
            if (uid != null) {
              try {
                const signInRes = axios.post("https://iosapi.taraville.com/api/v1/messages/verify-code.php", {
                  uid, user_token, message_id, private_code
                })
                  .then(res => {
                    if (res.data.status == "OK") {
                      alert("Your code has been successfully verified.");
                      this.setState({ screenLoader: false })
                      this.setModalVisible(message_id, false);
                      this.handleListing();
                    }
                    else {
                      alert("Sorry, this code is invalid.")
                    }

                  })
              }
              catch (error) {
                console.log("Error while fetching messages on message screen=" + error)
              }
            }

          });
      }
      catch (e) {
        console.log("Error while fetching messages on message screen=" + e)
      }
    }
    else {
      alert("Please enter 6 digit code to unlock this message.")
    }


  }
  saveNotes() {
    this.setState({ isCommentButtonLoading: true });
    const { message_id, notes } = this.state;
    if (notes) {
      try {
        const syncUserInfo = AsyncStorage.getItem("user_info").then(syncResponse => {
          let parseObject = JSON.parse(syncResponse);
          var uid = parseObject.id;
          var user_token = parseObject.token;
          if (uid != null) {
            try {
              const signInRes = axios.post("https://iosapi.taraville.com/api/v1/messages/save-notes.php", {
                uid, user_token, message_id, notes
              })
                .then(res => {
                  if (res.data.status == "OK") {
                    alert("Entered notes has been successfully saved for this message.");
                    this.setNotesModalVisible(message_id, false);
                    this.handleListing();
                  }
                  else {
                    alert(res.data.status)
                  }
                  this.setState({ notes_input: '', isCommentButtonLoading: false });

                })
            }
            catch (error) {
              console.log("Error while sending notes request on message screen=" + error)
            }


          }


        })

      }
      catch (error) {
        console.log("Error while getting asyncstorage on save notes request message screen=" + error);
      }
    }
    else {
      alert("Please enter your comments.");
      this.setState({ isCommentButtonLoading: false });
    }
  }


  handleCallRequest() {
    this.setState({ isCallButtonLoading: true });
    const { message_id, call_request } = this.state;
    if (call_request) {
      try {
        const syncUserInfo = AsyncStorage.getItem("user_info").then(syncResponse => {
          let parseObject = JSON.parse(syncResponse);
          var uid = parseObject.id;
          var user_token = parseObject.token;
          if (uid != null) {
            try {
              const signInRes = axios.post("https://iosapi.taraville.com/api/v1/messages/save-call-request.php", {
                uid, user_token, message_id, call_request
              })
                .then(res => {
                  if (res.data.status == "OK") {
                    alert("Call request for this message has been successfully placed.");
                    this.setModalVisible(message_id, false);
                    this.handleListing();
                  }
                  else {
                    alert(res.data.status)
                  }
                  this.setState({ call_input: '', isCallButtonLoading: false });

                })
            }
            catch (error) {
              console.log("Error while sending call request on message screen=" + error)
            }


          }


        })

      }
      catch (error) {
        console.log("Error while getting asyncstorage on call request message screen=" + error);
      }

    }
    else {
      alert("Please enter your call request.")
      this.setState({ isCallButtonLoading: false });
    }

  }

  selectedIndex(index) {
    this.setState({ reminder_time: index })
  }
  refreshScreen() {
    this.props.navigation.replace('Message')
  }
  handleReminder() {
    this.setState({ isReminderButtonLoading: true });
    const { reminder_time, message_id } = this.state;
    if (reminder_time) {
      try {
        const syncUserInfo = AsyncStorage.getItem("user_info").then(syncResponse => {
          let parseObject = JSON.parse(syncResponse);
          var uid = parseObject.id;
          var user_token = parseObject.token;
          if (uid != null) {
            try {
              const signInRes = axios.post("https://iosapi.taraville.com/api/v1/messages/save-reminder.php", {
                uid, user_token, message_id, reminder_time
              })
                .then(res => {
                  if (res.data.status == "OK") {
                    alert("Reminder for this message has been successfully set.");
                  }
                  else {
                    alert(res.data.status)
                  }
                  this.setState({ isReminderButtonLoading: false });

                })
            }
            catch (error) {
              console.log("Error while sending reminder request on message screen=" + error)
            }


          }

        })

      }
      catch (error) {
        console.log("Error while getting asyncstorage on reminder request message screen=" + error);
      }

    }
    else {
      alert("Please select reminder time for this message.")
      this.setState({ isReminderButtonLoading: false });
    }
  }

  render() {
    const { modalVisible, callModalVisible, notesModalVisible, reminderVisible, screenLoader, listing } = this.state;
    if (screenLoader) {
      return (
        <View style={styles.container}>

          <StatusBar backgroundColor="#271933" barStyle="light-content" />
          <View style={styles.topHeader}>
            <Text style={styles.header_txt}>Message</Text>
          </View>

          <View style={styles.logo}>
            <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 10, width: 170, height: 55 }} />
          </View>

          <View style={[styles.messagesCard, styles.elevation]}>
            <View style={{ flexDirection: 'row' }}>
              <TextInput style={styles.input} placeholder="Search with customer name or phone#:" onChangeText={(sval) => this.setState({ search_txt: sval })} />
              <Text>
                <TouchableOpacity onPress={this.handleSearch}>
                  <IonicIcon name={'search'} color={'black'} size={25} style={{ paddingTop: 18 }} />

                </TouchableOpacity>
              </Text>
              <Text>
                <TouchableOpacity onPress={this.refreshScreen}>
                  <IonicIcon name={'refresh'} color={'black'} size={25} style={{ paddingTop: 18, paddingLeft: 8 }} />
                </TouchableOpacity>
              </Text>
            </View>
          </View>

          <View style={styles.tabMessagesCard}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Message')} style={{ textAlign: 'center', width: '50%', padding: 13, fontSize: 16, backgroundColor: '#1BB467', borderRadius: 5, color: '#FFFFFF' }}>
              <Text style={{ color: '#FFFFFF' }}>
                <IonicIcon name={'notifications'} color={'white'} size={15} /> New Messages </Text>
            </TouchableOpacity>
            <Text style={{ width: '1%' }}></Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Archive')} style={{ textAlign: 'center', width: '50%', padding: 13, fontSize: 16, backgroundColor: '#D3D3D3', borderRadius: 5, color: '#A9A9A9' }}>
              <Text style={{ color: '#A9A9A9' }}>
                <IonicIcon name={'archive'} color={'#A9A9A9'} size={15} /> Archived Messages</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ marginTop: 1, margin: 1, flex: 1, height: '100%', }} refreshControl={<RefreshControl refreshing={!screenLoader} onRefresh={this.handleListing} />}>

            {listing.length > 0 ? (
              <View style={[styles.messagesCard, styles.elevation]}>
                {
                  listing.map((records, index) => (
                    <View key={records.id}>
                      <View style={{ flexDirection: 'row', padding: 3, margin: 2, width: '100%', borderBottomWidth: 1, borderBottomColor: '#C1C1C1' }}>
                        <Text style={{ width: '50%' }}>
                          <View style={styles.dateRow}>
                            <Text style={styles.innerText}><Text style={styles.label_trick}>Date:</Text> {records.fdate_added}</Text>
                          </View>
                        </Text>

                        <TouchableOpacity onPress={() => this.setCallModalVisible(records.id, true)}>
                          <Text style={{ width: '100%', borderWidth: 0, paddingRight: 10 }}>
                            <View style={styles.dateRow}>
                              <Text style={styles.innerText}>
                              <IonicIcon name={'call-outline'} color={'black'} size={20} /></Text>
                            </View>
                          </Text>
                        </TouchableOpacity>
                        {records.message_type == 'Yes' ? (
                          <TouchableOpacity onPress={() => this.setModalVisible(records.id, true)}>
                            <Text style={{ width: '100%', borderWidth: 0, paddingRight: 10 }}>
                              <View style={styles.dateRow}>
                                <Text style={styles.innerText}>
                                  <IonicIcon name={'lock-closed'} color={'#6E2E35'} size={20} /></Text>
                              </View>
                            </Text>
                          </TouchableOpacity>)
                          : (null)
                        }

                        <TouchableOpacity onPress={() => this.setNotesModalVisible(records.id, true)}>
                          <Text style={{ width: '100%', borderWidth: 0, paddingRight: 10 }}>
                            <View style={styles.dateRow}>
                              <Text style={styles.innerText}>
                                <IonicIcon name={'document-text-outline'} color={'black'} size={20} /></Text>
                            </View>
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.archiveMessage(records.id)}>
                          <Text style={{ width: '100%', borderWidth: 0, paddingRight: 10 }}>
                            <View style={styles.dateRow}>
                              <Text style={styles.innerText}>
                                <IonicIcon name={'archive-outline'} color={'black'} size={20} /></Text>
                            </View>
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.setReminderVisible(records.id, true)}>
                          <Text style={{ width: '100%', borderWidth: 0, paddingRight: 10 }}>
                            <View style={styles.dateRow}>
                              <Text style={styles.innerText}>
                                <IonicIcon name={'ios-notifications'} color={'#B33F40'} size={20} />
                              </Text>
                            </View>
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ flexDirection: 'row', padding: 3, margin: 1, width: '100%', borderBottomWidth: 1, borderBottomColor: '#C1C1C1' }}>
                        <Text style={{ width: '40%' }}>
                          <View style={styles.dateRow}>
                            <Text style={styles.innerText}><Text style={styles.label_trick}>Time:</Text> {records.log_time}</Text>
                          </View>
                        </Text>
                      </View>

                      <View style={{ flexDirection: 'row', padding: 3, margin: 1, width: '100%', borderBottomWidth: 1, borderBottomColor: '#C1C1C1' }}>
                        <Text style={{ width: '80%' }}>
                          <View style={styles.dateRow}>
                            <Text style={styles.innerText}><Text style={styles.label_trick}>Customer name:</Text> {records.name}</Text>
                          </View>
                        </Text>
                      </View>

                      <View style={{ flexDirection: 'row', padding: 3, margin: 1, width: '100%', borderBottomWidth: 1, borderBottomColor: '#C1C1C1' }}>
                        <Text style={{ width: '70%' }}>
                          <View style={styles.dateRow}>
                            <Text style={styles.innerText}><Text style={styles.label_trick}>Phone #:</Text> {records.phone}</Text>
                          </View>
                        </Text>
                      </View>


                      {records.message_type == 'Yes' ? (
                        <View style={{ flexDirection: 'row', flexGrow: 1, flex: 1, padding: 3, margin: 1 }}>
                          <Text style={styles.long_text}>
                            This message is private. Please unlock it by entering 6 digit code.
                          </Text>
                        </View>
                      ) : (

                        <View style={{ flexDirection: 'row', flexGrow: 1, flex: 1, padding: 3, margin: 1 }}>
                          <Text style={styles.long_text}>
                            {records.call_notes}
                          </Text>

                        </View>)
                      }

                      {
                        records.numberOfComments > 0 ? (
                          <View style={{ flexDirection: 'row', justifyContent:'space-between',marginTop:5 }}>
                            <Text style={{ paddingLeft: 3, fontSize: 14,textAlignVertical:'center' }}>
                              {records.numberOfComments} Comment(s).
                            </Text>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ViewCommentsScreen')}>
                              <Text style={{ textAlign: 'right', borderRadius:5, alignItems: 'flex-end', backgroundColor:'#F14646',padding: 5, color: '#FFFFFF',fontSize:10}}>
                                <IonicIcon name={'eye'} color={'#FFFFFF'} size={12} /> View All Comments 
                            </Text>
                          </TouchableOpacity>
                          </View>)
                          : (null)
                      }
                      <View style={{ flexDirection: 'row', justifyContent:'space-between', marginTop:10}}>
                        {records.message_call_status?(
                        <Text style={{ textAlign: 'left', alignContent:'flex-start',alignItems:'flex-start', backgroundColor:'#58181F',  padding: 8, color:'#FFFFFF',borderRadius:5  }}>
                          {records.message_call_status}
                        </Text>
                        ):(
                          <Text style={{ textAlign: 'left', alignContent:'flex-start',alignItems:'flex-start', padding: 8, color:'#FFFFFF',borderRadius:5  }}>                          
                          </Text>

                        )}
                        <Text style={{ textAlign: 'right', borderRadius:5, alignItems: 'flex-end', backgroundColor: '#' + records.color_code, padding: 8, color: '#' + records.font_color_code }}>
                          {records.action_taken}
                        </Text>
                      </View>

                      <View style={{ borderBottomWidth: 1, borderBottomColor: '#C1C1C1', marginBottom: 6, marginTop: 6 }}><Text></Text></View>
                    </View>
                  ))
                }

              </View>
            ) : (
              <View style={[styles.messagesEmptyCard, styles.elevation]}>
                <Text style={{ textAlign: 'center', padding: 8, fontSize: 18 }}>No message(s) found.</Text>
                <Text style={{ textAlign: 'center', fontSize: 11 }}>(Pull down for refresh this screen.)</Text>
              </View>

            )
            }

            <View style={styles.blank_view}>
              <Text style={styles.input}></Text>
            </View>

          </ScrollView>



          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onClickOutside={this.onClickOutside}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.innerModalText}>Please enter 6 digit code to unlock this message.</Text>
                <TextInput style={styles.modalInput} onChangeText={(private_code) => this.setState({ private_code: private_code })} placeholder="Enter code:" />


                <View>
                  <TouchableOpacity onPress={() => this.unlockMessage()} style={styles.buttonClose}>
                    <Text style={{ color: 'white', padding: 5, alignSelf: 'center', textAlign: 'center', fontSize: 16 }}>Submit</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'flex-end', marginTop: 15 }}>
                  <Pressable
                    style={styles.buttonPopupClose}
                    onPress={() => this.setModalVisible('', !modalVisible)}
                  >
                    <Text style={{ color: 'white', padding: 5 }}>CLOSE</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={callModalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.innerModalText}>CALL REQUEST <IonicIcon name={'call-outline'} color={'black'} size={20} /></Text>
                <Text style={styles.innerSmallText}>Type your outbound call request here, our staff will assist you quickly.</Text>
                <TextInput value={this.state.call_input} onChangeText={(val) => this.setState({ call_request: val, call_input: val })} style={styles.modalInput} numberOfLines={8} multiline={true} />
                <View>
                  <TouchableOpacity onPress={() => this.handleCallRequest()} style={styles.buttonClose}>
                    {this.state.isCallButtonLoading ? (<ActivityIndicator animating={this.state.isCallButtonLoading} size="large" color="white" />)
                      : (
                        <Text style={{ color: 'white', padding: 5, alignSelf: 'center', textAlign: 'center', fontSize: 16 }}>SUBMIT REQUEST</Text>
                      )}
                  </TouchableOpacity>
                </View>
                
                  <TouchableOpacity style={styles.buttonPopupClose} onPress={() => this.setCallModalVisible('', !callModalVisible)}>
                    <View>
                      <Text style={{ color: 'white', padding: 3,textAlign:'center',alignContent:'center' }}>CLOSE</Text>
                    </View>                 
                  </TouchableOpacity>
               
              </View>
            </View>
          </Modal>


          <Modal
            animationType="fade"
            transparent={true}
            visible={notesModalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.innerModalText}>Comments <IonicIcon name={'document-text-outline'} color={'black'} size={20} /></Text>
                <Text style={styles.innerSmallText}>Please enter your comments.</Text>
                <TextInput value={this.state.notes_input} onChangeText={(notes) => this.setState({ notes: notes, notes_input: notes })} style={styles.modalInput} multiline={true} numberOfLines={8} />
                <View>
                  <TouchableOpacity style={styles.buttonClose} onPress={() => this.saveNotes()}>
                    {this.state.isCommentButtonLoading ? (<ActivityIndicator animating={this.state.isCommentButtonLoading} size="large" color="white" />)
                      : (

                        <Text style={{ color: 'white', padding: 5, alignSelf: 'center', textAlign: 'center', fontSize: 16 }}>SAVE</Text>
                      )}
                  </TouchableOpacity>
                </View>
               
                  <TouchableOpacity style={styles.buttonPopupClose} onPress={() => this.setNotesModalVisible('', !notesModalVisible)}>
                     <View>
                       <Text style={{ color: 'white', padding: 3,textAlign:'center',alignContent:'center' }}>CLOSE</Text>
                      </View>
                  </TouchableOpacity>
                
              </View>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={reminderVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.innerModalText}>Set Reminder <IonicIcon name={'ios-notifications'} color={'black'} size={15} /> {this.state.reminder_time}</Text>
                <Text style={styles.innerSmallText}>Please set reminder for this message and you will get the notification.</Text>
                <View style={{ borderWidth: 1, borderColor: '#C1C1C1', width: "100%", marginTop: 10 }}>
                  <Picker
                    mode='dropdown'
                    selectedValue={this.state.reminder_time}
                    style={{ height: 50, width: '100%', padding: 6, borderWidth: 1, borderColor: '#C1C1C1', }}
                    value={this.state.reminder_time}
                    onValueChange={(itemValue, itemIndex) => this.selectedIndex(itemValue)}
                  >
                    <Picker.Item label="Select" value="" />
                    <Picker.Item label="15 min." value="15 min." />
                    <Picker.Item label="30 min." value="30 min." />
                    <Picker.Item label="1 hour" value="1 hour" />
                    <Picker.Item label="4 hours" value="4 hours" />
                    <Picker.Item label="24 hours" value="24 hours" />
                    <Picker.Item label="7 days" value="7 days" />
                    <Picker.Item label="30 days" value="30 days" />
                  </Picker>
                </View>
                <View style={styles.reminderContainer}>
                  <TouchableOpacity onPress={() => this.handleReminder()} style={styles.buttonClose}>

                    {this.state.isReminderButtonLoading ? (<ActivityIndicator animating={this.state.isReminderButtonLoading} size="large" color="white" />)
                      : (
                        <Text style={{ color: 'white', padding: 5, alignSelf: 'center', textAlign: 'center', fontSize: 16 }}>SUBMIT</Text>
                      )}
                  </TouchableOpacity>
                </View>
                
                  <TouchableOpacity style={styles.buttonPopupClose} onPress={() => this.setReminderVisible('', !reminderVisible)}>
                    <View>
                    <Text style={{ color: 'white', padding: 3,textAlign:'center',alignContent:'center' }}>CLOSE</Text>
                    </View>                   
                  </TouchableOpacity>
               
              </View>
            </View>
          </Modal>
          <BottomTabNavigationScreen navigation={this.props.navigation} route={this.props.route} />
        </View>
      )
    }
    else {
      return (
        <View style={styles.activity_container}>
          <ActivityIndicator animating={true} size="large" color="#FFF" />
          <Text style={{ color: 'white', textAlign: 'center', alignItems: 'center' }}>Please wait... while we are fetching your messages.</Text>
        </View>
      )
    }
  }
}
export default MessageScreen;
const styles = StyleSheet.create
  ({
    container: {
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: '#271933',
      flexDirection: 'column'
    },
    activity_container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#271933',
      flexDirection: 'column',
      justifyContent: 'center',
    },

    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#F1F1F1',
      flex: 1,      

    },
    dropdown: {
      width: '80%',
    },

    innerModalText:
    {
      color: 'black',
      fontSize: 20,
      paddingLeft: 8,
      paddingTop: 5
    },
    innerSmallText:{
      color:'#C1C1C1',
      fontSize: 14,
      paddingLeft: 8,
      paddingTop: 5
    },
    input: {
      width: "78%",
      borderColor: '#271833',
      padding: 7,
      margin: 8,
      borderRadius: 5,
      fontSize: 16,
      borderWidth: 1
    },
    modalInput: {
      width: "98%",
      borderColor: '#C1C1C1',
      padding: 7,
      margin: 4,
      marginBottom: 5,
      borderRadius: 5,
      fontSize: 18,
      borderWidth: 1,
      textAlignVertical:'top',
      
    },
    buttonClose: {
      backgroundColor: "#1BB467",
      padding: 7,
      borderRadius: 5,
      color: 'white'
    },
    buttonPopupClose: {
      marginTop:10,
      backgroundColor: "#F14646",
      padding: 7,
      borderRadius: 3,
      color: 'white'
    },
    logo: {
      marginTop: 20,
      backgroundColor: '#271933',
      borderRadius: 8,
      height: 65,
      margin: 7,
    },
    calendarCard: {
      backgroundColor: 'white',
      borderRadius: 8,
      paddingVertical: 15,
      paddingHorizontal: 15,
      width: '100%',
      marginVertical: 5,
      flexDirection: 'row'
    },
    elevation: {
      elevation: 20,
      shadowColor: '#FFF',
    },
    heading: {
      backgroundColor: 'white',
      width: '100%',
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'left'
    },
    messagesCard: {
      backgroundColor: '#f1f1f1',
      borderRadius: 5,
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
    tabMessagesCard: {
      flexDirection: 'row',
      backgroundColor: '#f1f1f1',
      borderRadius: 5,
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
    messagesEmptyCard: {
      backgroundColor: '#f1f1f1',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 10,
      width: '100%',
      height: '60%',
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
    dateColumn: {
      width: '50%',

    },
    innerText: {
      fontSize: 17,
      padding: 1,
    },
    btnTouch: {
      backgroundColor: '#1BB467',
      width: '35%',
      padding: 1,
      borderRadius: 5,
      color: 'white',
      borderWidth: 0,
      alignSelf: 'flex-end'

    },
    long_text: {
      padding: 2,
      lineHeight: 25,
      fontSize: 16,
      textAlign: 'justify'
    },

    modalView: {      
      backgroundColor: "#FFFFFF",
      borderRadius: 5,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 5,
      width: '90%',
      minHeight:Platform.OS === 'ios' ? '60%' : '50%',
      //height: Platform.OS === 'ios' ? '60%' : '62%'

    },

    bell_icon: {
      marginTop: Platform.OS === 'ios' ? 5 : 1
    },
    reminderContainer: {
      marginTop: Platform.OS === 'ios' ? 130 : 40
    },
    blank_view: {
      marginTop: Platform.OS === 'ios' ? 20 : 40
    },
    label_trick: {
      fontWeight: 'bold'
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
  });