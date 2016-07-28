import {
  StyleSheet,
  Dimensions
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: 'red',
    borderRadius: 50,
    height: 100,
    width: 100,
    padding: 10,
    justifyContent: 'center',
    margin: 40,
    borderWidth: 5,
    borderColor: 'white'
  },
  goToCameraRoll: {
    borderRadius: 25,
    justifyContent: 'center',
    height: 50,
    width: 50,
    backgroundColor: 'white'
  },
  cameraRollText: {
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  }
});

export { styles };
