import React from 'react';
import PropTypes from "prop-types";
import {Text, View, Image, Linking, TouchableOpacity} from 'react-native';

import FilterButton from "../Buttons/FilterButton";

import styles from "./styles";

const Business = ({name, url, image_url, categories, address, phone,  price, rating}) => {
  
  return(
    <TouchableOpacity style={styles.resultRow} onPress={() => Linking.openURL(url)}>
      <View style={styles.imageContainer}>
        <Image source={{uri: image_url}}
               style={styles.image}/>
      </View>
      <View style={styles.description}>
        <Text style={styles.nameText}>{`${name}`}</Text>
        <Text style={styles.categoryText}>
          {categories.map((item) => (item.title))}
        </Text>
        <Text>{`${address}`}</Text>
        <Text>{`${phone}`}</Text>
      </View>
      
      <View style={styles.info}>
        <View style={styles.rating}><Text>{`${rating}`}</Text></View>
        <View style={styles.price}><Text>{`${price}`}</Text></View>
      </View>
    </TouchableOpacity>
  );
};

FilterButton.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  image_url: PropTypes.string,
  categories: PropTypes.array,
  address: PropTypes.string,
  phone: PropTypes.string,
  price: PropTypes.string,
  rating: PropTypes.string,
};

export default Business;
