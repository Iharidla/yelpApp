import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Icon from 'react-native-ionicons';
import DateTimePicker from "react-native-modal-datetime-picker";

import {SearchBar} from "../SearchBar";
import {FilterButton} from '../Buttons';
import {PriceModal, FiltersModal, PlaceModal} from "../Modals";

import styles from './styles';


class SearchMenu extends Component {
  static propTypes = {
    setBusinesses: PropTypes.func,
    goBack: PropTypes.func,
    searchParams: PropTypes.object,
    backgroundColor: PropTypes.string,
    setFetching: PropTypes.func,
  };
  
  state = {
    text: '',
    position: {
      latitude: null,
      longitude: null,
    },
    location: '',
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
    isPriceModalVisible: false,
    isFiltersModalVisible: false,
    isDateTimePickerVisible: false,
    isPlaceModalVisible: false,
  };

  componentDidMount = () => {
    const { text } = this.props.searchParams;
    let {position} = this.state;
    navigator.geolocation.getCurrentPosition((geolocation) => {
        position = geolocation.coords;
        this.setState({position});
        if(text) {
          this.setState({icon: 'arrow-round-back'});
          this.onSearch(text);
        }
      },
      (error) => { console.log(error); },
      { enableHighAccuracy: true, timeout: 30000 }
    );
  };

  onSearch = (text) => {
    this.setState({text});
    this.fetchData();
  };

  onChangeSearch = (text) => this.setState({text});

  onEndEditing = () => {
    const {text} = this.state;
    if(text != ''){
      this.setState({icon: 'arrow-round-back'});
    } else {
      this.setState({icon: 'search'});
    }
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

  setPriceModalVisible = (visible) => this.setState({isPriceModalVisible: visible});

  setPrice = (price) => {
    this.setPriceFilter(price)
    this.setPriceModalVisible(false);
  };

  setFiltersModalVisible = (visible) => this.setState({isFiltersModalVisible: visible});
  
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
      filters.orderBy.time.at = null;
    }

    this.setState({filters});
    this.fetchData();
  };

  setTimeAt = (date) => {
    const title = 'open_at';
    const time = date.valueOf()/1000;
    let filters = {...this.state.filters};

    filters.orderBy.time.title = title;
    filters.orderBy.time.at = time;

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

  setDateTimePickerVisible = (visible) => this.setState({ isDateTimePickerVisible: visible });

  setPlaceModalVisible = (visible) => this.setState({ isPlaceModalVisible: visible });

  setLocation = (location) => {
    this.setState({location});
    this.fetchData();
  };

  handlePosition = () => {
    this.setPosition();
    this.fetchData();
  };

  setPosition = () => {
    let {position} = this.state;
    navigator.geolocation.getCurrentPosition((geolocation) => {
        console.log(`coord:`);
        console.log(geolocation);
        position = geolocation.coords;
        this.setState({position});
      },
      (error) => { console.log(error); },
      { enableHighAccuracy: true, timeout: 30000 }
    );
  };

  fetchData = () => {
    const consumerKey = "aHkQvkO2mknb811VggwSodBjwyIVF65zfFq463PF9sxC088KEo8DfIkAGth0Pvwt4SnsBS7wMvnB16hJxB0b4m-c1qs5A36awFVek6CBG6c6Mz9tzKsGMDRFvh6aXHYx";
    const {latitude, longitude} = this.state.position;
    const {orderBy, sortBy} = this.state.filters;
    const {text, location} = this.state;
    const {setFetching} = this.props;

    setFetching(true);

    console.log(`ren fetch, long: ${longitude}`);

    let params = '';

    if(latitude != null && longitude != null) {
      params += `latitude=${latitude}&longitude=${longitude}`
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

    console.log(`params ${params}`);

    const resp = fetch(`https://api.yelp.com/v3/businesses/search?${params}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${consumerKey}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json();
    }).then((obj) => {
      this.props.setBusinesses(obj.businesses);
    }).then( (obj)=>{
      setFetching(false);
    });
  };
 
  render() {
    const {searchParams, backgroundColor} = this.props;
    const {
      text,
      icon,
      isFiltersModalVisible,
      filters,
      isPriceModalVisible,
      isDateTimePickerVisible,
      isPlaceModalVisible,
      location
    } = this.state;
    
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
          <FilterButton text={'Location'} icon={'compass'} onPress={() => this.setPlaceModalVisible(true)} />
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
          isVisible={isFiltersModalVisible}
          setPrice={this.setPriceFilter}
          setSortBy={this.setSortBy}
          filters={filters}
          setTimeNow={this.setTimeNow}
          backgroundColor={backgroundColor}
          openDateTimePicker={this.setDateTimePickerVisible}
        />

        <PriceModal
          setModalVisible={this.setPriceModalVisible}
          isVisible={isPriceModalVisible}
          setPrice={this.setPrice}
          current={filters.orderBy.price}
          backgroundColor={backgroundColor}
        />

        <PlaceModal
          setPlaceModalVisible={this.setPlaceModalVisible}
          isVisible={isPlaceModalVisible}
          city={location}
          onSubmitEditing={this.setLocation}
          backgroundColor={backgroundColor}
          setPosition={this.handlePosition}
        />

        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={(date) => this.setTimeAt(date)}
          onCancel={() => this.setDateTimePickerVisible(false)}
          mode='datetime'
        />
      </View>
    );
  }
}

export default SearchMenu;
