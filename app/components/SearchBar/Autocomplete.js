import React from "react";
import PropTypes from "prop-types";
import {Text, TouchableHighlight, View} from "react-native";

import styles from "./styles";

const Autocomplete = ({data, onPress}) => (
    <View style={styles.autocomplete}>
      {
        data.map((item) => (
          <TouchableHighlight
            onPress={() => onPress(item.text)}
            underlayColor={'#dcdcdc'}
            key={item.text}
          >
            <Text>{item.text}</Text>
          </TouchableHighlight>
        ))
      }
    </View>
);

Autocomplete.propTypes = {
  data: PropTypes.array,
  onPress: PropTypes.func,
};

export default Autocomplete;