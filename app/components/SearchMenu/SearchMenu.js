import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import { connect } from "react-redux";
import Icon from 'react-native-ionicons';

import {SearchBar} from "../SearchBar";
import {FilterButton} from '../Buttons';
import {PriceModal, FiltersModal} from "../Modals";

class SearchMenu extends Component {
  
  state = {
    text: '',
    position: 'unknown',
    icon: 'search',
    filters: {
      sortBy: 'best_match',
      orderBy: {
        price: null,
        time: {
          title: '',
          at: null,
        }
      },
    },
    priceModal: false,
    filtersModal: false,
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

  onSearch = (text) => {
    console.log(`search text: ${text}`);
    this.setState({text});
    this.fetchData();
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
    this.setPriceFilter(price)
    this.setPriceModalVisible(false);
  };

  setFiltersModalVisible = (visible) => {
    this.setState({filtersModal: visible});
  };
  
  setPriceFilter = (price) => {
    let filters = {...this.state.filters};

    if(filters.orderBy.price == price){
      filters.orderBy.price = null;
    } else {
      filters.orderBy.price = price;
    }

    this.setState({filters});
    this.fetchData();
  };

  setTimeNow = () => {
    const title = 'open_now';
    let filters = {...this.state.filters};

    if(filters.orderBy.time.title == title){
      filters.orderBy.time.title = '';
    } else {
      filters.orderBy.time.title = title;
    }

    this.setState({filters});
    this.fetchData();
  };
  
  setSortBy = (sortBy) => {
    let filters = {...this.state.filters};

    if(filters.sortBy == sortBy){
      filters.sortBy = 'best_match';
    } else {
      filters.sortBy = sortBy;
    }

    this.setState({filters});
    this.fetchData();
  };

  fetchData = () => {
    // const lat = this.state.position.coords.latitude || 0;
    // const lng = this.state.position.coords.longitude || 0;
    const lat = 0;
    const lng = 0;
    const consumerKey = "aHkQvkO2mknb811VggwSodBjwyIVF65zfFq463PF9sxC088KEo8DfIkAGth0Pvwt4SnsBS7wMvnB16hJxB0b4m-c1qs5A36awFVek6CBG6c6Mz9tzKsGMDRFvh6aXHYx";
    const location = 'New York';
    // // const term = 'coffee';
    //
    const {orderBy, sortBy} = this.state.filters;
    const {text} = this.state;

    let params = '';

    if(lat !== 0 && lng !== 0) {
      params += `latitude=${lat}&longitude=${lng}`
    } else if(location) {
      params += `location=${location}`
    }
    if(text!='') {
      params += `&term=${text}`
    }
    if(sortBy!=''){
      params += `&sort_by=${sortBy}`
    }
    if(orderBy.price!=null){
      params += `&price=${orderBy.price}`
    }
    if(orderBy.time.at!=null){
      params += `&open_at=${orderBy.time.at}`
    } else if(orderBy.time.title != ''){
      params += `&open_now=true`
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

    const {searchParams, primaryColor} = this.props;

    const {text, icon, filtersModal, filters, priceModal} = this.state;

    console.log(`filters: ${JSON.stringify(filters)}`);
    
    return (
      <View style={styles.menu}>
        <SearchBar
          onChangeText={this.onChangeSearch}
          onSubmitEditing={this.onSearch}
          text={text}
          autoFocus={searchParams.autoFocus}
          onEndEditing={this.onEndEditing}
          onFocus={this.onFocus}
          icon={icon}
          iconPress={this.iconPress}
        />
        <View style={styles.container}>
          <FilterButton text={'Near me'} icon={'compass'} onPress={this.pressNear} />
          <Icon name="map" size={30} color='white' />
        </View>
        <View style={styles.hairline} />
        <View style={styles.container}>
          <FilterButton text={'Filter'} icon={'options'} onPress={() => this.setFiltersModalVisible(true)} />
          <FilterButton text={'Price'} icon={'logo-usd'} onPress={() => this.setPriceModalVisible(true)} />
          <FilterButton text={'Now Open'} icon={'clock'} onPress={() => this.setTimeNow()} />
        </View>

        <FiltersModal
          setModalVisible={this.setFiltersModalVisible}
          isVisible={filtersModal}
          setPrice={this.setPriceFilter}
          setTime={this.setTimeFilter}
          setSortBy={this.setSortBy}
          filters={filters}
          setTimeNow={this.setTimeNow}
          backgroundColor={primaryColor}
        />

        <PriceModal
          setModalVisible={this.setPriceModalVisible}
          isVisible={priceModal}
          setPrice={this.setPrice}
          current={filters.orderBy.price}
          backgroundColor={primaryColor}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error,
  };
};

export default connect(mapStateToProps)(SearchMenu);
