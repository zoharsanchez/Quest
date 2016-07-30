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

    this.state = {
      picScore: ''
    };
  }

  componentDidMount() {
    var newTags = this.props.route.newTags;
    this.state.picScore = Math.pow(newTags.length, 2) * 10 + (newTags.length === 20 ? 1000 : 0) - (newTags.length === 0 ? 10 : 0);

    var newScore = this.props.gameScore + this.state.picScore;
    var newCount = this.props.picCount + 1;

    this.props.updateGame(newScore, newCount);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.gameScore !== nextProps.gameScore || this.props.picCount !== nextProps.picCount) {

      this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/gameScore').set(nextProps.gameScore);
      this.props.userRef.ref('users/' + this.user.displayName.toLowerCase() + '/picCount').set(nextProps.picCount);

      if (_.every(this.props.currentTags, ['done', true])) {
        this.state.gameOver = 'You got all 20 tags!';
      } else if (this.props.picCount >= 10) {
        this.state.gameOver = 'Game Over: Ten pictures reached';
      }
    }
  }

  navToGameOver() {

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

      let newState = _.map(newTags, (tag) => {return {tag: tag, done: false}; });
      this.props.changeTags(newState);
      this.props.updateGame(0, 0);
      this.props.userRef.ref('users/' + this.user.displayName.toLowerCase()).set({
        currentTags: newState,
        gameScore: 0,
        picCount: 0
      });

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

    var invisibleButton = (
      <View style={styles.invisButtonContainer}>
        <TouchableHighlight style={styles.invisButton}>
          <Text />
        </TouchableHighlight>
      </View>
    );

    this.state.gameOver = true;

    return (
      <View style={styles.container}>

        <View style={styles.topHalfContainer}>
          <View style={styles.imageContainer}>
            <Image source={{uri: this.props.route.imagePath}}
                   style= {styles.image}/>
          </View>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreboard}>Scoreboard</Text>
            <Text style={styles.scoreText}>{'This pic: ' + this.state.picScore}</Text>
            <Text style={styles.scoreText}>{'Total: ' + this.props.gameScore}</Text>
            <Text style={styles.scoreText}>{'Pics Taken: ' + this.props.picCount}</Text>
          </View>
        </View>

        <View style={styles.bottomHalfContainer}>
          <View style={styles.tagsContainer}>
            {this.props.currentTags.map((tag) => {
              // Assign CSS for the tags
              let tagStyle;
              let tagTextStyle;

              this.props.route.newTags = [];
              // Exploding style
              if (this.props.route.newTags.indexOf(tag.tag) !== -1) {
                tagStyle = styles.tagExploding;
                tagTextStyle = styles.tagTextExploding;
              // Tag done style
              } else if (tag.done) {
                tagStyle = styles.tagDone;
                tagTextStyle = styles.tagTextDone;
              // Tag not done style
              } else {
                tagStyle = styles.tagNotDone;
                tagTextStyle = styles.tagTextNotDone;
              }

              return (
                <View style={tagStyle}>
                  <Text key={tag} style={tagTextStyle}>{tag.tag}</Text>
                </View>
              );
            })}
          </View>

          {this.state.gameOver ? gameOverButton : invisibleButton}
        </View>

      </View>
    );
  }
}

export { ScoringView };
