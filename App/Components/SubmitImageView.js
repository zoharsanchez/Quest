import * as firebase from 'firebase';
import React, { Component } from 'react';
import * as Clarifai from 'clarifai';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  AlertIOS,
  TextInput
} from 'react-native';
import { ENV } from '../../environment/environment';
import { styles } from './Styles/SubmitImageStyle';

class SubmitImageView extends Component {
  constructor(props) {
    super(props);
    this.user = firebase.auth().currentUser;
    this.state = {
      text: ''
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let initialPosition = position;
      this.setState({initialPosition: initialPosition});
    }, (error) => console.log(error.message),
                                             {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

    navigator.geolocation.watchPosition((position) => {
      let lastPosition = position;
      this.setState({lastPosition: lastPosition});
    });

    Clarifai.initialize({
      clientId: ENV.clarifaiId,
      clientSecret: ENV.clarifaiSecret
    });
  }

  sendArtifact() {
    //the JSON object sent to Firebase below contains text, geolocation, username, and a timestamp
    Clarifai.getTagsByImageBytes(this.props.base64.substring(23)).then((resp) => {
      let tags = resp.results[0].result.tag.classes;

      this.props.dbRef.push({
        message: this.state.text,
        user: this.user.displayName,
        latitude: this.state.lastPosition.coords.latitude,
        longitude: this.state.lastPosition.coords.longitude,
        timestamp: Date.now(),
        tags: tags,
        base64: this.props.base64 },
                            () => { AlertIOS.alert('New message posted!'); });

      this.props.navigator.popToTop();

    }, (err) => { console.log(err); });


  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableHighlight onPress={() => this.sendArtifact()}>
          <View style={styles.bottomNavButton}>
            <Text style={styles.buttonText}>SUBMIT ARTIFACT</Text>
          </View>
        </TouchableHighlight>
        <TextInput multiline={true} onChangeText={(text) => this.setState({text})} value={this.state.text} style={styles.caption} placeholder="Add caption" />
        <Image style={styles.mainImage} source={{uri: this.props.path}}/>
      </View>
    );
  }
}

export { SubmitImageView };
