import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native';

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
    margin: 3,
    flex: 3,
    justifyContent: 'center'
  },
  listImage: {
    height: 75
  },
  listText: {
    fontSize: 17
  }
});

const ArtifactListItemView = (props) => (
    <TouchableHighlight
      underlayColor="whitesmoke"
      onPress={ () => props.handleArtifactView(props.rowData.date, props.rowData.imagePath, props.rowData.name, props.rowData.text, props.rowData.tags) } >
  <View style={styles.rowContainer}>
    <View style={styles.imageContainer}>
      <Image source={{uri: props.rowData.imagePath}} style={styles.listImage} />
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.listText}>{props.rowData.name}</Text>
      <Text style={styles.listText}>{props.rowData.text}</Text>
      <Text style={styles.listText}>{props.rowData.date}</Text>
    </View>
  </View>
  </TouchableHighlight>
);

export { ArtifactListItemView };
