import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#FFF'
  },
  mainImage: {
    height: 400,
    marginTop: 50
  },
  caption: {
    fontSize: 20,
    padding: 10,
    height: 50,
    textAlign: 'left'
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
    justifyContent: 'center',
    paddingTop: 110,
    paddingBottom:30
  },
  buttonText: {
    color: '#FFF',
    fontSize: 30
  }
});

export { styles };
