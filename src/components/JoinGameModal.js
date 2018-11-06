import React, {Component} from 'react';
import {Modal, TouchableHighlight, View, Alert,TouchableOpacity} from 'react-native';
import {
    Container,
    Header,
    Content,
    Item,
    Input,
    Icon,
    Button,
    Text,
    center,
    Body,
    Label,
    H1
  } from 'native-base';
import LogoTitle from '../components/LogoHeader';

export default class JoinGameModal extends Component {
    static navigationOptions = {
        title: 'Dash',
        headerRight: (
          <LogoTitle
          />
          
        ),
        headerStyle: {
          backgroundColor: '#364051',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
         
        }
      };
      constructor(props) {
        super(props);
      }
  state = {
    modalVisible: false,
    gameid:""
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleGameIdChange = (e) => {

    this.setState(() => ({gameid: e.target.value}));
  }

  render() {
    return (
      <View style={{borderColor:'red',borderWidth:1,backgroundColor:'#1c7dec',alignItems:'center'}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22,alignItems:'center'}}>
            <View>
            <View>
              <Text>GAME ID</Text>
              <Item floatingLabel>
            
                <Input style={{borderColor:'black',borderWidth:1}}
                onChangeText={(gameid) => this.setState({gameid})}
                value={this.state.gameid}
                  />
              </Item>
              </View>
              
              <TouchableOpacity style={{borderColor:'red',borderWidth:1}}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity 
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={{color:'white',fontSize:25}}>JOIN GAME</Text>
        </TouchableOpacity>
      </View>
    );
  }
}