import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1
  },
  rowContainer: {
    padding: 10,
    flexDirection: 'row'
  },
  imageContainer: {
    margin: 3,
    flex: 2,
    alignItems: 'stretch'
  },
  contentContainer: {
    margin: 3,
    flex: 3,
    justifyContent: 'center'
  },
  listImage: {
    height: 75
  },
  listText: {
    fontSize: 17
  },
  headerContainer: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 22,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  image: {
    backgroundColor: 'white',
    height: 145,
    width: 145,
    borderRadius: 30,
    marginTop: 10,
    alignSelf: 'center'
  },
  logout: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
    color: 'white'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#ef5350'
  }
});

export { styles };
