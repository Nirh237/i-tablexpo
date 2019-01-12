import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, TouchableHighlight, View, Alert, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


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
            tableid: "",
            error:''
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: false });
    }

    handleTableIdChange = (e) => {
        this.setState(() => ({ tableid: e.target.value }));
    }

    closeModal = () => {
        this.props.closeModal();
    }


    render() {
        return (

            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.createGamemodalVisible}
                onRequestClose={this.props.closeModal}
            >
            <KeyboardAwareScrollView>
                <Form style={styles.form}>
                    <Text style={{ color: 'white', fontSize: 18, margin: 10 }}>ENTER YOUR TABLE ID:</Text>
                    <Input
                        type="text"
                        style={styles.input}
                        onChangeText={(tableid) => this.setState({ tableid })}
                        value={this.state.tableid}
                         />

                    <Button full style={{ margin: 10, backgroundColor: 'black' }} onPress={() => {
                        if(this.state.tableid)
                        this.props.closeModal('CreateGame');

                        this.setState(() => ({error:"Table Id Required"}))
                    }}>
                        <Text>NEXT</Text>
                    </Button>
                    <Text style={{color:'red'}}>{this.state.error}</Text>
                </Form>
                </KeyboardAwareScrollView>
            </Modal>


        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: (userName, password) => dispatch(startLogin(userName, password)),
    startUpdateNotification: (email, Token) => dispatch(startUpdateNotification(email, Token)),
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
