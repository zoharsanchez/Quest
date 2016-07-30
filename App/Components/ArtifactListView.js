import React, { Component } from 'react';
import {
  ListView,
  View,
  TouchableHighlight
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
    console.log('list', this.props);
    let artifacts = this.props.artifacts;

    let dataSource = this.ds.cloneWithRows(artifacts.map((artifact) => {
      return {
        name: artifact.user,
        date: artifact.timestamp,
        text: artifact.message,
        tags: artifact.tags,
        imagePath: artifact.url
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
              <ArtifactListItemView rowData={rowData} handleArtifactView={this._handleArtifactView.bind(this)}/>
            );
          }
        }/>
      </View>
    );
  }
}

export { ArtifactListView };
