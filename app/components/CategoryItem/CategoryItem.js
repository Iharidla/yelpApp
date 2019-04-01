import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from "react-native-ionicons";

const ICON_COLOR = 'white';
const ICON_SIZE = 50;

const CategoryItem = ({item, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.GridViewContainer}>
    <Icon name={item.link}
          color={ICON_COLOR}
          size={ICON_SIZE}
    />
    <Text style={styles.GridViewTextLayout}>{item.text}</Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  GridViewTextLayout:{
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  GridViewContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 30,
    margin: 5,
  }
});

export default CategoryItem;