import React from 'react';
import {
  StyleSheet, Text, View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar, 
  Modal,
  Pressable
} from 'react-native';


import BottomTabNavigationScreen from '../components/BottomTabNavigationScreen'
import IonicIcon from 'react-native-vector-icons/Ionicons'

class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dobText: '',
      dobDate: null,
      modalVisible: false,
    }  
  }
  

}
setModalVisible = (visible) => {
  this.setState({ modalVisible: visible });
}
unlockCode(){
  alert("Unlock mycode.")
}

render() {     
  const { modalVisible } = this.state;   
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#271933" barStyle="light-content" />
        <View style={styles.logo}>
          <Image source={require("../assets/logo.png")} style={{ resizeMode: 'contain', marginTop: 10, width: 170, height: 55 }} />
        </View>
       
        <View style={[styles.calendarCard, styles.elevation]}>        
          
        <TouchableOpacity style={{width:'46%'}} >
          <Text style={{ borderWidth: 0, width: '46%' }}>
            <IonicIcon name={'calendar-outline'} size={23} color={'#1BB467'} style={{ paddingBottom: 2 }} />
          </Text>
         </TouchableOpacity> 

          <Text style={styles.heading}>You have 2 new message(s)</Text>
        </View>
        <View style={[styles.messagesCard, styles.elevation]}>
          <TouchableOpacity style={styles.btnTouch}>
            <Text>
              <View>
                <Text style={{ padding: 10, color: 'white' }}>
                  <IonicIcon style={{ paddingBottom: 2 }} name={'add-outline'} color={'white'} size={20} />
                  COMPOSE
                </Text>
              </View>
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ marginTop: 2, margin: 3, flex: 1, height: '100%', }}>
          <View style={[styles.messagesCard, styles.elevation]}>

            <View style={{ flexDirection: 'row', margin: 2, width: '100%' }}>
              <Text style={{ width: '45%' }}>
                <View style={styles.dateRow}>
                  <Text style={styles.innerText}>Date: Nov.21,2021</Text>
                </View>
              </Text>             
            </View>

            <View style={{ flexDirection: 'row', margin: 1, width: '100%' }}>
              <Text style={{ width: '40%' }}>
                <View style={styles.dateRow}>
                  <Text style={styles.innerText}>Time: 9.10 am</Text>
                </View>
              </Text>
            </View>

            <View style={{ flexDirection: 'row', margin: 1, width: '100%' }}>
              <Text style={{ width: '70%' }}>
                <View style={styles.dateRow}>
                  <Text style={styles.innerText}>Customer name: Taranjit Singh</Text>                  
                </View>
              </Text>
            </View>

            <View style={{ flexDirection: 'row', flexGrow: 1, flex: 1 }}>
              <Text style={styles.long_text}>
                Lorem ipsum dolar Lorem ipsum dolarLorem ipsum Lorem Lorem ipsum dolar Lorem ipsum dolarLorem ipsum Lorem
              </Text>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#C1C1C1', marginBottom: 6, }}><Text></Text></View>


            <View style={{ flexDirection: 'row', margin: 2, width: '100%' }}>
              <Text style={{ width: '45%' }}>
                <View style={styles.dateRow}>
                  <Text style={styles.innerText}>Date: Nov.21,2021</Text>
                </View>
              </Text>

              <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                <Text style={{ width: '100%', borderWidth: 0 }}>
                  <View style={styles.dateRow}>
                    <Text style={styles.innerText}>
                      <IonicIcon name={'lock-closed-outline'} color={'black'} size={20} /></Text>
                  </View>
                </Text>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: 1, width: '100%' }}>
              <Text style={{ width: '100%' }}>
                <View style={styles.dateRow}>
                  <Text style={styles.innerText}>Time: 9.10 am</Text>
                </View>
              </Text>
            </View>

            <View style={{ flexDirection: 'row', margin: 1, width: '100%' }}>
              <Text style={{ width: '100%' }}>
                <View style={styles.dateRow}>
                  <Text style={styles.innerText}>Customer name: Taranjit Singh</Text>
                </View>
              </Text>
            </View>

            <View style={{ flexDirection: 'row', flexGrow: 1, flex: 1 }}>
              <Text style={styles.long_text}>
                This message is private, please enter 6 digit code to unlock it.
              </Text>
            </View>


            <View style={{ borderBottomWidth: 1, borderBottomColor: '#C1C1C1', marginBottom: 6, }}><Text></Text></View>


            <View style={{ flexDirection: 'row', margin: 2, width: '100%' }}>
              <Text style={{ width: '100%' }}>
                <View style={styles.dateRow}>
                  <Text style={styles.innerText}>Date: Nov.21,2021</Text>
                </View>
              </Text>

            </View>

            <View style={{ flexDirection: 'row', margin: 1, width: '100%' }}>
              <Text style={{ width: '100%' }}>
                <View style={styles.dateRow}>
                  <Text style={styles.innerText}>Time: 9.10 am</Text>
                </View>
              </Text>
            </View>

            <View style={{ flexDirection: 'row', margin: 1, width: '100%' }}>
              <Text style={{ width: '100%' }}>
                <View style={styles.dateRow}>
                  <Text style={styles.innerText}>Customer name: Taranjit Singh Wadhwa</Text>
                </View>
              </Text>
            </View>

            <View style={{ flexDirection: 'row', flexGrow: 1, flex: 1 }}>
              <Text style={styles.long_text}>
                Lorem ipsum dolar Lorem ipsum dolarLorem ipsum Lorem Lorem ipsum dolar Lorem ipsum dolarLorem ipsum Lorem
              </Text>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#C1C1C1', marginBottom: 6, }}><Text></Text></View>

            <View style={{ flexDirection: 'row', margin: 2, width: '100%' }}>
              <Text style={{ width: '100%' }}>
                <View style={styles.dateRow}>
                  <Text style={styles.innerText}>Date: Nov.21,2021</Text>
                </View>
              </Text>

            </View>

            <View style={{ flexDirection: 'row', margin: 1, width: '100%' }}>
              <Text style={{ width: '100%' }}>
                <View style={styles.dateRow}>
                  <Text style={styles.innerText}>Time: 9.10 am</Text>
                </View>
              </Text>
            </View>

            <View style={{ flexDirection: 'row', margin: 1, width: '100%' }}>
              <Text style={{ width: '100%' }}>
                <View style={styles.dateRow}>
                  <Text style={styles.innerText}>Customer name: Taranjit Singh Wadhwa</Text>
                </View>
              </Text>
            </View>

            <View style={{ flexDirection: 'row', flexGrow: 1, flex: 1 }}>
              <Text style={styles.long_text}>
                Lorem ipsum dolar Lorem ipsum dolarLorem ipsum Lorem Lorem ipsum dolar Lorem ipsum dolarLorem ipsum Lorem
              </Text>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#C1C1C1', marginBottom: 6, }}><Text></Text></View>


            <View style={{ flexDirection: 'row', margin: 2, width: '100%' }}>
              <Text style={{ width: '100%' }}>
                <View style={styles.dateRow}>
                  <Text style={styles.innerText}>Date: Nov.21,2021</Text>
                </View>
              </Text>

            </View>

            <View style={{ flexDirection: 'row', margin: 1, width: '100%' }}>
              <Text style={{ width: '100%' }}>
                <View style={styles.dateRow}>
                  <Text style={styles.innerText}>Time: 9.10 am</Text>
                </View>
              </Text>
            </View>

            <View style={{ flexDirection: 'row', margin: 1, width: '100%' }}>
              <Text style={{ width: '100%' }}>
                <View style={styles.dateRow}>
                  <Text style={styles.innerText}>Customer name: Taranjit Singh Wadhwa</Text>
                </View>
              </Text>
            </View>

            <View style={{ flexDirection: 'row', flexGrow: 1, flex: 1 }}>
              <Text style={styles.long_text}>
                Lorem ipsum dolar Lorem ipsum dolarLorem ipsum Lorem Lorem ipsum dolar Lorem ipsum dolarLorem ipsum Lorem
              </Text>
            </View>


          </View>

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
              <TextInput style={styles.input} placeholder="Enter code:"/>


              <View>                     
                <TouchableOpacity onPress={this.unlockCode} style={styles.buttonClose}>
                    <Text style={{color:'white',padding:5,alignSelf:'center',textAlign:'center',fontSize:16}}>SUBMIT</Text>
                  </TouchableOpacity>          
              </View>

              <View style={{flexDirection:'column',alignItems:'flex-end',marginTop:15}}>                            
              <Pressable
                style={styles.buttonClose}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={{color:'white',padding:5}}>CLOSE</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>                    
        <BottomTabNavigationScreen navigation={this.props.navigation} route={this.props.route} />
      </View>
    )
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

  centeredView: {    
    justifyContent: "center",
    alignItems: "center",    
    backgroundColor:'#F1F1F1',
    flex:1
  },

  innerModalText:
  {
    color:'black',
    fontSize:16
  },
  input:{
    width:"95%",    
    borderColor:'#271833',
    padding:10,
    margin:8,
    borderRadius:5,
    fontSize:18,
    borderWidth:1
  },
  buttonClose: {
    backgroundColor: "#1BB467",  
    padding:16,
    borderRadius:5,
    color:'white'    
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
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    marginVertical: 2,
    shadowOpacity:1,
    shadowRadius:3,
    shadowOffset:{
    height:0,
    width:0
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
  lineHeight: 20,
  fontSize: 15
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
    width:'80%',
    height: Platform.OS === 'ios' ? '60%' : '52%'

  },

  blank_view:{
  marginTop: Platform.OS === 'ios' ? 20 : 70
  },
});