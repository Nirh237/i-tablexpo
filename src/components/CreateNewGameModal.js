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
            tableid: ""
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
            <KeyboardAvoidingView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.createGamemodalVisible}
                onRequestClose=
                {this.props.closeModal}
            >
                <Form style={styles.form}>
                    <Text style={{ color: 'black', fontSize: 25, margin: 10 }}>ENTER YOUR TABLE ID:</Text>
                    <Input
                        type="text"
                        style={styles.input}
                        onChangeText={(tableid) => this.setState({ tableid })}
                        value={this.state.tableid} />

                    <Button full style={{ margin: 10, backgroundColor: 'black' }} onPress={() => {
                        this.props.closeModal('CreateGame');




                    }}>
                        <Text>NEXT</Text>
                    </Button>
                </Form>
            </Modal>
            </KeyboardAvoidingView>

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
