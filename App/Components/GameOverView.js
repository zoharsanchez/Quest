import * as firebase from 'firebase';
import * as _ from 'lodash';
import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { styles } from './Styles/ScoringViewStyle';

class GameOverView extends Component {
  constructor(props) {
    super(props);
    this.user = firebase.auth().currentUser;

    console.log('game over props', this.props);
    var doneCount = _.reduce(this.props.currentTags, function(acc, tag) {
      return acc + (tag.done ? 1 : 0);
    }, 0);
    console.log('doneCount', doneCount);

    var bonus = (doneCount > 10 ? ((doneCount - 10) * 50) : 0) + (doneCount === 20 ? 500 : 0);
    var finalScore = this.props.route.gameScore + bonus;
    this.state = {
      bonus: bonus,
      finalScore: finalScore,
      doneCount: doneCount
    };
    console.log('bonus', this.state.bonus, 'finalScore', this.state.finalScore);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.gameResults}>Game Results</Text>
          <Text>{'Score from Images: ' + this.props.route.gameScore}</Text>
          <Text>{'Tags Completed: ' + this.state.doneCount}</Text>
          <Text>{'Pics Taken: ' + this.props.route.picCount}</Text>
          <Text>{'Bonus: ' + this.state.bonus}</Text>
          <Text>{'Final Score: ' + this.state.finalScore}</Text>
        </View>
      </View>
    );
  }

}

export { GameOverView };
