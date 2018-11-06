import React, { Component } from 'react';
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


export default class CreateNewGamePage extends Component {
    static navigationOptions = {
        title: 'CREATE NEW GAME',
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
            <Form style={styles.form}>
                <Input
                    type="text"
                    placeholder="Description"
                    autoFocus
                    style={styles.input}
                    onChangeText={(description) => this.setState({ description })}
                    value={this.state.description} />
                <Input
                    type="text"
                    placeholder="Amount"
                    autoFocus
                    style={styles.input}
                    onChangeText={(amount) => this.setState({ amount })}
                    value={this.state.amount} />
                <Input
                    type="text"
                    placeholder="Date"
                    autoFocus
                    style={styles.input}
                    onChangeText={(expense) => this.setState({ expense })}
                    value={this.state.expense} />
                <Input
                    type="text"
                    placeholder="Note"
                    autoFocus
                    style={styles.input}
                    onChangeText={(note) => this.setState({ note })}
                    value={this.state.note} />

                <Input
                    type="text"
                    placeholder="Note"
                    autoFocus
                    style={styles.input}
                    onChangeText={(note) => this.setState({ note })}
                    value={this.state.note} />

                <Input
                    type="text"
                    placeholder="Note"
                    autoFocus
                    style={styles.input}
                    onChangeText={(note) => this.setState({ note })}
                    value={this.state.note} />

                <Input
                    type="text"
                    placeholder="Note"
                    autoFocus
                    style={styles.input}
                    onChangeText={(note) => this.setState({ note })}
                    value={this.state.note} />


                <Button full style={{ margin: 10 }} onPress={this.onSubmit}>
                    <Text>DONE</Text>
                </Button>
            </Form>
        );
    }
}

const styles = {
    form: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "column",
        backgroundColor: 'white',
    },

    input: {
        backgroundColor: 'yellow',
        height: 10,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
    }
};
