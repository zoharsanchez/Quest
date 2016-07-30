import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  scoreContainer: {
    backgroundColor: 'blue',
    flex: 0.2
  },
  imageContainer: {
    backgroundColor: 'pink',
    flex: 0.3
  },
  tagsContainer: {
    paddingTop: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  tagContainer: {
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
  },
  tagsText: {

  },
  image: {
    height: 150,
    width: 150
  }
});

export { styles };
