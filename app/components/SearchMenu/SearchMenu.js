import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import { connect } from "react-redux";
import Icon from 'react-native-ionicons';

import {SearchBar} from "../SearchBar";
import {FilterButton} from '../Buttons';
import {PriceModal} from "../Modals";

class SearchMenu extends Component {
  
  state = {
    text: '',
    position: 'unknown',
    icon: 'search',
    priceModal: false,
    price: '',
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
        this.setState({position});
      },
      (error) => { console.log(error); },
      { enableHighAccuracy: true, timeout: 30000 }
    );

    const { text } = this.props.searchParams;
    if(text != '') {
      this.setState({icon: 'arrow-round-back'});
      this.onSearch(text);
    }
  }
  
  pressNear = () => {
    console.log("near me pressed");
    this.iconPress();
  };
  
  pressFilter = () => {
    console.log("filter pressed");
  };
  
  pressPriceFilter = () => {
    this.setPriceModalVisible(true);
    console.log("price filter pressed");
  };
  
  pressNewOpen = () => {
    console.log("new open pressed");
  };

  onSearch = (text) => {
    console.log(`search text: ${text}`);
    this.fetchData(text)
    this.setState({text});
  };

  onChangeSearch = (text) => {
    this.setState({text});
    console.log(`typed text: ${text}`);
  };

  onEndEditing = () => {
    const {text} = this.state;
    if(text != ''){
      this.setState({icon: 'arrow-round-back'});
    } else {
      this.setState({icon: 'search'});
    }
    console.log(`onEndEditing`);
  };

  onFocus = () => {
    const {text} = this.state;
    if(text != ''){
      this.setState({icon: 'close'});
    }
  };

  iconPress = () => {
    const {icon} = this.state;
    if(icon == 'arrow-round-back'){
      this.props.goBack();
    } else if(icon == 'close') {
      this.setState({text: ''});
      this.setState({icon: 'search'});
    } else {
      return false;
    }
  };

  setPriceModalVisible = (visible) => {
    this.setState({priceModal: visible});
  };

  setPrice = (price) => {
    this.setState({price});
    this.setState({priceModal: false});
  };

  fetchData(term = '') {
    // const lat = this.state.position.coords.latitude || 0;
    // const lng = this.state.position.coords.longitude || 0;
    const lat = 0;
    const lng = 0;
    const consumerKey = "aHkQvkO2mknb811VggwSodBjwyIVF65zfFq463PF9sxC088KEo8DfIkAGth0Pvwt4SnsBS7wMvnB16hJxB0b4m-c1qs5A36awFVek6CBG6c6Mz9tzKsGMDRFvh6aXHYx";
    const location = 'New York';
    // // const term = 'coffee';
    //
    let params = '';
    if(lat !== 0 && lng !== 0) {
      params += `latitude=${lat}&longitude=${lng}`
    } else if(location) {
      params += `location=${location}`
    }
    if(term) {
      params += `&term=${term}`
    }

    console.log(`params: ${params}`);

    const resp = fetch(`https://api.yelp.com/v3/businesses/search?${params}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${consumerKey}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res);
      return res.json();
    }).then((obj) => {
      this.props.setBusinesses(obj.businesses);
    });
    console.log('resp');
    console.log(JSON.stringify(resp));
  }
 
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

    const {searchParams} = this.props;

    console.log(this.state.priceModal);
    
    return (
      <View style={styles.menu}>
        <SearchBar
          onChangeText={this.onChangeSearch}
          onSubmitEditing={this.onSearch}
          text={this.state.text}
          autoFocus={searchParams.autoFocus}
          onEndEditing={this.onEndEditing}
          onFocus={this.onFocus}
          icon={this.state.icon}
          iconPress={this.iconPress}
        />
        <View style={styles.container}>
          <FilterButton text={'Near me'} icon={'compass'} onPress={this.pressNear} />
          <Icon name="map" size={30} color='white' />
        </View>
        <View style={styles.hairline} />
        <View style={styles.container}>
          <FilterButton text={'Filter'} icon={'options'} onPress={this.pressFilter} />
          <FilterButton text={'Price'} icon={'logo-usd'} onPress={this.pressPriceFilter} />
          <FilterButton text={'Now Open'} icon={'clock'} onPress={this.pressNewOpen} />
        </View>

        <PriceModal
          setModalVisible={this.setPriceModalVisible}
          isVisible={this.state.priceModal}
          setPrice={this.setPrice}
        />
      </View>
    );
  }
}

export default connect()(SearchMenu);
