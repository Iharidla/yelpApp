import React, { Component } from 'react';
import PropTypes from "prop-types";
import {View, TextInput} from 'react-native';
import Modal from "react-native-modal";
import Icon from "react-native-ionicons";

import { FilterButton } from "../Buttons";

import styles from "./styles";

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
  };

  setText = (text) => {
    this.setState({text});
  };

  onSubmitEditing = (text) => {
    console.log('pressed');
    const {setPlaceModalVisible, onSubmitEditing} = this.props;
    setPlaceModalVisible(false);
    onSubmitEditing(text);
    this.setState({text: ''});
  };

  setPosition = () => {
    const {setPlaceModalVisible, setPosition} = this.props;
    setPlaceModalVisible(false);
    setPosition();
  };

  render() {
    const {setPlaceModalVisible, isVisible, backgroundColor} = this.props;

    let {city} = this.props;

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
              />
            </View>
            <FilterButton text={'My current location'} icon={'locate'} onPress={() => this.setPosition()} />
          </View>
        </View>
      </Modal>
    );
  }
}

export default PlaceModal;