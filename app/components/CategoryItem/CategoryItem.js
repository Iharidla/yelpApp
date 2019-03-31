import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from "react-native-ionicons";

const ICON_COLOR = 'black';
const ICON_SIZE = 50;

const CategoryItem = ({item, onPress}) => (
  <View style={styles.GridViewContainer}>
    <Icon name={item.link}
          color={ICON_COLOR}
          size={ICON_SIZE}
          onPress={onPress}
    />
    <Text style={styles.GridViewTextLayout}>{item.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  
  GridViewTextLayout:{
    fontSize: 20,
    textAlign: 'center',
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