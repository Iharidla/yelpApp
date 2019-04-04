import React, { Component } from 'react';
import {View, TextInput} from 'react-native';
import Modal from "react-native-modal";
import Icon from "react-native-ionicons";

import { FilterButton } from "../Buttons";

import styles from "./styles";

class PlaceModal extends Component {
  state = {
    text: '',
  };

  setText = (text) => {
    this.setState({text});
  };

  onSubmitEditing = (text) => {
    const {setPlaceModalVisible, onSubmitEditing} = this.props;
    this.setState({text: ''});
    setPlaceModalVisible(false);
    onSubmitEditing(text);
  };

  render() {
    const {setPlaceModalVisible, isVisible, backgroundColor, setPosition} = this.props;

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
            <FilterButton text={'My current location'} icon={'locate'} onPress={() => setPosition()} />
          </View>
        </View>
      </Modal>
    );
  }
}

export default PlaceModal;