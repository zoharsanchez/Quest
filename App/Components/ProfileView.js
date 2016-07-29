import * as firebase from 'firebase';
import React, { Component } from 'react';
import {
  ListView,
  Image,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import * as _ from 'lodash';
import { styles } from './Styles/ProfileStyle';

class ProfileView extends Component {

  constructor(props) {
    super(props);
    this.user = firebase.auth().currentUser;
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  _handleLogOut() {
    // Firebase method for user signout
    firebase.auth().signOut().then(() => {
      this.props.navigator.resetTo({name: 'SignInView'});
    },(error) => {
      console.log(error);
    });
  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Image
          style={styles.image}
          source={{uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1685-200.png'}} />
        <Text style={styles.name}> {this.user.displayName} </Text>
        <TouchableHighlight
          style={ styles.button }
          underlayColor="gray"
          onPress={ this._handleLogOut.bind(this) }>
          <Text style={ styles.logout }>logout</Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    let artifacts = this.props.artifacts;
    let dataSource = artifacts.map((artifact) => {
      return {
        name: artifact.user,
        date: artifact.timestamp,
        text: artifact.message,
        imagePath: artifact.imagePath
      };
    });
    dataSource = _.filter(dataSource, (artifact) => {return artifact.name === this.user.displayName;});
    dataSource = this.ds.cloneWithRows(dataSource);

    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource}
          initialListSize={3}
          scrollRenderAheadDistance={3}
          renderHeader={this.renderHeader.bind(this)}
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

export { ProfileView };
