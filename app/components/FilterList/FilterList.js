import React from "react";
import {Text, TouchableHighlight, View} from "react-native";

import styles from "./styles";

const FilterList = ({data, onPress, current}) => (
  <View style={styles.filterListBackground}>
    <View style={styles.filterListContainer}>
      {
        data.map((item) => (
          <TouchableHighlight
            onPress={() => onPress(item.value)}
            underlayColor={'#dcdcdc'}
            key={item.text}
            style={[
              styles.listItem,
              {
                width: `${100/data.length}%`,
              },
              current==item.value ? styles.listItemCheck : styles.listItemUncheck
            ]}
          >
            <Text
              style={[current==item.value ? styles.textCheck  : styles.textUncheck]}
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