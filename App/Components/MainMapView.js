import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  MapView
} from 'react-native';
import { styles } from './Styles/MainMapStyle';

class MainMapView extends Component {

  constructor(props) {
    super(props);

    //Initialize the map center point and zoom level to San Francisco.
    //Annotations will be set to a different value in componentDidMount().
    this.state = {
      region: {
        latitude: 37.74825,
        longitude: -122.4224,
        latitudeDelta: 0.1922,
        longitudeDelta: 0.0421
      }
    };
  }

  _handleNextPage(componentName) {
    this.props.navigator.push({name: componentName});
  }

  //In the MapView component, pins are represented by elements in the annotations array.
  render() {
    let artifacts = this.props.artifacts;
    let annotations = artifacts.map((artifact) => {
      return {
        latitude: artifact.latitude,
        longitude: artifact.longitude,
        title: artifact.user,
        subtitle: artifact.message
      };
    });

    return (
      <View style={styles.mapContainer}>
        <MapView
            style={styles.map}
            showsUserLocation={true}
            region={this.state.region}
            annotations={annotations}
        />

        <View style={styles.bottomNav}>

          <TouchableHighlight onPress={() => this._handleNextPage('ProfileView')}>
            <View style={styles.bottomNavButton}>
              <Text style={styles.buttonText}>Profile</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this._handleNextPage('CameraView')}>
            <View style={styles.bottomNavButton}>
              <Text style={styles.buttonText}>Add Artifact</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this._handleNextPage('ArtifactListView')}>
            <View style={styles.bottomNavButton}>
              <Text style={styles.buttonText}>List View</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this._handleNextPage('ArtifactListView')}>
            <View style={styles.bottomNavButton}>
              <Text style={styles.buttonText}>Tags</Text>
            </View>
          </TouchableHighlight>

        </View>
      </View>
    );
  }
}

export {MainMapView};
