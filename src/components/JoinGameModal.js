import React, { Component } from 'react';
import { Modal, TouchableHighlight, View, Alert, TouchableOpacity } from 'react-native';
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
  H1,
  Form
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
    gameid: ""
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  handleGameIdChange = (e) => {

    this.setState(() => ({ gameid: e.target.value }));
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.joinGamemodalVisible}
        onRequestClose=
        {this.props.closeModal}
      >
        <Form style={styles.form}>
          <Text style={{ color: 'black', fontSize: 25, margin: 10 }}>ENTER YOUR GAME ID:</Text>
          <Input
            type="text"
            autoFocus
            style={styles.input}
            onChangeText={(tableid) => this.setState({ tableid })}
            value={this.state.tableid} />

          <Button full style={{ margin: 10, backgroundColor: 'black' }} onPress={() => {
            this.props.closeModal('JoinGameModal');
          }}>
            <Text>JOIN</Text>
          </Button>
        </Form>
      </Modal>
    );
  }
}

const styles = {
  form: {
    flex: 1,
    alignItems: 'center',
    flexDirection: "column",
    marginTop: 250,
    marginBottom: 220,
    backgroundColor: '#0279fe',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 5,
    borderRadius: 10

  },

  input: {
    backgroundColor: 'white',
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  }
};
