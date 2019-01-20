import React, {Component} from 'react';
import {connect} from 'react-redux';
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
    StyleSheet,
    Card,
    Toast
} from 'native-base';
import {View} from 'react-native';
import Expo from "expo";
import {Modal, StatusBar, TouchableOpacity, Image, ImageBackground,DeviceInfo, Platform} from "react-native";


export default class GameScreen extends Component {
    // ...
    static navigationOptions = {
        title: 'Game',
        headerStyle: {
            backgroundColor: '#364051',
            height: Platform.OS === 'ios' ? 30 : 25,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            picUri: props.PicturePath
                ? props.PicturePath
                : 'https://cdn1.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/gen' +
                        'der-male2-512.png',
            player1picUri: props.PicturePath
                ? props.PicturePath
                : 'der-male2-512.png',
            player1firstName: props.FirstName
                ? props.FirstName
                : '',
            player2picUri: props.PicturePath
                ? props.PicturePath
                : 'der-male2-512.png',
            player2firstName: props.FirstName
                ? props.FirstName
                : ''


        };
    }

    DealerStyle1(options) {
        return {
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            left: 420,
            top: 170
        }
      }

      DealerStyle2(options) {
        return {
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            left: 450,
            top: 110
        }
      }

    componentWillMount() {
        Expo
            .ScreenOrientation
            .allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
    }

    componentDidMount() {}

    _orientationDidChange = (orientation) => {}

    render() {

        return (

            <Container>
                <ImageBackground
                    source={require('../assets/GameBackground.jpeg')}
                    style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <Content scrollEnabled={false}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent:'space-evenly',
                            position: 'absolute',
                            left: 160,
                            top: 110
                        }} >
                        <View
                            style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>

                            <Text
                                style={{
                                color: 'white'
                            }}>
                                S Blind:</Text>
                            <Text
                                style={{
                                color: 'white'
                            }}> $25</Text>
                        </View>

                        <View
                            style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>

                            <Text
                                style={{
                                color: 'white'
                            }}>
                                B Blind:</Text>
                            <Text
                                style={{
                                color: 'white'
                            }}> $50</Text>
                        </View>
                        </View>
                        <View
                            style={{
                            display: 'flex',
                            flexDirection: 'row',
                            position: 'absolute',
                            left: 300,
                            top: 110
                        }}>
                            <Image
                                source={require('../assets/clipart1003524.png')}
                                style={{
                                width: 25,
                                height: 25
                            }}/>
                            <Text
                                style={{
                                color: 'white'
                            }}>
                                $</Text>
                            <Text
                                style={{
                                color: 'white'
                            }}>50</Text>
                        </View>

                        <View
                            style={{
                            display: 'flex',
                            flexDirection: 'row',
                            position: 'absolute',
                            left: 378,
                            top: 200
                        }}>
                            <Image
                                source={require('../assets/clipart1003524.png')}
                                style={{
                                width: 25,
                                height: 25
                            }}/>
                            <Text
                                style={{
                                color: 'white'
                            }}>
                                $</Text>
                            <Text
                                style={{
                                color: 'white'
                            }}>50</Text>
                        </View>

                        <View
                            style={{
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'absolute',
                            left: 380,
                            top: 270
                        }}>
                            <Image
                                source={{
                                uri: this.state.picUri
                            }}
                                style={{
                                width: 44,
                                height: 44,
                                borderRadius: 25,
                                borderWidth: 1
                            }}/>
                            <Text
                                style={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}>
                                Nir</Text>
                        </View>

                        <View
                            style={{
                            display: 'flex',
                            flexDirection: 'row',
                            position: 'absolute',
                            left: 468,
                            top: 140
                        }}>
                            <Image
                                source={require('../assets/clipart1003524.png')}
                                style={{
                                width: 25,
                                height: 25
                            }}/>
                            <Text
                                style={{
                                color: 'white'
                            }}>
                                $</Text>
                            <Text
                                style={{
                                color: 'white'
                            }}>50</Text>
                        </View>

                        <View
                            style={{
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'absolute',
                            left: 549,
                            top: 140
                        }}>
                            <Image
                                source={{
                                uri: this.state.picUri
                            }}
                                style={{
                                width: 44,
                                height: 44,
                                borderRadius: 25,
                                borderWidth: 1
                            }}/>
                            <Text
                                style={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}>
                                Ran</Text>
                        </View>

                        <View
                            style={this.DealerStyle1()}>
                            <Image
                                source={require('../assets/dealer.png')}
                                style={{
                                width: 20,
                                height: 20
                            }}/>
                        </View>
                    </Content>
                </ImageBackground>
            </Container>

        )
    }
}
