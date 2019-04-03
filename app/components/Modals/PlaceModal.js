import React from 'react';
import {View, TextInput} from 'react-native';
import Modal from "react-native-modal";

import {FilterButton} from "../Buttons";

const PlaceModal = ({setPlaceModalVisible, isVisible, city, onSubmitEditing, backgroundColor, setLocation}) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={() => setPlaceModalVisible(false)}
    onSwipeComplete={() => setPlaceModalVisible(false)}
    swipeDirection="up"
  >
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ backgroundColor: backgroundColor, alignItems: 'center', padding: 20, borderRadius: 20, justifyContent: 'space-between'}}>
        <TextInput
          style={{
            backgroundColor: '#fff',
            borderRadius: 3,
            height: 45,
            marginTop: 3,
            marginLeft: 10,
            marginRight: 10
          }}
          placeholder={'Type city...'}
          placeholderTextColor={'#999'}
          underlineColorAndroid={'#fff'}
          value={city}
          onSubmitEditing={(event) => onSubmitEditing(event.nativeEvent.text)}
        />
        <FilterButton text={'My current location'} icon={'locate'} onPress={() => setLocation()} />
        <FilterButton />
      </View>
    </View>
  </Modal>
);

export default PlaceModal;