import PropTypes from 'prop-types';
import React from 'react';
import { SearchBar } from 'react-native-elements';
import {Dimensions} from "react-native";

const width = Dimensions.get('window').width;

const YelpSearchBar = ({ search = '', updateSearch }) => (
  <SearchBar
    round
    searchIcon={{ size: 24 }}
    placeholder="Type Here..."
    onChangeText={updateSearch}
    value={search}
    lightTheme
    inputStyle={{color: 'black'}}
    containerStyle={{width: width}}
  />
);

YelpSearchBar.propTypes = {
  text: PropTypes.string,
  updateSearch: PropTypes.func,
};

export default YelpSearchBar;
