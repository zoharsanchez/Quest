import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  AlertIOS,
  StyleSheet,
  Text,
  Image,
  NativeModules,
  View,
  NavigatorIOS,
  TouchableHighlight,
  TouchableWithoutFeedback,
  MapView
} from 'react-native';

const styles = StyleSheet.create({
  mapContainer: {
    flex:1
  }, 
  bottomNav: { 
    flex:2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  map: {
    height:400,
    flex: 5
  },
  bottomNavButton: {
    flex:1,
    backgroundColor: "#d3d3d3",
    alignItems: 'center',
    borderWidth: 1
  }
});

class MainMapView extends Component {

  constructor(props) {
    super(props)

    this.state = {
      region: {
        latitude: 37.74825,
        longitude: -122.4224,
        latitudeDelta: 0.1922,
        longitudeDelta: 0.0421
      }, 
      annotations : []
    } 
  }

  componentDidMount() {

    this.props.dbRef.on('value', (snapshot) => {

      var parsedItems = [];
      snapshot.forEach((rawArtifact) => {
        var artifact = rawArtifact.val();

        parsedItems.push({
          latitude: artifact.latitude,
          longitude: artifact.longitude,
          title: artifact.user,
          subtitle: artifact.message
        });
      });

      this.setState({
        annotations: parsedItems
      });

    });
  }
  
  _handleNextPage(componentName) {
    this.props.navigator.push({name: componentName});
  }

  componentWillUnmount() {
     this.props.dbRef.off();
   }

  render() {
    return (
      <View style={styles.mapContainer}>
          <MapView
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
          annotations={this.state.annotations}
          />
          <View style={styles.bottomNav}>

            <TouchableWithoutFeedback onPress={() => this._handleNextPage('ProfileView')}>
              <View style={styles.bottomNavButton}>
                <Text>Button: Go to Profile</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() =>
              AlertIOS.alert(
                'Add an Artifact',
                'What kind of artifact would you like to add?',
                 [
                   {text: 'Picture', onPress: () => this._handleNextPage('CameraView')},
                   {text: 'Message', onPress: () => this._handleNextPage('DropView')},
                 ],
              )}>
              <View style={styles.bottomNavButton}>
                <Text>Button: Add Artifact</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this._handleNextPage('CameraRollView')}>
              <View style={styles.bottomNavButton}>
                <Text>Button: Camera Roll</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this._handleNextPage('ArtifactListView')}>
              <View style={styles.bottomNavButton}>
                <Text>Button: Go to List View</Text>
              </View>
            </TouchableWithoutFeedback>

          </View>
      </View>
    );
  }
}

export {MainMapView};