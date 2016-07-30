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
  completeTagContainer: {
    backgroundColor: '#03a9f4',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 5,
    marginRight: 5,
    opacity: 0.3
  },
  incompleteTagContainer: {
    backgroundColor: '#03a9f4',
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
  completeTagText: {
    fontSize: 32,
    color: 'white',
    textDecorationLine: 'line-through',
    opacity: 0.7

  },
  incompleteTagText: {
    fontSize: 32,
    color: 'white'
  },
  buttonContainer: {
    flex: 0.2
  },
  button: {
    height: 65,
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
