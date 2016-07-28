// import all components into index.ios so it can be references by the Navigator
import * as firebase from 'firebase';
import React, { Component } from 'react';
import { SignInView } from './App/Components/SignInView';
import { SignUpView } from './App/Components/SignUpView';
import { MainMapView } from './App/Components/MainMapView';
import { ProfileView } from './App/Components/ProfileView';
import { ArtifactView } from './App/Components/ArtifactView';
import { ArtifactListView } from './App/Components/ArtifactListView';
import { CameraView } from './App/Components/CameraView';
import { CameraRollView } from './App/Components/CameraRollView';
import { SubmitImageView } from './App/Components/SubmitImageView';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  TouchableHighlight
} from 'react-native';

// Initialize Firebase
import { ENV } from './environment/environment';
const firebaseApp = firebase.initializeApp(ENV);

// ROUTES is a reference to the component being rendered in renderScene
const ROUTES = {
  SignInView: SignInView,
  SignUpView: SignUpView,
  MainMapView: MainMapView,
  ProfileView: ProfileView,
  ArtifactView: ArtifactView,
  ArtifactListView: ArtifactListView,
  CameraView: CameraView,
  CameraRollView: CameraRollView,
  SubmitImageView: SubmitImageView
};

// TITLES is a reference to the NavigationBarRouterMapper
const TITLES = {
  SignInView: 'Sign In',
  SignUpView: 'Sign Up',
  MainMapView: 'Map',
  ProfileView: 'Profile',
  ArtifactView: 'Artifact',
  ArtifactListView: 'Artifact List',
  CameraView: 'Camera',
  CameraRollView: 'Camera Roll',
  SubmitImageView: 'Submit Artifact'
};

// Renders the title of the NavBar
const NavigationBarRouteMapper = {
  Title: (route, navigator, index, navState) => {
    let title = TITLES[route.name];
    return (<Text style={styles.title}>{title}</Text>); 
  },
  LeftButton: (route, navigator, index, navState) => {
    if (index === 0) {
      return null;
    } else {
      return (
        <TouchableHighlight 
          underlayColor="whitesmoke"
          onPress={() => navigator.pop()}>
          <Text style={styles.back}>Back</Text>
        </TouchableHighlight>
      );
    }
  },
  RightButton: (route, navigator, index, navState) => {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navBar: {
    backgroundColor: '#F9F9F9'
  },
  title: {
    fontSize: 20,
    padding: 10
  },
  back: {
    fontSize: 20,
    color: '#03a9f4',
    padding: 10
  }
});

class Quest extends Component {
  constructor(props) {
    super(props)
    this.dbRef = firebaseApp.database().ref(),
    this.storageRef = firebaseApp.storage().ref() 

    this.state = {
      artifacts: []
    }
  }

  addDbListener() {
    // Register a listener to the Firebase database reference. The listener 
    // grabs all data in the db at initialization, and picks up any database 
    // updates. The event listener returns a value "snapshot" from Firebase, 
    // which is a current snapshot of the db.
    this.dbRef.on('value', (snapshot) => {
      let parsedItems = [];

      snapshot.forEach((rawArtifact) => {
        let artifact = rawArtifact.val();
        // Transform data from Firebase into objects the ListView is expecting
        parsedItems.push({
          user: artifact.user,
          timestamp: artifact.timestamp,
          message: artifact.message,
          latitude: artifact.latitude,
          longitude: artifact.longitude,
          imagePath: artifact.base64
        });
      });

      // Sort by timestamp in descending (reverse chronological) order
      parsedItems.sort((a, b) => {
        if(a.date > b.date) {
          return -1;
        }
        if(a.date < b.date) {
          return 1;
        }
        return 0;
      });

      // Convert dates from UNIX timestamps to human-readable
      parsedItems.forEach((item) => {
        let stringDate = (new Date(item.timestamp)).toString().substring(0, 24);
        item.timestamp = stringDate;
      });
      
      // Update State
      this.setState({
        artifacts: parsedItems
      });
    });
  }

  // Core piece of the Navigator: pass the props and renders the next component
  renderScene(route, navigator) {
    let Component = ROUTES[route.name];
    let path = route.path || null;
    let base64 = route.base64 || null;
    return (
      <Component
        route={route}
        path={path}
        base64={base64}
        artifacts={this.state.artifacts}
        dbRef={this.dbRef}
        storageRef={this.storageRef}
        addDbListener={this.addDbListener.bind(this)}
        navigator={navigator} />
    );
  }

  render() {
    // The single main navigation component that controls the routes to other views
    // The Navigator is like a stack you can push and pop views as well as reset it completely
    return (
      <Navigator
        initialRoute={ {name: 'SignInView', index: 0} } 
        style={ styles.container }
        renderScene={ this.renderScene.bind(this) }
        configureScene={ () => {return Navigator.SceneConfigs.FloatFromRight} }
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={ NavigationBarRouteMapper }
            style={ styles.navBar } />
        } />
    );
  }
}

// Only needed in index.ios for app registration 
AppRegistry.registerComponent('quest', () => Quest);
