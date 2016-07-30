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

    var newScore = this.props.gameScore + this.state.picScore;
    var newCount = this.props.picCount + 1;
    console.log('values created', newScore, newCount);
    // this.props.updateGame(this.props.gameScore + this.state.picScore, this.state.picCount + 1);
    this.props.updateGame(newScore, newCount);
    // console.log('after updateGame');

    // this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/gameScore').set(newScore);
    // this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/picCount').set(newCount);

    // console.log('after db sets');

    // this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/currentScore').once('value', (oldScore) => {
    //   console.log('stored score', oldScore.val());
    //   this.state.gameScore = oldScore.val() + this.state.picScore;
    //   this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/currentScore').set(this.state.gameScore);
    // });

    // this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/gamePics').once('value', (pics) => {
    //   console.log('game pics', pics.val());
    //   this.state.gamePics = pics.val() + 1;
    //   this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/gamePics').set(this.state.gamePics);
    // });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.gameScore !== nextProps.gameScore || this.props.picCount !== nextProps.picCount) {
      console.log('receiving props', nextProps.gameScore, nextProps.picCount);
      this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/gameScore').set(this.props.gameScore);
      this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/picCount').set(this.props.picCount);

      console.log('after db sets');
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <Text>Scoring</Text>
        <Text>{'Pic Score: ' + this.state.picScore}</Text>
        <Text>{'Game Score: ' + this.props.gameScore}</Text>
        <Text>{'Pics Taken: ' + this.props.picCount}</Text>
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
