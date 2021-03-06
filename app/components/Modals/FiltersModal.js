import React from 'react';
import PropTypes from "prop-types";
import {Text, TouchableHighlight, View} from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-ionicons';

import { FilterList } from "../FilterList";

import styles from "./styles";
import prices from "../../data/prices";
import sortTitles from "../../data/sortTitles";

const FiltersModal = ({setModalVisible, isVisible, setPrice, setTimeNow, setSortBy, filters, backgroundColor, openDateTimePicker}) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={() => setModalVisible(false)}
    onSwipeComplete={() => setModalVisible(false)}
    swipeDirection="up"
  >
    <View style={styles.container}>
      <View style={[styles.filtersContainer, { backgroundColor: backgroundColor }]}>
        <View style={styles.separateContainer}>
          <View style={styles.filterTitleContainer}>
            <Icon name='git-compare' size={20} color='white'/>
            <Text style={styles.filterText}>Sort by</Text>
          </View>
          <FilterList data={sortTitles} onPress={setSortBy} current={filters.sortBy}/>
        </View>

        <View style={styles.separateContainer}>
          <View style={styles.filterTitleContainer}>
            <Icon name='options' size={20} color='white'/>
            <Text style={styles.filterText}>Filter by</Text>
          </View>
          <FilterList data={prices} onPress={setPrice} current={filters.orderBy.price}/>
          <View style={styles.filterListBackground}>
            <View style={styles.filterListContainer}>
             <TouchableHighlight
                onPress={() => setTimeNow()}
                underlayColor={'#dcdcdc'}
                style={[
                  styles.listItem,
                  filters.orderBy.time.title=='open_now' ? styles.listItemCheck : styles.listItemUncheck
                ]}>
                <Text
                  style={[filters.orderBy.time.title=='open_now' ? styles.textCheck : styles.textUncheck]}
                >
                  Open Now
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => openDateTimePicker(true)}
                underlayColor={'#dcdcdc'}
                style={[
                  styles.listItem,
                  filters.orderBy.time.title=='open_at' ? styles.listItemCheck : styles.listItemUncheck
                ]}>
                <Text
                  style={[filters.orderBy.time.title=='open_at' ? styles.textCheck : styles.textUncheck]}
                >
                  Open At
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <TouchableHighlight
            onPress={() => setModalVisible(!isVisible)}
            underlayColor={'#dcdcdc'}
            style={styles.cancelText}
          >
            <Text
              style={{
                color: 'white',
              }}
            >
               Cancel
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  </Modal>
);

FiltersModal.propTypes = {
  setModalVisible: PropTypes.func,
  isVisible: PropTypes.bool,
  setPrice: PropTypes.func,
  setTimeNow: PropTypes.func,
  setSortBy: PropTypes.func,
  filters: PropTypes.object,
  backgroundColor: PropTypes.string,
  openDateTimePicker: PropTypes.func,
};

export default FiltersModal;