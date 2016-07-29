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
    backgroundColor: 'powderblue',
    alignItems: 'stretch'
  },
  contentContainer: {
    margin: 3,
    flex: 3,
    justifyContent: 'center'
  },
  listImage: {
    height: 75
  },
  listText: {
    fontSize: 17
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
    console.log('these are the props from ALV', this.props);
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri: this.props.base64}}/>
        </View>
        
        <View>
          <Text style={styles.listText}>{this.props.route.username}</Text>
        </View>
        <View>
          <Text style={styles.listText}>{this.props.route.date}</Text>
        </View>
        <View>
          <Text style={styles.listText}>{this.props.route.message}</Text>
        </View>
        <View>
          <Text style={styles.listText}>{this.props.route.tags}</Text>
        </View>
      </View>
    );
  }
}

export { ArtifactView };
