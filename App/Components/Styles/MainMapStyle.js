import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mapContainer: {
    flex:1
  },
  bottomNav: {
    flex:2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#48BBEC',
    fontSize: 18,
    textAlign: 'center'
  },
  map: {
    height:400,
    flex: 5
  },
  bottomNavButton: {
    flex:1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#48BBEC',
    padding: 10,
    margin: 2
  }
});

export { styles };
