import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#FFF'
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    margin: 5
  },
  textSample: {
    fontSize: 50,
    color: 'black'
  },
  highlight: {
    width: 100,
    height: 100
  },
  bottomNav: {
    flex:2,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  bottomNavButton: {
    flex:1,
    backgroundColor: '#24CE84',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 30
  },
  buttonText: {
    color: '#FFF',
    fontSize: 30
  }
});

export { styles };
