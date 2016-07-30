// import all components into index.ios so it can be references by the Navigator
import React, { Component } from 'react';
import { SignInView } from './App/Components/SignInView';
import { SignUpView } from './App/Components/SignUpView';
import { MainMapView } from './App/Components/MainMapView';
import { ProfileView } from './App/Components/ProfileView';
import { ArtifactView } from './App/Components/ArtifactView';
import { ArtifactListView } from './App/Components/ArtifactListView';
import { CameraView } from './App/Components/CameraView';
import { SubmitImageView } from './App/Components/SubmitImageView';
import { ScoringView } from './App/Components/ScoringView';
import { TagsView } from './App/Components/TagsView';
import { GameOverView } from './App/Components/GameOverView';
import {
  AppRegistry,
  Navigator,
  Text,
  TouchableHighlight
} from 'react-native';
import { styles } from './App/Components/Styles/IndexStyle';

// Suppress yellow warnings
console.disableYellowBox = true;

// Initialize Firebase
import * as firebase from 'firebase';
import * as _ from 'lodash';
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
  SubmitImageView: SubmitImageView,
  ScoringView: ScoringView,
  TagsView: TagsView,
  GameOverView: GameOverView
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
  SubmitImageView: 'Submit Artifact',
  TagsView: 'Tags'
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

class Quest extends Component {
  constructor(props) {
    super(props);
    this.dbRef = firebaseApp.database().ref('artifacts');
    this.storageRef = firebaseApp.storage().ref();
    this.userRef = firebaseApp.database();

    this.state = {
      artifacts: [],
      currentTags: [],
      gameScore: 0,
      picCount: 0
    };
  }

  changeTags(newTags) {
    this.setState({currentTags: newTags});
  }

  updateGame(score, pics) {
    this.setState({ gameScore: score, picCount: pics });
  }

  generateNewTags() {
    // This will be called from within TagsView...how it works TBD
    console.log('hello!');
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
          tags: artifact.tags,
          imagePath: artifact.url
        });
      });

      // Sort by timestamp in descending (reverse chronological) order
      parsedItems.sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
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

    let user = firebase.auth().currentUser;
    this.userRef.ref('users/' + user.displayName.toLowerCase()/* + '/currentTags'*/).once('value', (data) => {
      // let currentTags = data.val();
      let currentTags = data.val().currentTags;
      let gameScore = data.val().gameScore;
      let picCount = data.val().picCount;
      if (currentTags !== null) {
        this.setState({
          currentTags: currentTags,
          gameScore: gameScore,
          picCount: picCount
        });
        console.log('initiated', this.state.currentTags, this.state.gameScore, this.state.picCount);
      } else {
        this.userRef.ref('tags').once('value', (rawTags) => {
          let tagsObj = rawTags.val();
          let tags = Object.keys(tagsObj);
          let newTags = _.sampleSize(tags, 20);
          console.log(newTags);
          let newState = _.map(newTags, (tag) => {return {tag: tag, done: false}; });
          this.setState({
            currentTags: newState,
            gameScore: 0,
            picCount: 0
          });
          this.userRef.ref('users/' + user.displayName.toLowerCase()).set({
            currentTags: newState,
            gameScore: 0,
            picCount: 0
          });

        });
      }
    });


  }


  // Core piece of the Navigator: pass the props and renders the next component
  renderScene(route, navigator) {
    let CurrentComponent = ROUTES[route.name];
    let path = route.path || null;
    let base64 = route.base64 || null;
    return (
      <CurrentComponent
      route={route}
      path={path}
      base64={base64}
      artifacts={this.state.artifacts}
      currentTags={this.state.currentTags}
      gameScore={this.state.gameScore}
      picCount={this.state.picCount}
      changeTags={this.changeTags.bind(this)}
      updateGame={this.updateGame.bind(this)}
      addDbListener={this.addDbListener.bind(this)}
      generateNewTags={this.generateNewTags.bind(this)}
      dbRef={this.dbRef}
      userRef={this.userRef}
      storageRef={this.storageRef}
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
        configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
        navigationBar={
          <Navigator.NavigationBar
          routeMapper={ NavigationBarRouteMapper }
          style={ styles.navBar } />
        }
      />
    );
  }
}

// Only needed in index.ios for app registration
AppRegistry.registerComponent('quest', () => Quest);
