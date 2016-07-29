import React, { Component } from 'react';
import {
  Text,
  Image,
  View
} from 'react-native';
import { styles } from './Styles/ScoringViewStyle';

class ScoringView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Scoring</Text>
        <Image source={{uri: this.props.route.imagePath}}
               style= {styles.image}/>
        <Text>Tags for image</Text>
        {this.props.route.photoTags.map((tag) => <Text key={tag}>{tag}</Text>)}
      </View>
    );
  }
}

export { ScoringView };
