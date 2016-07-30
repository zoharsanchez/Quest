import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  topHalfContainer: {
    flex: 0.55,
    flexDirection: 'row'
  },
  scoreContainer: {
    flex: 0.8,
    fontSize: 20,
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1
  },
  tagsContainer: {
    paddingTop: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  tagExploding: {
    backgroundColor: 'red',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 5,
    marginRight: 5,
    opacity: 1
  },
  tagDone: {
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
  tagNotDone: {
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
    opacity: 1
  },
  tagTextNotDone: {
    fontSize: 20,
    color: 'white'
  },
  tagTextDone: {
    fontSize: 20,
    color: 'white',
    textDecorationLine: 'line-through'
  },
  tagTextExploding: {
    fontSize: 20,
    color: 'white',
    textDecorationLine: 'line-through',
    opacity: 0.9
  },
  scoreText: {
    fontSize: 20
  },
  scoreboard: {
    fontSize: 24
  },
  image: {
    height: 220,
    width: 210
  },
  buttonContainer: {
    flex: 0.38
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
  },

  invisButtonContainer: {
    flex: 0.2
  },
  invisButton: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: '#ef5350',
    opacity: 0
  }
});

export { styles };
