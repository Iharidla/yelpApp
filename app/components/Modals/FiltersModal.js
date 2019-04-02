import React from 'react';
import {Text, TouchableHighlight, View, FlatList} from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-ionicons';

const data=[1, 2, 3, 4];
const sortTitles=['relevance', 'most popular', 'highest rated'];
const time=['opened now', "opened at"];

const FiltersModal = ({setModalVisible, isVisible, setPrice, setTime, setSortBy}) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={() => setModalVisible(false)}
    onSwipeComplete={() => setModalVisible(false)}
    swipeDirection="up"
  >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '90%', backgroundColor: '#dcdcdc', padding: 20, borderRadius: 20}}>
        <View style={{ paddingLeft: 5, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name='git-compare' size={20} color='#343434'/>
          <Text style={{color: '#343434', paddingLeft: 5}}>Sort by</Text>
        </View>
        {/*create component for lists with params: onPress: func, data: array*/}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10, paddingTop: 10, backgroundColor: 'white', marginBottom: 20}}>
          {
            sortTitles.map((item) => (
              <TouchableHighlight
                onPress={() => setSortBy(item)}
                style={{
                  width: `${100/sortTitles.length}%`,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1,
                  borderColor: '#343434',
                  borderRightColor: 'black',
                  borderRightWidth: 1,
                  borderRLeftColor: 'black',
                  borderLeftWidth: 1,
                }}>
                <Text>{item}</Text>
              </TouchableHighlight>
            ))
          }
        </View>

        <View style={{ paddingLeft: 5, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name='options' size={20} color='#343434'/>
          <Text style={{color: '#343434', paddingLeft: 5}}>Filter by</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10, paddingTop: 10, backgroundColor: 'white', marginBottom: 5}}>
          {
            data.map((item) => (
              <TouchableHighlight
                onPress={() => setPrice('$'.repeat(item))}
                style={{
                  flexDirection: 'row',
                  width: `${100/data.length}%`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1,
                  borderColor: '#343434',
                  borderRightColor: 'black',
                  borderRightWidth: 1,
                  borderRLeftColor: 'black',
                  borderLeftWidth: 1,
                }}>
                <Text>{'$'.repeat(item)}</Text>
              </TouchableHighlight>
            ))
          }
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10, paddingTop: 10, backgroundColor: 'white', marginBottom: 20}}>
          {
            time.map((item) => (
              <TouchableHighlight
                onPress={() => setTime(item)}
                style={{
                  width: `${100/time.length}%`,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1,
                  borderColor: '#343434',
                  borderRightColor: 'black',
                  borderRightWidth: 1,
                  borderRLeftColor: 'black',
                  borderLeftWidth: 1,
                }}>
                <Text>{item}</Text>
              </TouchableHighlight>
            ))
          }
        </View>
        <TouchableHighlight onPress={() => setModalVisible(!isVisible)} style={{ alignItems: 'center'}}>
          <Text>Cancel</Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>
);

export default FiltersModal;