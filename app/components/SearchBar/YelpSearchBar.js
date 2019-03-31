import PropTypes from 'prop-types';
import React from 'react';
import { SearchBar } from 'react-native-elements';

const YelpSearchBar = ({ search = '', updateSearch }) => (
  <SearchBar
    round
    searchIcon={{ size: 24 }}
    placeholder="Type Here..."
    onChangeText={updateSearch}
    value={search}
    lightTheme
    inputStyle={{color: 'black'}}
    containerStyle={{width: 300}}
  />
);

YelpSearchBar.propTypes = {
  text: PropTypes.string,
  updateSearch: PropTypes.func,
};

export default YelpSearchBar;
