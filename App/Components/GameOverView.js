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

class GameOverView extends Component {
  constructor(props) {
    super(props);
    this.user = firebase.auth().currentUser;
    this.state = {};
  }

  componentDidMount() {
    var doneCount = _.reduce(this.props.currentTags, function(acc, tag) {
      return acc + (tag.done ? 1 : 0);
    }, 0);
    console.log('doneCount', doneCount);

    this.state.bonus = (doneCount > 10 ? ((doneCount - 10) * 50) : 0) + (doneCount === 20 ? 500 : 0);
    this.state.finalScore = this.props.gameScore + this.state.bonus;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Game Results</Text>
          <Text>{'Score from Images: ' + this.props.gameScore}</Text>
          <Text>{'Bonus: ' + this.state.bonus}</Text>
          <Text>{'Final Score: ' + this.state.finalScore}</Text>
          <Text>{'Pics Taken: ' + this.props.picCount}</Text>
        </View>
      </View>
    );
  }

}

export { GameOverView };
