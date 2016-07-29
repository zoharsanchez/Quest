import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native';
import { styles } from './Styles/ArtifactListItemViewStyle';

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
