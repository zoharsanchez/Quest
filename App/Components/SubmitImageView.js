import * as firebase from 'firebase';
import * as _ from 'lodash';
import React, { Component } from 'react';
import * as Clarifai from 'clarifai';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
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

      fetch('http://localhost:8080/classes/artifacts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: this.state.text,
          user: this.user.displayName,
          latitude: this.state.lastPosition.coords.latitude,
          longitude: this.state.lastPosition.coords.longitude,
          timestamp: Date.now(),
          tags: tags,
          base64: this.props.base64
        })
      });
      // .then((response) => {console.log(response); this.props.navigator.popToTop(); });


      var currentTags = _.map(this.props.currentTags, (tagObj) => tagObj.tag);
      // let newTags = _.difference(currentTags, tags);
      console.log(/*'newTags:', newTags, */'currentTags:', this.props.currentTags);
      let correctTags = _.intersection(currentTags, tags);
      console.log('correctTags:', correctTags);

      var newTags = [];

      let newState = _.map(this.props.currentTags, (tagObj) => {
        var result = tagObj;
        if (correctTags.includes(tagObj.tag)){
          if (result.done === false) {
            newTags.push(tagObj.tag);
          }
          result.done = true;
        }
        return result;
      });

      console.log('newTags', newTags);

      this.props.navigator.push({
        name: 'ScoringView',
        imagePath: this.props.path,
        photoTags: tags,
        newTags: newTags
      });

      this.props.changeTags(newState);

      console.log('new currentTags state', newState);
      // Strangely enough this url-like argument is case sensitive
      this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/currentTags').set(newState);

      this.props.userRef.ref('tags').once('value', (rawTags) => {
        let tagsObj = rawTags.val();
        console.log('tagsObj', tagsObj);

        // Saving hash map to firebase, this way we only ever save unique tags
        var foundTags = _.reduce(tags, (prev, curr) => {
          prev[curr] = true;
          return prev;
        }, {});

        console.log(foundTags);

        var cumulative = _.defaults(tagsObj, foundTags);

        console.log(cumulative);
        this.props.userRef.ref('tags').set(cumulative);
      });


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
        <Image style={styles.mainImage} source={{uri: this.props.path}}/>
      </View>
    );
  }
}

export { SubmitImageView };
