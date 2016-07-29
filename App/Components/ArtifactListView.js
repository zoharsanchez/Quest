import React, { Component } from 'react';
import {
  ListView,
  View,
} from 'react-native';
import { styles } from './Styles/ArtifactListStyle';
import { ArtifactListItemView } from './ArtifactListItemView.js';

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
              <ArtifactListItemView images={this.images} rowData={rowData} />
            );
          }
        }/>
      </View>
    );
  }
}

export { ArtifactListView };
