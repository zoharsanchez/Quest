import * as firebase from 'firebase';
import React, { Component } from 'react';
import {
  Text,
  TextInput,
  Image,
  TouchableHighlight
} from 'react-native';
import { styles } from './Styles/SignInStyle';

class SignInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
    this._handleAuth();
  }

  _handleSignIn() {
    let email = this.state.email.trim();
    let password = this.state.password.trim();

    // Firebase method to check user signin
    firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              this._handleAuth();
            })
            .catch((error) => {
              this.setState({ password:'', error: error.message });
            });
  }

  _handleAuth() {
    // Firebase methods to checks if user is logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.addDbListener();
        this._handleToMap();
      }
    });
  }

  _handleToMap() {
    // Resets the stack to MainMainView
    this.props.navigator.resetTo({name: 'MainMapView'});
  }

  _handleToSignUp() {
    // Pushes a SignUp component to the navigator stack
    this.props.navigator.push({name: 'SignUpView'});
  }

  render() {
    return (
      <Image style={ styles.bgImage }
             source={ {uri: 'https://media.giphy.com/media/XWlS8OnV0KEBW/giphy.gif'} }>
        <Text style={ styles.title }>Quest</Text>
        <TextInput
            style={ styles.searchInput }
            value ={ this.state.email }
            onChangeText={ (email) => this.setState( {email}) }
            placeholder='email'/>
        <TextInput
            style={ styles.searchInput }
            secureTextEntry={ true }
            value ={ this.state.password }
            onChangeText={ (password) => this.setState( {password}) }
            placeholder='password'/>
        <TouchableHighlight
            style={ styles.button }
            underlayColor='gray'
            onPress={ this._handleSignIn.bind(this) }>
          <Text style={ styles.buttonText } >Sign In</Text>
        </TouchableHighlight>
        <TouchableHighlight
            onPress={ this._handleToSignUp.bind(this) }>
          <Text style={ styles.signUp }>
            Don't have an account? Sign up here!
          </Text>
        </TouchableHighlight>
        <Text style={styles.error}>{this.state.error}</Text>
      </Image>
    );
  }
}

export { SignInView };
