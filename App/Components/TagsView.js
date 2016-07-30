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
    if (tag.complete) {
      return styles.completeTagContainer;
    } else {
      return styles.incompleteTagContainer;
    }
  }

  getTagTextStyle(tag) {
    if (tag.complete) {
      return styles.completeTagText;
    } else {
      return styles.incompleteTagText;
    }
  }

  render() {
    let testData = [
      {text: 'hi', complete: true},
      {text: 'this', complete: true},
      {text: 'is', complete: false},
      {text: 'fantastic', complete: true},
      {text: 'test', complete: false},
      {text: 'data', complete: true}
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
            onPress={this.props.generateNewTags}>
            <Text style={styles.buttonText}>GENERATE NEW TAGS</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}

export { TagsView };
