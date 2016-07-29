import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 65,
  },
  allTags: {
    paddingTop: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  tagContainer: {
    backgroundColor: '#ef553a',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 5,
    marginRight: 5
  },
  tagText: {
    fontSize: 32
  },
  buttonContainer: {
    flex: 0.15
  },
  button: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: '#ef5350'
  },
  buttonText: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
    color: 'white'
  }
});

export { styles };
