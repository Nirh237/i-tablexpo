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
  StyleSheet,
  Card
} from 'native-base';
import { View } from 'react-native';
import Expo from "expo";
import { StatusBar, TouchableOpacity, Image } from "react-native";

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
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
     
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
      .loadAsync({ 'Roboto': require('native-base/Fonts/Roboto.ttf'), 'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'), 'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf') });
    this.setState({ loading: false });
  }




  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />; //123456
    }
    return (
      <Container style={{flex:1, justifyContent: 'space-between'}}>  
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
          <Card style={styles.card}>
            <Text> Win Count</Text>
          </Card>
       
          <Card style={styles.card}>
            <Text> Lose Count</Text>
          </Card>
        </View>

        <Card style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.1, flexDirection: 'column'}}>
            <Text style={{ fontWeight: 'bold' }}>Summery</Text>
            <Text>20,000$</Text>
          </View>

          <View style={{ flex: 0.1, flexDirection: 'column' }}>
            <Text style={{ fontWeight: 'bold' }}>Rank</Text>
            <Text>#1</Text>
          </View>
        </Card>


        <View style={{ flex: 1, justifyContent:'flex-end'}}>
          <Button full style={styles.button}>
            <Text>CREATE NEW GAME</Text>
          </Button>
          <Button full style={styles.button}>
            <Text>JOIN GAME</Text>
          </Button>
          <Button full style={styles.button} >
            <Text>GAMES HISTORY</Text>
          </Button>
        </View>

    
      </Container>
    );
  }
}

const styles = {
  button: {
    borderWidth: 1,
    borderColor: "black",
    borderTopWidth: 0,

  },

  card: {
    height: 150,
    width: 175,
    alignItems: 'center'
  },

  Line: {
    width: 1,
    height: 185,
    borderStyle: 'solid',
    borderColor: '#979797',
    borderWidth: 1,
  }

};

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