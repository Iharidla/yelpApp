import React from 'react';
import {Text, TouchableHighlight, View, FlatList} from 'react-native';
import Modal from "react-native-modal";
import {FilterList} from "../FilterList";

const data=[{value: 1, text: '$'}, {value: 2, text: '$$'}, {value: 3, text: '$$$'}, {value: 4, text: '$$$$'}];

const PriceModal = ({setModalVisible, isVisible, setPrice, current}) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={() => setModalVisible(false)}
    onSwipeComplete={() => setModalVisible(false)}
    swipeDirection="up"
  >
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ backgroundColor: '#4F6D7A', alignItems: 'center', padding: 20, borderRadius: 20, justifyContent: 'space-between'}}>
        <FilterList data={data} onPress={setPrice} current={current}/>
      </View>
    </View>
  </Modal>
);

export default PriceModal;