import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Container, Header, Content, Item, Input, Icon , Button,Text,Toast,Spinner   } from 'native-base';
import {View,TouchableOpacity,Platform} from 'react-native';
import Expo from "expo";
import { StatusBar } from "react-native";
// import Api from '../../server/Api';
import {startSignIn} from '../actions/auth';
import validator from 'validator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

  class SignInPage extends Component {

  static navigationOptions = {
    title: 'Signin',
    headerStyle: {
      backgroundColor: '#364051',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          username:"",
          firstname:"",
          lastname:"",
          age:"",
          telephone:"",
          password:"",
          confirmPass:'',
          email:"",
          error:false

         };
      }



    async componentWillMount() {
        await Expo.Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
        });
        this.setState({ loading: false });
    }



    handleSubmit = async() => {

      const userName = this.state.username;
      const fName = this.state.firstname;
      const lName = this.state.lastname;
      const age = this.state.age.toString();
      const telephone = this.state.telephone;
      const password = this.state.password;
      const email = this.state.email;



      if(validator.isEmail(email) && !validator.isEmpty(userName)){
        try {
            this.setState({loading:true});
            await this.props.startSignIn(userName,fName,lName,age,telephone,password,email);
            this.setState({loading:false});
          const Uu_id = this.props.Uu_id;
           if(!this.props.isRegister){
             this.setState({error: true});
             Toast.show({
               text: this.props.errorMassege,
               buttonText: "Okay",
               type: "danger",
               duration: 8000
             })
           }else{
           this.props.navigation.navigate('Camera',{Uu_id});
           }

         } catch (error) {
           console.log(error);

         }
      }else {
         Toast.show({
           text: 'valid mail is require and user name!',
           buttonText: "Okay",
           type: "danger"
         })
      }



    }
  render() {
    if (this.state.loading) {
        return <Spinner color='blue' style={{
          flex:1,
          alignSelf:"center",

        }} />;//123456
      }
    return (
      <Container>

      <KeyboardAwareScrollView
      enableOnAndroid
      enableAutomaticScroll
      keyboardOpeningTime={0}
      extraHeight={Platform.select({ android: 100 })}
      resetScrollToCoords={{x:0,y:0}}
     >
        <Content padder>

        <Item  success = {this.state.error ? false : true} error = {this.state.error || this.state.username === '' ? true : false}>
            <Input placeholder='User Name'
             onChangeText={(username) => this.setState({username})}
            value={this.state.username} />
            <Icon name={this.state.error || this.state.username === '' ?  'close-circle' : 'checkmark-circle' } />
          </Item>

          <Item success = {this.state.firstname.length > 2 ? true : false} error = {this.state.firstname.length <= 2 ? true : false}>
            <Input placeholder='First Name'
             onChangeText={(firstname) => this.setState({firstname})}
              value={this.state.firstname} />
            <Icon name= {this.state.firstname.length > 2 ? 'checkmark-circle' : 'close-circle'  } />
          </Item>

          <Item success = {this.state.lastname.length > 2 ? true : false} error = {this.state.lastname.length <= 2 ? true : false}>
            <Input placeholder='LastName'
            onChangeText={(lastname) => this.setState({lastname})}
            value={this.state.lastname}/>
            <Icon name= {this.state.lastname.length > 2 ? 'checkmark-circle' : 'close-circle'  } />
          </Item>

          <Item success = {this.state.age >= 18 ? true : false} error = {this.state.age < 18 ? true : false} >
            <Input placeholder='Age'
            onChangeText={(age) => this.setState({age})}
            value={this.state.age.toString()}/>
            <Icon name= {this.state.age >= 18 ? 'checkmark-circle' : 'close-circle'  } />
          </Item>

          <Item success = {this.state.telephone.length === 10 ? true : false} error = {this.state.telephone.length <= 9 ? true : false}>
            <Input placeholder='Telephone'
             onChangeText={(telephone) => this.setState({telephone})}
            value={this.state.telephone} />
            <Icon name= {this.state.telephone.length === 10 ? 'checkmark-circle' : 'close-circle'  } />
          </Item>



          <Item success = {validator.matches(this.state.password,/(?=.*\d)(?=.*\W+)(?=.*[a-z])(?=.*[A-Z]).{7,12}/)} error = {!this.state.password.match(/(?=.*\d)(?=.*\W+)(?=.*[a-z])(?=.*[A-Z]).{7,12}/)}>
            <Input secureTextEntry={true} placeholder='Password'
             onChangeText={(password) => this.setState({password})}
             value={this.state.password} />
            <Icon name= {this.state.password.match(/(?=.*\d)(?=.*\W+)(?=.*[a-z])(?=.*[A-Z]).{7,12}/) ? 'checkmark-circle' : 'close-circle' } />
          </Item>

          <Item success = {validator.equals(this.state.confirmPass,this.state.password)  } error = {!validator.equals(this.state.confirmPass,this.state.password) ||  this.state.confirmPass === ''}>
            <Input placeholder='Confirm Password'
            onChangeText={(confirmPass) => this.setState({confirmPass})}
            value={this.state.confirmPass}
            />
            <Icon name={validator.equals(this.state.confirmPass,this.state.password) && this.state.confirmPass !== '' ? 'checkmark-circle' : 'close-circle' } />
          </Item>

          <Item  success = {this.state.error ? false : true} error = {this.state.error || this.state.email === '' || !validator.isEmail(this.state.email) ? true : false}>
          <Input placeholder='Email'
           onChangeText={(email) => this.setState({email})}
           value={this.state.email} />

          <Icon name={this.state.error || this.state.email === '' || !validator.isEmail(this.state.email) ?  'close-circle' : 'checkmark-circle' } />
        </Item>



          <Button block onPress={this.handleSubmit} >
            <Text>NEXT</Text>
          </Button>

        </Content>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  startSignIn: (userName, fName, lName, age, telephone, password,email) => dispatch(startSignIn(userName, fName, lName, age, telephone, password,email))
});

const mapStateToProps = (state) => ({
  isRegister: !!state.auth.Uu_id,
  errorMassege: state.auth.msg,
  Uu_id: state.auth.Uu_id
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
// <Header  style={{marginTop:StatusBar.currentHeight,backgroundColor:"#364051"}} />



