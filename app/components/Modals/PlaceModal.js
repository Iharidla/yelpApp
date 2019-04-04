import React, { Component } from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Modal from "react-native-modal";

import {FilterButton} from "../Buttons";
import Icon from "react-native-ionicons";


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
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: backgroundColor, alignItems: 'center', padding: 20, borderRadius: 20, justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
              <Icon
                name='compass'
                size={22}
                color='white'
                style={{marginRight: 10}}
              />
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  height: 30,
                  width: 150,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingBottom: 0,
                  paddingTop: 0,
                }}
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