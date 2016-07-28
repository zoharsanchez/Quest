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
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Scoring</Text>
        <Image source={{uri: this.props.route.imagePath}}
               style= {{ height:50, width: 50 }}/>
        <Text>Tags for image</Text>
        {this.props.route.photoTags.map((tag) => <Text>{tag}</Text>)}
      </View>
    );
  }
}

export { ScoringView };
