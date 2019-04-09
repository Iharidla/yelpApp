import React, { Component } from 'react';
import PropTypes from "prop-types";
import {View, TextInput} from 'react-native';
import Modal from "react-native-modal";
import Icon from "react-native-ionicons";

import { FilterButton } from "../Buttons";

import styles from "./styles";
import places from "../../data/places";
import Autocomplete from "../SearchBar/Autocomplete";

class PlaceModal extends Component {
  static propTypes = {
    setPlaceModalVisible: PropTypes.func,
    isVisible: PropTypes.bool,
    setPosition: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    city: PropTypes.string,
    backgroundColor: PropTypes.string,
  };

  state = {
    text: '',
    cities: places,
    isAutocompleteVisible: false,
  };

  setText = (text) => {
    this.setState({text}, function () {
      this.filterCities()
    });
  };

  filterCities = () => {
    const {text} = this.state;
    const reg = new RegExp(`^${text}`, 'iu');
    const cities = places.filter(city => {
      return reg.test(city.text);
    });
    this.setState({cities});
  };

  onSubmitEditing = (text) => {
    const {setPlaceModalVisible, onSubmitEditing} = this.props;
    setPlaceModalVisible(false);
    this.setState({text: ''});
    onSubmitEditing(text);
  };

  setPosition = () => {
    const {setPlaceModalVisible, setPosition} = this.props;
    setPlaceModalVisible(false);
    setPosition();
  };

  setAutocompleteVisible = (visible) => this.setState({isAutocompleteVisible: visible});

  render() {
    const {setPlaceModalVisible, isVisible, backgroundColor} = this.props;

    let {city} = this.props;

    const {cities, isAutocompleteVisible} = this.state;

    if(city==''){
      city='Write city...'
    }

    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setPlaceModalVisible(false)}
        onSwipeComplete={() => setPlaceModalVisible(false)}
        swipeDirection="up"
      >
        <View style={styles.container}>
          <View style={[styles.roundContainer, { backgroundColor: backgroundColor, }]}>
            <View style={styles.placeContainer}>
              <View style={styles.searchContainer}>
                <Icon
                  name='compass'
                  size={22}
                  color='white'
                  style={styles.placeIcon}
                />
                <TextInput
                  style={styles.textInput}
                  textContentType='addressCity'
                  placeholder={city}
                  placeholderTextColor={'#999'}
                  underlineColorAndroid={'#fff'}
                  onChange={(event) => this.setText(event.nativeEvent.text)}
                  onSubmitEditing={(event) => this.onSubmitEditing(event.nativeEvent.text)}
                  value={this.state.text}
                  onFocus={() => this.setAutocompleteVisible(true)}
                />
              </View>
              <View style={{justifyContent: 'flex-end', width: '100%'}}>
                { cities && isAutocompleteVisible ?
                  <Autocomplete
                    data={cities.slice(0, 4)}
                    onPress={this.onSubmitEditing}
                    width={styles.textInput.width}
                  /> : null}
              </View>
            </View>

            <FilterButton text={'My current location'} icon={'locate'} onPress={() => this.setPosition()} />
          </View>
        </View>
      </Modal>
    );
  }
}

export default PlaceModal;