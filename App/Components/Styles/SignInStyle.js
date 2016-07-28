import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontSize: 60,
    paddingBottom: 40,
    textAlign: 'center',
    fontFamily: 'Bodoni 72 Smallcaps',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  },
  searchInput: {
    height: 50,
    padding: 10,
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    fontSize: 23,
    borderWidth: 2,
    flexDirection: 'row',
    borderColor: 'white',
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center'
  },
  bgImage: { flex: 1,
             justifyContent: 'center',
             resizeMode: 'cover'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  signUp: {
    color: 'white',
    padding: 10,
    textAlign: 'center'
  },
  error: {
    color: '#ef5350',
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  }
});

export { styles };
