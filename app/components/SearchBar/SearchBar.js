import PropTypes from 'prop-types';
import React from 'react';
import {Dimensions, View, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-ionicons";

const width = Dimensions.get('window').width * 0.9;

const SearchBar = ({ onChangeText, onSubmitEditing, icon='search', onTouchStart, text = '', autoFocus = false, onEndEditing, onFocus, iconPress }) => (
  <View style={styles.searchInput}>
    <Icon
      name={icon}
      size={22}
      style={styles.searchIcon}
      color='#bbb'
      onPress={iconPress}
    />
    <TextInput
      style={styles.inputText}
      placeholder={'I\'m looking for...'}
      placeholderTextColor={'#999'}
      underlineColorAndroid={'#fff'}
      value={text}
      onChangeText={onChangeText}
      onSubmitEditing={(event) => onSubmitEditing(event.nativeEvent.text)}
      onTouchStart={onTouchStart}
      autoFocus={autoFocus}
      onEndEditing={onEndEditing}
      onFocus={onFocus}
    />
  </View>
);

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 3,
    height: 45,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10,
    width: width,
  },
  searchIcon: {
    position: 'absolute',
    left: 13,
    top: 12,
  },
  inputText: {
    marginLeft: 43,
    fontSize: 15,
    color: '#999',
  },
});

SearchBar.propTypes = {
  text: PropTypes.string,
  icon:PropTypes.string,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onFocus: PropTypes.func,
};

export default SearchBar;
