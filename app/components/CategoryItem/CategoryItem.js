import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from "react-native-ionicons";

import styles from './styles';

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

export default CategoryItem;