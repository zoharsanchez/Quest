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
    if (tag.done) {
      return styles.completeTagText;
    } else {
      return styles.incompleteTagText;
    }
  }

  render() {

    // TODO: To unhardcode test data, change to this.props.currentTags
    return (
      <View style={styles.mainContainer}>

        <View style={styles.allTags}>
          {this.props.currentTags.map((tagObj) =>
            <View style={this.getTagContainerStyle(tagObj)}>
              <Text style={this.getTagTextStyle(tagObj)}>{tagObj.tag}</Text>
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
