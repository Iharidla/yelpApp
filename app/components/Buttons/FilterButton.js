import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-ionicons';

import styles from './styles';

const FilterButton = ({ text, icon, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <Icon name={icon} size={20} color='white'/>
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

FilterButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  onPress: PropTypes.func,
};

export default FilterButton;
