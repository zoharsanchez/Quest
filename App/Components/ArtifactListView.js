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

class ArtifactListView extends Component {

  constructor(props) {
    super(props);
    //ds and dataSource are required to instatiate a ListView component
    //The argument to ListView.DataSource below is boiler-plate provided by React-Native documentation.
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  _handleArtifactView(date, image, name, text, tags) {
    this.props.navigator.push({
      date: date,
      base64: image,
      username: name,
      name: 'ArtifactView',
      message: text,
      tags: tags
    });
  };

  render() {
    let artifacts = this.props.artifacts;

    let dataSource = this.ds.cloneWithRows(artifacts.map((artifact) => {
      return {
        name: artifact.user,
        date: artifact.timestamp,
        text: artifact.message,
        tags: artifact.tags,
        imagePath: artifact.imagePath
      };
    }
    ));

    return (
      <View style={styles.container}>
        <ListView ref="listView" style={styles.list}
          dataSource={dataSource}
          initialListSize={3}
          scrollRenderAheadDistance={3}
          renderRow={(rowData) => {
            return (
              <TouchableHighlight
                underlayColor="whitesmoke"
                onPress={ this._handleArtifactView.bind(this, rowData.date, rowData.imagePath, rowData.name, rowData.text, rowData.tags) } >
              <View style={styles.rowContainer}>
                <View style={styles.imageContainer}>
                  <Image source={{uri: rowData.imagePath}} style={styles.listImage} />
                </View>
                <View style={styles.contentContainer}>
                  <Text style={styles.listText}>{rowData.name}</Text>
                  <Text style={styles.listText}>{rowData.text}</Text>
                  <Text style={styles.listText}>{rowData.date}</Text>
                </View>
              </View>
              </TouchableHighlight>
            );
          }
        }/>
      </View>
    );
  }
}

export { ArtifactListView };
