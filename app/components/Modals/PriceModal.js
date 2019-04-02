import React from 'react';
import {Text, TouchableHighlight, View, FlatList} from 'react-native';
import Modal from "react-native-modal";

const PriceModal = ({setModalVisible, isVisible, setPrice}) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={() => setModalVisible(false)}
    onSwipeComplete={() => setModalVisible(false)}
    swipeDirection="up"
  >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ height: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 20}}>
        <FlatList
          data={ [1, 2, 3, 4] }
          keyExtractor={(item) => item.index}
          removeClippedSubviews={false}
          horizontal={true}
          contentContainerStyle={{alignItems: 'center'}}
          renderItem={ ({item}) =>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight onPress={() => setPrice('$'.repeat(item))}>
                <Text style={{padding: 5}}>{'$'.repeat(item)}</Text>
              </TouchableHighlight>
              {(item!=4) && <View style={{ width: 1, backgroundColor: '#E2E2E2'}} />}
            </View>
          }
        />
        <TouchableHighlight onPress={() => setModalVisible(!isVisible)}>
          <Text>Cancel</Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>
);

export default PriceModal;