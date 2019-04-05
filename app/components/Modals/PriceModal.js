import React from 'react';
import PropTypes from "prop-types";
import {View} from 'react-native';
import Modal from "react-native-modal";

import {FilterList} from "../FilterList";

import styles from "./styles";

const data=[{value: 1, text: '$'}, {value: 2, text: '$$'}, {value: 3, text: '$$$'}, {value: 4, text: '$$$$'}];

const PriceModal = ({setModalVisible, isVisible, setPrice, current, backgroundColor}) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={() => setModalVisible(false)}
    onSwipeComplete={() => setModalVisible(false)}
    swipeDirection="up"
  >
    <View style={styles.container}>
      <View style={[styles.roundContainer, { backgroundColor: backgroundColor, }]}>
        <FilterList data={data} onPress={setPrice} current={current}/>
      </View>
    </View>
  </Modal>
);

PriceModal.propTypes = {
  setModalVisible: PropTypes.func,
  isVisible: PropTypes.bool,
  setPrice: PropTypes.func,
  current: PropTypes.number,
  backgroundColor: PropTypes.string,
};

export default PriceModal;