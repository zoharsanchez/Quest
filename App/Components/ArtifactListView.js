import React, { Component } from 'react';
import {
  ListView,
  Text,
  Image,
  View,
} from 'react-native';
import { styles } from './Styles/ArtifactListStyle';

class ArtifactListView extends Component {

  constructor(props) {
    super(props);
    //ds and dataSource are required to instatiate a ListView component
    //The argument to ListView.DataSource below is boiler-plate provided by React-Native documentation.
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  render() {
    let artifacts = this.props.artifacts;
    let dataSource = this.ds.cloneWithRows(artifacts.map((artifact) => {
      return {
        name: artifact.user,
        date: artifact.timestamp,
        text: artifact.message,
        imagePath: artifact.imagePath
      };
    }));

    return (
      <View style={styles.container}>
        <ListView ref="listView" style={styles.list}
          dataSource={dataSource}
          initialListSize={3}
          scrollRenderAheadDistance={3}
          renderRow={(rowData) => {
            return (
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
            );
          }
        }/>
      </View>
    );
  }
}

export { ArtifactListView };
