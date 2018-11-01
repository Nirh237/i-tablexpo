import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon , Button,Text,center, Body } from 'native-base';
import {View} from 'react-native';
import Expo from "expo";
import { StatusBar, TouchableOpacity,Image } from "react-native";
import { connect } from 'react-redux';




 class LogoTitle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
         picUri:props.PicturePath ? props.PicturePath : 'https://cdn1.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/gen' +
         'der-male2-512.png',
         firstName:props.FirstName ? props.FirstName: 'User'
        };
    }
    render() {
        return (
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{justifyContent:'space-around',right:15}}>
          <Text style={{color:'white'}}>{this.state.firstName}</Text>
          </View>
          <View>
          <Image
            source={{uri:this.state.picUri}}
            style={{ width: 44, height: 44, borderRadius: 25, borderWidth: 1 }}
          />
          </View>
          </View>
        );
      }
  }

  const mapStateToProps = (state) => ({
    PicturePath: state.auth.PicturePath,
    FirstName: state.auth.FirstName
  });

  export default connect(mapStateToProps)(LogoTitle)