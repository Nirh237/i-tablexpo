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
  Body
} from 'native-base';
import {View} from 'react-native';
import Expo from "expo";
import {StatusBar, TouchableOpacity, Image} from "react-native";

import LogoTitle from '../components/LogoHeader';



class DashboardPage extends Component {
  static navigationOptions = {
    title: 'Dash',
    headerRight: (
        <LogoTitle
        />
      ),
    headerStyle: {
      backgroundColor: '#364051',
      height:60
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

    };
  }

  async componentWillMount() {
    await Expo
      .Font
      .loadAsync({'Roboto': require('native-base/Fonts/Roboto.ttf'), 'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'), 'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf')});
    this.setState({loading: false});
  }


 

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading/>; //123456
    }
    return (
      <Container>

      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: (userName, password) => dispatch(startLogin(userName, password)),
  logout: () => dispatch(logout())
});

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.msg,
  errorMassege: state.auth.msg
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

// <Header
// style={{marginTop:StatusBar.currentHeight,backgroundColor:"#364051"}} />