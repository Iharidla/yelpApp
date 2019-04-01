import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import { connect } from "react-redux";
import Icon from 'react-native-ionicons';

import {SearchBar} from "../SearchBar";
import {FilterButton} from '../Buttons';

class SearchMenu extends Component {
  
  state = {
    text: '',
  };
  
  updateSearch = (text) => {
    const {fetchData} = this.props;
    console.log(`search text: ${text}`);
    fetchData(text);
    this.setState({text});
  };
  
  pressNear = () => {
    console.log("near me pressed");
  };
  
  pressFilter = () => {
    console.log("filter pressed");
  };
  
  pressPriceFilter = () => {
    console.log("price filter pressed");
  };
  
  pressNewOpen = () => {
    console.log("new open pressed");
  };
 
  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        width: '80%',
        alignItems: 'center',
      },
      hairline: {
        backgroundColor: 'white',
        height: 1,
        width: '90%',
      },
      menu: {
        marginTop: 15,
        alignItems: 'center',
      }
    });
    
    return (
      <View style={styles.menu}>
        <SearchBar updateSearch={this.updateSearch} search={this.state.text}/>
        <View style={styles.container}>
          <FilterButton text={'Near me'} icon={'compass'} onPress={() => this.pressNear} />
          <Icon name="map" size={30} color='white' />
        </View>
        <View style={styles.hairline} />
        <View style={styles.container}>
          <FilterButton text={'Filter'} icon={'options'} onPress={() => this.pressFilter} />
          <FilterButton text={'Price'} icon={'logo-usd'} onPress={() => this.pressPriceFilter} />
          <FilterButton text={'Now Open'} icon={'clock'} onPress={() => this.pressNewOpen} />
        </View>
      </View>
    );
  }
}

export default connect()(SearchMenu);
