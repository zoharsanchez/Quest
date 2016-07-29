import React, { Component } from 'react';
import {
  Text
} from 'react-native';
import { styles } from './Styles/TagsStyle';

class TagsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      titleText: "Bird's Nest",
      bodyText: 'This is not really a bird nest.'
    };
  }

  render() {
    console.log('hello');
    return (
      <Text style={styles.text}>{'Hello'}</Text>
    );
  }
}

export { TagsView };
