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
    Toast,
    Picker
} from 'native-base';
import LogoTitle from '../components/LogoHeader';
import {startCreateNewGame} from '../actions/game';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MultiSelect from 'react-native-multiple-select';


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
            blindTime: "",
            loading: true,
            selected: "",
            chipTypesSelectedItems: [],
            chipValuesSelectedItems: [],
            typeItems:[{
            id: 'Blue',
            name: 'Blue',
          }, {
            id: 'Red',
            name: 'Red',
          }, {
            id: 'Green',
            name: 'Green',
          }, {
            id: 'Black',
            name: 'Black',
          }, {
            id: 'Yellow',
            name: 'Yellow',
          }, {
            id: 'White',
            name: 'White',
          }],
          valuesItems:[{
            id: '10',
            name: 10,
          }, {
            id: '20',
            name: 20,
          }, {
            id: '30',
            name: 30,
          }, {
            id: '40',
            name: 40,
          }, {
            id: '50',
            name: 50,
          }, {
            id: '60',
            name: 60,
          }]
        };

    }
    async componentWillMount() {
        await Expo
          .Font
          .loadAsync({ 'Roboto': require('native-base/Fonts/Roboto.ttf'), 'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'), 'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf') });
        this.setState({ loading: false });
      }

      onSelectedItemsChange = chipTypesSelectedItems => {
        this.setState({ chipTypesSelectedItems });
      };

      onSelectedValuesItemsChange = chipValuesSelectedItems => {
        this.setState({ chipValuesSelectedItems });
      };

      onValueChange(value: string) {
        this.setState({
            playersCount: value
        });
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
            .startCreateNewGame(this.state.playersCount, this.state.gameType, this.state.totalChipsCount, this.state.chipTypesSelectedItems, this.state.chipValuesSelectedItems, this.state.bigBlind, this.state.smallBlind, this.state.blindTime, this.props.User.ID);

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
        if (this.state.loading) {
            return <Expo.AppLoading />;
          }
        return (
            <Container>
                <Content>
                    <Form>

                <Item>
                    <Picker
                    note
                    mode="dropdown"
                    style={{ width: '100%' }}
                    placeholder="Select number of players"
                    placeholderStyle={{color:'black'}}
                    selectedValue={this.state.playersCount}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                  </Picker>
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

                        <MultiSelect
                        hideTags
                        items={this.state.typeItems}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect = component }}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={this.state.chipTypesSelectedItems}
                        selectText="Select 3 chip colors"
                        searchInputPlaceholderText="Search Items..."
                        onChangeInput={ (text)=> console.log(text)}
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#CCC"
                        submitButtonText="Ok"
                      />

                      <MultiSelect
                      hideTags
                      items={this.state.valuesItems}
                      uniqueKey="id"
                      ref={(component) => { this.multiSelect = component }}
                      onSelectedItemsChange={this.onSelectedValuesItemsChange}
                      selectedItems={this.state.chipValuesSelectedItems}
                      selectText="Select 3 chip Values"
                      searchInputPlaceholderText="Search Items..."
                      onChangeInput={ (text)=> console.log(text)}
                      tagRemoveIconColor="#CCC"
                      tagBorderColor="#CCC"
                      tagTextColor="#CCC"
                      selectedItemTextColor="#CCC"
                      selectedItemIconColor="#CCC"
                      itemTextColor="#000"
                      displayKey="name"
                      searchInputStyle={{ color: '#CCC' }}
                      submitButtonColor="#CCC"
                      submitButtonText="Ok"
                    />

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

// <MultiSelect
//                         hideTags
//                         items={this.state.items}
//                         uniqueKey="id"
//                         ref={(component) => { this.multiSelect = component }}
//                         onSelectedItemsChange={this.onSelectedItemsChange}
//                         selectedItems={this.state.selectedItems}
//                         selectText="Pick Items"
//                         searchInputPlaceholderText="Search Items..."
//                         onChangeInput={ (text)=> console.log(text)}
//                         tagRemoveIconColor="#CCC"
//                         tagBorderColor="#CCC"
//                         tagTextColor="#CCC"
//                         selectedItemTextColor="#CCC"
//                         selectedItemIconColor="#CCC"
//                         itemTextColor="#000"
//                         displayKey="name"
//                         searchInputStyle={{ color: '#CCC' }}
//                         submitButtonColor="#CCC"
//                         submitButtonText="Ok"
//                       />