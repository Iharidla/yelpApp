import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-ionicons';

import {FilterList} from "../FilterList";

const data=[{value: 1, text: '$'}, {value: 2, text: '$$'}, {value: 3, text: '$$$'}, {value: 4, text: '$$$$'}];
const sortTitles=[{value: 'best_match', text: 'Best Match'}, {value: 'rating', text: 'Rating'}, {value: 'distance', text: 'Distance'}];

const FiltersModal = ({setModalVisible, isVisible, setPrice, setTimeNow, setSortBy, filters, backgroundColor, openDateTimePicker}) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={() => setModalVisible(false)}
    onSwipeComplete={() => setModalVisible(false)}
    swipeDirection="up"
  >
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ backgroundColor: backgroundColor, padding: 20, borderRadius: 20}}>
        <View style={{ marginBottom: 20}}>
          <View style={{ paddingLeft: 5, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='git-compare' size={20} color='white'/>
            <Text style={{color: 'white', paddingLeft: 5}}>Sort by</Text>
          </View>
          <FilterList data={sortTitles} onPress={setSortBy} current={filters.sortBy}/>
        </View>

        <View style={{ marginBottom: 20}}>
          <View style={{ paddingLeft: 5, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='options' size={20} color='white'/>
            <Text style={{color: 'white', paddingLeft: 5}}>Filter by</Text>
          </View>
          <FilterList data={data} onPress={setPrice} current={filters.orderBy.price}/>
          <View style={{ paddingBottom: 5, paddingTop: 5, backgroundColor: 'white', marginTop: 5, borderRadius: 20 }}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginRight: 5}}>
             <TouchableHighlight
                onPress={() => setTimeNow()}
                underlayColor={'#dcdcdc'}
                style={[{
                  width: '50%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  borderRightWidth: 2,
                  borderLeftWidth: 2,
                  borderColor: '#747474',
                },
                  filters.orderBy.time.title=='open_now' ? {
                    backgroundColor: '#747474',
                  } : {
                    backgroundColor: "white",
                  }
                ]}>
                <Text
                  style={[filters.orderBy.time.title=='open_now' ? { color: 'white' } : { color: '#747474' }]}
                >
                  Open Now
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => openDateTimePicker()}
                underlayColor={'#dcdcdc'}
                style={[{
                  width: '50%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  borderRightWidth: 2,
                  borderLeftWidth: 2,
                  borderColor: '#747474',
                },
                  filters.orderBy.time.title=='open_at' ? {
                    backgroundColor: '#747474',
                  } : {
                    backgroundColor: "white",
                  }
                ]}>
                <Text
                  style={[filters.orderBy.time.title=='open_at' ? { color: 'white' } : { color: '#747474' }]}
                >
                  Open At
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center'}}>
          <TouchableHighlight
            onPress={() => setModalVisible(!isVisible)}
            underlayColor={'#dcdcdc'}
            style={{
              borderRadius: 20,
              paddingTop: 5,
              paddingBottom: 5,
              paddingLeft: 20,
              paddingRight: 20,
              borderColor: 'white',
              borderWidth: 2
            }}
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

export default FiltersModal;