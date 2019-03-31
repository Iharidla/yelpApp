import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CategoryItem = ({item, index, onPress}) => (
  <View style={styles.GridViewContainer}>
    <Text style={[styles.GridViewTextLayout, index % 3 !== 0 && {borderLeftWidth: 1, borderLeftColor: 'red'}]} onPress={onPress} > {item.text} </Text>
  </View>
);

const styles = StyleSheet.create({
  GridViewContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 5,
    backgroundColor: '#7B1FA2'
  },
  GridViewTextLayout: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: '#fff',
    padding: 10,
  }
  

});

export default CategoryItem;