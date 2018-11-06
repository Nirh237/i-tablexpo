import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Modal, TouchableHighlight, View, Alert, TouchableOpacity } from 'react-native';
import {
    Container,
    Header,
    Content,
    Form,
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


 class CreateNewGameModal extends Component {
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
    
    this.state = {
        modalVisible: false,
        gameid: ""
    };
}

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    handleGameIdChange = (e) => {

        this.setState(() => ({ gameid: e.target.value }));
    }


    render() {
        return (
            <View style={{ borderColor: 'red', borderWidth: 1, backgroundColor: '#1c7dec', alignItems: 'center' }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                        <Form style={styles.form}>
                        <Text style={{color: 'black', fontSize: 25,margin:10}}>TABLE ID:</Text>
                            <Input
                                type="text"
                                placeholder="Description"
                                autoFocus
                                style={styles.input}
                                onChangeText={(description) => this.setState({ description })}
                                value={this.state.description} />

                            <Button full style={{ margin: 10 }}  onPress={() => {
                                this
                                  .props
                                  .navigation
                                  .navigate('CreateNewGame');
                              }}>
                                <Text>NEXT</Text>
                            </Button>
                        </Form>
                </Modal>

                <TouchableOpacity
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text style={{ color: 'white', fontSize: 25 }}>CREATE NEW GAME</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: (userName, password) => dispatch(startLogin(userName, password)),
    startUpdateNotification: (email, Token) => dispatch(startUpdateNotification(email,Token)),
    logout: () => dispatch(logout())
  });
  
  const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.msg,
    errorMassege: state.auth.msg,
    userDetails: state.auth
  
  });

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewGameModal);

const styles = {
    form: {
        flex:1,
     alignItems: 'center',
        flexDirection: "column",
        marginTop: 150,
        marginBottom: 200,
        backgroundColor: 'white',
        borderColor:'black',
        borderStyle: 'solid',
        borderWidth: 5,
        
    },

    input: {
        backgroundColor:'yellow',
        height: 50,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
    }
};
