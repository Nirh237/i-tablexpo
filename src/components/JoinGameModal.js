import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import {startJoinGame} from '../actions/game';
import LogoTitle from '../components/LogoHeader';

class JoinGameModal extends Component {
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
    gameId: ""
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  handleGameIdChange = (e) => {

    this.setState(() => ({ gameid: e.target.value }));
  }

  handleButtonClick = async (gameId) => {
    await this.props.startJoinGame(gameId,this.props.userDetails.ID);
    this.props.closeModal('JoinGameModal');
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
          <Text style={{ color: 'white', fontSize: 25, margin: 10 }}>ENTER YOUR GAME ID:</Text>
          <Input
            type="text"
            autoFocus
            style={styles.input}
            onChangeText={(gameId) => this.setState({ gameId })}
            value={this.state.tableid} />

          <Button full style={{ margin: 10, backgroundColor: 'black' }} onPress={() => {
            this.handleButtonClick(this.state.gameId);
          }}>
            <Text>JOIN</Text>
          </Button>
        </Form>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  startJoinGame: (gameId,userId) => dispatch(startJoinGame(gameId,userId)),

});

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.msg,
  errorMassege: state.auth.msg,
  userDetails: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinGameModal);

const styles = {
  form: {
      flex: 1,
      alignItems: 'center',
      flexDirection: "column",
      marginTop: 250,
      marginBottom: 220,
      backgroundColor: '#364051',
      borderWidth: 0,
      borderRadius: 12
  },

  input: {
      backgroundColor: 'white',
      height: 30,
      width: 300,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
  }
};
