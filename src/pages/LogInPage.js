import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  H1
} from 'native-base';
import { View, Platform } from 'react-native';
import Expo from "expo";
import { StatusBar, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView } from "react-native";
import { startUpdateNotification } from '../actions/push_notification';
import { startLogin } from '../actions/auth';
import Notification from '../services/push_notifications';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



class LogInPage extends Component {
  static navigationOptions = {
    title: 'Login',
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
      loading: true,
      username: "",
      password: "",
      picUri: 'https://cdn1.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/gen' +
        'der-male2-512.png'
    };
  }

  async componentWillMount() {
    await Expo
      .Font
      .loadAsync({ 'Roboto': require('native-base/Fonts/Roboto.ttf'), 'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'), 'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf') });
    this.setState({ loading: false });
  }

  handleUserNameTextChanged = (e) => {

    this.setState(() => ({ username: e.target.value }));
  }

  handlePasswordChange = (e) => {

    this.setState(() => ({ password: e.target.value }));
  }

  handleSubmit = async () => {

    //start login
    await this.props.startLogin(this.state.username, this.state.password);
    const curToken = await Notification();

    if (curToken != this.props.userDetails.Token) {
      await this.props.startUpdateNotification(this.props.userDetails.Email, curToken);
    }
    
    debugger;
    if(this.props.errorMassege === undefined)
    {
    this.props.navigation.navigate('DashPage');
    }else{
      this.props.logout();
    }


  };

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />; //123456
    }
    return (


      <Container>
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          keyboardOpeningTime={0}
          extraHeight={Platform.select({ android: 150 })}
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
          <Content >

            <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{ width: 200, height: 200 }}
                source={require('../../assets/logo2.png')}
              />
            </View>
            <Item floatingLabel  >
              <Label>Username</Label>
              <Input
                onChangeText={(username) => this.setState({ username })}
                value={this.state.username} />
            </Item>

            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password} />
            </Item>


            <Button block onPress={this.handleSubmit}>
              <Text>Login</Text>
            </Button>

            <Body>
              <TouchableOpacity
                onPress={() => {
                  this
                    .props
                    .navigation
                    .navigate('SignInPage');
                }}>
                <Text>
                  Registration
              </Text>
              </TouchableOpacity>
            </Body>

          </Content>
        </KeyboardAwareScrollView>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);

// <Header
// style={{marginTop:StatusBar.currentHeight,backgroundColor:"#364051"}} />