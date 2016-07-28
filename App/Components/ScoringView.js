import * as firebase from 'firebase';
import React, { Component } from 'react';
import {
  Text,
  Image,
  View
} from 'react-native';

class ScoringView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>Scoring</Text>
        <Image source={{uri: this.props.imagePath}} />
        <Text>Your tags</Text>
        <Text>{this.props.tags.map((tag) => <Text>{tag}</Text> )}</Text>
      </View>
    );
  }
}

export { ScoringView };
