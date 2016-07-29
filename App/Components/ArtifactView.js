import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex:1
  },
  rowContainer: {
    padding: 10,
    flexDirection: 'row'
  },
  imageContainer: {
    margin: 3,
    flex: 2,
    alignItems: 'stretch'
  },
  contentContainer: {
    margin: 2,
    flex: 3,
    justifyContent: 'center'
  },
  artifactViewImage: {
    flex: 1,
    resizeMode: 'contain'
  },
  artifactViewName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 5,
    marginLeft: 8,
    marginRight: 10
  },
  artifactViewText: {
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 8,
    marginRight: 10,
    marginBottom: 8
  },
  artifactViewDate: {
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'right',
    marginTop: 5,
    marginRight: 8,
  },
  artifactViewTags: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 3,
    marginRight: 10,
    marginBottom: 8
  }
});

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
