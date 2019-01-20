import React, {Component} from 'react';
import {Modal, TouchableHighlight, View, Alert, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
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
    H1,
    Toast
} from 'native-base';
import LogoTitle from '../components/LogoHeader';
import {startCreateNewGame} from '../actions/game';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
class CreateNewGamePage extends Component {
    static navigationOptions = {
        title: 'CREATE NEW GAME',
        headerRight: (<LogoTitle/>),
        headerStyle: {
            backgroundColor: '#364051'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };
    constructor(props) {
        super(props);

        this.state = {
            gameid: "",
            playersCount: "",
            gameType: "",
            totalChipsCount: "",
            bigBlind: "",
            smallBlind: "",
            blindTime: ""
        };
    }

    handleGameIdChange = (e) => {

        this.setState(() => ({gameid: e.target.value}));
    }

    onSubmit = async() => {
       debugger;
        const chipTypes = ["blue", "red", "green"];
        const chipValues = [100, 200, 300];
        await this
            .props
            .startCreateNewGame(this.state.playersCount, this.state.gameType, this.state.totalChipsCount, chipTypes, chipValues, this.state.bigBlind, this.state.smallBlind, this.state.blindTime, this.props.User.ID);

            if(this.props.gameId != 0)
            {
                Toast.show({
                    text: "Your Game ID is: "+this.props.gameId,
                    buttonText: "Okay",
                    type: "danger",
                    duration: 8000
                  });
            }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>

                        <Item>
                            <Input
                                type="text"
                                placeholder="Players Count"
                                autoFocus
                                onChangeText={(playersCount) => this.setState({playersCount})}
                                value={this.state.playersCount}/>
                        </Item>

                        <Item>
                            <Input
                                type="text"
                                placeholder="Game Type"
                                onChangeText={(gameType) => this.setState({gameType})}
                                value={this.state.gameType}/>
                        </Item>

                        <Item>
                            <Input
                                type="text"
                                placeholder="Total Chips Count"
                                onChangeText={(totalChipsCount) => this.setState({totalChipsCount})}
                                value={this.state.totalChipsCount}/>
                        </Item>

                        <Item>
                            <Input
                                type="text"
                                placeholder="Chip Type"
                                onChangeText={(note) => this.setState({note})}
                                value={this.state.note}/>
                        </Item>

                        <Item>
                            <Input
                                type="text"
                                placeholder="Chip Value"
                                onChangeText={(note) => this.setState({note})}
                                value={this.state.note}/>
                        </Item>

                        <Item>
                            <Input
                                type="text"
                                placeholder="Big Blind"
                                onChangeText={(bigBlind) => this.setState({bigBlind})}
                                value={this.state.bigBlind}/>
                        </Item>

                        <Item>
                            <Input
                                type="text"
                                placeholder="Small Blind"
                                onChangeText={(smallBlind) => this.setState({smallBlind})}
                                value={this.state.smallBlind}/>
                        </Item>

                        <Item>
                            <Input
                                type="text"
                                placeholder="Blind Time"
                                onChangeText={(blindTime) => this.setState({blindTime})}
                                value={this.state.blindTime}/>
                        </Item>

                        <Button full Primary onPress={this.onSubmit}>
                            <Text>CREATE GAME</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: (userName, password) => dispatch(startLogin(userName, password)),
    logout: () => dispatch(logout()),
    startCreateNewGame: (playersCount, gameType, chipCount, chipTypes, chipValues, bigBlind, smallBlind, blindTime, userId) => dispatch(startCreateNewGame(playersCount, gameType, chipCount, chipTypes, chipValues, bigBlind, smallBlind, blindTime, userId))
});

const mapStateToProps = (state) => ({errorMassege: state.auth.msg,
     User: state.auth,
    gameId: state.game.NewGameId,})

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewGamePage);

const styles = {
    form: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "column",
        backgroundColor: '#0279fe'
    },

    input: {
        backgroundColor: 'white',
        height: 10,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 15
    }
};

// handleOnGameTypeChange(value: int) {     this.setState({       gametype:
// value     }); // <Item picker> // <Picker     mode="dropdown" iosIcon={<Icon
// name="ios-arrow-down-outline" />}     style={{ width: undefined }}
// placeholder="Game Type"     placeholderStyle={{ color: "#bfc6ea" }}
// placeholderIconColor="#007aff" selectedValue={this.state.selected2}
// onValueChange={this.onValueChange2.bind(this)} >     <Picker.Item
// label="CASH" value=0 />     <Picker.Item label="TOURNAMENT" value=1 />
// </Picker>