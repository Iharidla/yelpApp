import React from "react";
import {Text, TouchableHighlight, View} from "react-native";

const FilterList = ({data, onPress, current}) => (
  <View style={{ paddingBottom: 5, paddingTop: 5, backgroundColor: 'white', marginBottom: 5, borderRadius: 20 }}>
    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginRight: 5}}>
      {
        data.map((item) => (
          <TouchableHighlight
            onPress={() => onPress(item.value)}
            underlayColor={'#dcdcdc'}
            style={[{
              width: `${100/data.length}%`,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              borderRightWidth: 2,
              borderLeftWidth: 2,
              borderColor: '#747474',
            },
            current==item.value ? {
              backgroundColor: '#747474',
            } : {
              backgroundColor: "white",
            }
            ]}>
            <Text
              style={[current==item.value ? { color: 'white' } : { color: '#747474' }]}
            >
              {item.text}
            </Text>
          </TouchableHighlight>
        ))
      }
    </View>
  </View>
);

export default FilterList;