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

  getTagContainerStyle(tag) {
    if (tag.status) {
      return styles.completeTagContainer;
    } else {
      return styles.incompleteTagContainer;
    }
  }

  getTagTextStyle(tag) {
    if (tag.status) {
      return styles.completeTagText;
    } else {
      return styles.incompleteTagText;
    }
  }

  render() {
    let testData = [
      {text: 'hi', status: true},
      {text: 'this', status: true},
      {text: 'is', status: false},
      {text: 'fantastic', status: true},
      {text: 'test', status: false},
      {text: 'data', status: true}
    ];

    // TODO: To unhardcode test data, change to this.props.currentTags
    return (
      <View style={styles.mainContainer}>

        <View style={styles.allTags}>
          {testData.map((tag) =>
            <View style={this.getTagContainerStyle(tag)}>
              <Text style={this.getTagTextStyle(tag)}>{tag.text}</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={ this.props.generateNewTags }>
            <Text style={styles.buttonText}>Generate New Tags</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}

export { TagsView };
