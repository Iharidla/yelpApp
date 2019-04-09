import PropTypes from 'prop-types';
import React from 'react';
import {View, TextInput} from "react-native";
import Icon from "react-native-ionicons";

import styles from './styles';
import Autocomplete from "./Autocomplete";

const SearchBar = ({
  onChangeText,
  onSubmitEditing,
  icon='search',
  onTouchStart,
  text = '',
  autoFocus = false,
  onEndEditing,
  onFocus,
  iconPress,
  autocompleteData,
  isAutocompleteVisible,
}) => (
  <View style={styles.container}>
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
    { autocompleteData && isAutocompleteVisible ?
      <Autocomplete
        data={autocompleteData}
        onPress={onSubmitEditing}
      /> : null}
  </View>
);

SearchBar.propTypes = {
  text: PropTypes.string,
  icon:PropTypes.string,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onFocus: PropTypes.func,
  onTouchStart: PropTypes.func,
  autoFocus: PropTypes.bool,
  onEndEditing: PropTypes.func,
  iconPress: PropTypes.func,
  autocompleteData: PropTypes.array,
  isAutocompleteVisible: PropTypes.bool,
};

export default SearchBar;
