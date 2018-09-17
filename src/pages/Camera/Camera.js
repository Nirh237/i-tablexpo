import React from 'react';
import { Text, View, TouchableOpacity, Vibration, Image, Button,Alert } from 'react-native';
import { Camera, Permissions, takePictureAsync } from 'expo';
import { Footer, Right } from 'native-base';

export default class CameraScreen extends React.Component {
  static navigationOptions = {
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
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      picUri: 'https://cdn1.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/gender-male2-512.png',
      pic64base:"",
      picName64base:"",
     


    };
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  btnPic = async () => {

    let photo = await this.camera.takePictureAsync({
      quality: 0.1,
      base64: true,
      });
      this.setState({
      pic64base: photo.base64,
      picName64base: 'image1_' + new Date().getTime() + '.jpg',
      picUri: `data:image/jpg;base64,${photo.base64}`,
     
    
      });
   
    }


    uploadBase64ToASMX = async() => {

      this.setState({ animate: true });
      let urlAPI =
      'http://ruppinmobile.tempdomain.co.il/site02/WebService.asmx/ImgUpload';


      const res = await fetch(urlAPI, {
        headers: {
          'content-type': 'application/json; charset=UTF-8'
      },
      method: 'POST',
      body: JSON.stringify({
        base64img: this.state.pic64base,
        base64imgName: this.state.picName64base,
        userID:this.props.navigation.getParam('Uu_id'),
      })
    })
    console.log(res);
    this.props.navigation.navigate('LogInPage');
    
  }

  showPic = async() => {

    const cuurentPicture = this.state.picUri;
    const base64image = this.state.pic64base;
    const base64imgName= this.state.picName64base;
    const userID= this.props.navigation.getParam('Uu_id', 'NO-ID');
    this.props.navigation.navigate('Picture',{cuurentPicture:cuurentPicture,base64image:base64image,base64imgName:base64imgName,userID:userID})
    console.log(cuurentPicture);
    console.log(base64image);
    console.log(base64imgName);
    console.log(userID);
  }

  skipButton = () => 
  {
    this.props.navigation.navigate('LogInPage');
  }


    
    // let photo2 = await this.camera.takePictureAsync();
    // //alert(photo2.uri);
    // this.setState({ picUri: photo2.uri });
    // debugger;
    // Vibration.vibrate();
 
  
 

 

  render() {
    const itemId = this.props.navigation.getParam('Uu_id', 'NO-ID');
    console.log(itemId);
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera ref={ref => {
            this.camera = ref;
          }} style={{ flex: 1 }} type={this.state.type} >
          <View style={{
            flex: 1, padding: 50,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <Text style={{ fontSize: 20 }}>Reload at {new Date().toLocaleTimeString()}</Text>
            <Button
              onPress={this.btnPic}
              title="btn Pic From OutSide"
              style={{width:200 }}
            />
            <Image
              style={{ width: 200, height: 200, borderWidth: 1, borderRadius: 100}}
              source={{ uri: this.state.picUri }}
            />
          </View>
          <Footer>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                Flip
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onPress={this.btnPic}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                  Pic
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
              style={{
                flex: 0.5,
                alignSelf: 'flex-end',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              onPress={this.uploadBase64ToASMX}>
              <Text
                style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                UPLOAD
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={{
              flex: 0.5,
              alignSelf: 'flex-end',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
            onPress={this.skipButton}>
            <Text
              style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
              SKIP
            </Text>
          </TouchableOpacity>

            
           
            <TouchableOpacity onPress={this.showPic}
            style={{
              flex: 0.5,
              alignSelf: 'flex-end',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
            >
              <Image
                style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1 }}
                source={{ uri: this.state.picUri }}
              />
              </TouchableOpacity>
            
             
            </View>
            </Footer>
         
          
          
          </Camera>
        </View>
      );
    }
  }
}
