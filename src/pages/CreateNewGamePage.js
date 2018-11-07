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
            gameid: ""
        };
    }



    handleGameIdChange = (e) => {

        this.setState(() => ({ gameid: e.target.value }));
    }

    render() {
        return (
            <Form style={styles.form}>
                <Input
                    type="text"
                    placeholder="Players Count"
                    autoFocus
                    style={styles.input}
                    onChangeText={(description) => this.setState({ description })}
                    value={this.state.description} />
                <Input
                    type="text"
                    placeholder="Game Type"
                    autoFocus
                    style={styles.input}
                    onChangeText={(amount) => this.setState({ amount })}
                    value={this.state.amount} />
                <Input
                    type="text"
                    placeholder="Total Chips Count"
                    autoFocus
                    style={styles.input}
                    onChangeText={(expense) => this.setState({ expense })}
                    value={this.state.expense} />
                <Input
                    type="text"
                    placeholder="Chip Type"
                    autoFocus
                    style={styles.input}
                    onChangeText={(note) => this.setState({ note })}
                    value={this.state.note} />

                <Input
                    type="text"
                    placeholder="Value"
                    autoFocus
                    style={styles.input}
                    onChangeText={(note) => this.setState({ note })}
                    value={this.state.note} />

                <Input
                    type="text"
                    placeholder="Big Blind"
                    autoFocus
                    style={styles.input}
                    onChangeText={(note) => this.setState({ note })}
                    value={this.state.note} />

                <Input
                    type="text"
                    placeholder="Small Blind"
                    autoFocus
                    style={styles.input}
                    onChangeText={(note) => this.setState({ note })}
                    value={this.state.note} />

                <Input
                    type="text"
                    placeholder="Blind Time"
                    autoFocus
                    style={styles.input}
                    onChangeText={(note) => this.setState({ note })}
                    value={this.state.note} />


                <Button full style={{ margin: 10, backgroundColor: 'black' }} onPress={this.onSubmit}>
                    <Text>CREATE GAME</Text>
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
        backgroundColor: '#0279fe',
    },

    input: {
        backgroundColor: 'white',
        height: 10,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 15,
    }
};
