import * as firebase from 'firebase';
import * as _ from 'lodash';
import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  TouchableHighlight
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
      this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/gameScore').set(nextProps.gameScore);
      this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/picCount').set(nextProps.picCount);

      console.log('after db sets');

      // var allDone = _.reduce(this.props.currentTags, function(acc, tag) {
      //   return acc && tag.done;
      // }, true);
      // console.log('allDone', allDone);

      if (_.every(this.props.currentTags, ['done', true])) {
        this.state.gameOver = 'You got all 20 tags!';
      } else if (this.props.picCount >= 10) {
        this.state.gameOver = 'Game Over: Ten pictures reached';
      }
    }
  }

  navToGameOver() {
    console.log('navToGameOver', this.props);
    this.props.navigator.push({
      name: 'GameOverView',
      imagePath: this.props.path,
      gameScore: this.props.gameScore,
      picCount: this.props.picCount
    });

    this.props.userRef.ref('tags').once('value', (rawTags) => {
      let tagsObj = rawTags.val();
      let tags = Object.keys(tagsObj);
      let newTags = _.sampleSize(tags, 20);
      console.log(newTags);
      let newState = _.map(newTags, (tag) => {return {tag: tag, done: false}; });
      this.props.changeTags(newState);
      this.props.updateGame(0, 0);
      this.props.userRef.ref('users/' + this.user.displayName.toLowerCase()).set({
        currentTags: newState,
        gameScore: 0,
        picCount: 0
      });
      console.log('started new game');
    });
  }

  render() {
    var gameOverButton = (
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.navToGameOver.bind(this)}>
          <Text style={styles.buttonText}>See Game Results</Text>
        </TouchableHighlight>
      </View>
    );
    return (
      <View style={styles.container}>
        <View>
          <Text>Scoring</Text>
          <Text>{'Pic Score: ' + this.state.picScore}</Text>
          <Text>{'Game Score: ' + this.props.gameScore}</Text>
          <Text>{'Pics Taken: ' + this.props.picCount}</Text>
          <Image source={{uri: this.props.route.imagePath}}
                 style= {styles.image}/>
          <Text>New Tags</Text>
          {this.props.route.newTags.map((tag) => <Text key={tag}>{tag}</Text>)}
        </View>
        <Text>{this.state.gameOver}</Text>
        {this.state.gameOver ? gameOverButton : null}
      </View>
    );
  }
}

export { ScoringView };
