import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { styles } from './Styles/TagsStyle';

class TagsView extends Component {

  constructor(props) {
    super(props);
  }

  generateNewTags() {
    console.log('Hello');
  }

  render() {
    return (
      <View style={styles.mainContainer}>

        <View style={styles.allTags}>
          {['hi', 'my', 'name', 'is', 'leah'].map((tag) =>
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={ this.generateNewTags.bind(this) }>
            <Text style={styles.buttonText}>Generate New Tags</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}

export { TagsView };
