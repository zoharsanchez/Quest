import * as firebase from 'firebase';
import React, { Component } from 'react';
import {
  Text,
  Image,
  View
} from 'react-native';
import { styles } from './Styles/ScoringViewStyle';

class ScoringView extends Component {
  constructor(props) {
    super(props);
    this.user = firebase.auth().currentUser;
    this.state = {};
  }

  componentDidMount() {
    var newTags = this.props.route.newTags;
    this.state.picScore = Math.pow(newTags.length, 2) * 10 + (newTags.length === 20 ? 1000 : 0) - (newTags.length === 0 ? 10 : 0);
    console.log('picScore', this.state.picScore);

    this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/currentScore').once('value', (oldScore) => {
      console.log('stored score', oldScore.val());
      this.state.gameScore = oldScore.val() + this.state.picScore;
      this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/currentScore').set(this.state.gameScore);
    });

    this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/gamePics').once('value', (pics) => {
      console.log('game pics', pics.val());
      this.state.gamePics = pics.val() + 1;
      this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/gamePics').set(this.state.gamePics);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Scoring</Text>
        <Text>{'Pic Score: ' + this.state.picScore}</Text>
        <Text>{'Game Score: ' + this.state.gameScore}</Text>
        <Text>{'Pics Taken: ' + this.state.gamePics}</Text>
        <Image source={{uri: this.props.route.imagePath}}
               style= {styles.image}/>
        <Text>Tags for image</Text>
        {this.props.route.photoTags.map((tag) => <Text key={tag}>{tag}</Text>)}
        <Text>New Tags</Text>
        {this.props.route.newTags.map((tag) => <Text key={tag}>{tag}</Text>)}
      </View>
    );
  }
}

export { ScoringView };
