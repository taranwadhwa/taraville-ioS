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
  Alert
} from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';

export default class ModalPopup extends React.Component{    
    constructor(props) {
        super(props);
        this.state = {         
          modalVisible: false,         
        }  
    }
   
    render(){
        const { modalVisible } = this.state; 
        return(

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
              <TouchableOpacity style={styles.buttonClose}>
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
        )
    }
}
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
    width:"85%",    
    borderColor:'#271833',
    padding:10,
    margin:8,
    borderRadius:5,
    fontSize:18,
    borderWidth:1
  },
});
