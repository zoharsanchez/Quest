import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native';
import { styles } from './Styles/ArtifactViewStyle';

class ArtifactView extends Component {

  constructor(props) {
    super(props);
    //ds and dataSource are required to instatiate a ListView component
    //The argument to ListView.DataSource below is boiler-plate provided by React-Native documentation.
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  // If back button doesn't work, use
  _handleArtifactListView() {
    this.props.navigator.resetTo({name: 'ArtifactListView'});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.artifactViewImage} source={{uri: this.props.base64}}/>
        </View>
        <View>
          <Text style={styles.artifactViewName}>{this.props.route.username} <Text style={styles.artifactViewDate}>{this.props.route.date}</Text></Text>
        </View>
        <View>
          <Text style={styles.artifactViewText}>{this.props.route.message}</Text>
        </View>
        <View>
          <Text style={styles.artifactViewTags}>Tags:</Text>
          <Text style={styles.artifactViewTags}>{this.props.route.tags}</Text>
        </View>
      </View>
    );
  }
}

export { ArtifactView };
