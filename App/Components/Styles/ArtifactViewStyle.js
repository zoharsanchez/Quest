import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex:1
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
    margin: 2,
    flex: 3,
    justifyContent: 'center'
  },
  artifactViewImage: {
    flex: 1,
    resizeMode: 'contain'
  },
  artifactViewName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 5,
    marginLeft: 8,
    marginRight: 10
  },
  artifactViewText: {
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 8,
    marginRight: 10,
    marginBottom: 8
  },
  artifactViewDate: {
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'right',
    marginTop: 5,
    marginRight: 8,
  },
  artifactViewTags: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 3,
    marginRight: 10,
    marginBottom: 8
  }
});

export { styles };