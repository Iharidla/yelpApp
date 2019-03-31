import React from 'react';
import {StyleSheet, Text, View, Image, Linking, TouchableOpacity} from 'react-native';

const Business = ({name, url, image_url, categories, address, phone,  price, rating}) => {
  
  return(
    <TouchableOpacity style={styles.resultRow} onPress={() => Linking.openURL(url)}>
      <View style={styles.image}>
        <Image source={{uri: image_url}}
               style={{width: 80, height: 80}}/>
      </View>
      <View style={styles.description}>
        <Text style={{fontWeight: 'bold'}}>{`${name}`}</Text>
        <Text style={{flexDirection: 'row'}}>
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

const styles = StyleSheet.create({
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    margin: 10,
  },

  price: {
    position: 'absolute',
    bottom: 25,
  },

  rating: {
    position: 'absolute',
    top: 5,
  },
  
  image:{
    justifyContent: 'flex-start',
    flexBasis: '25%',
  },
  
  description:{
    flexDirection: 'column',
    justifyContent: 'center',
    flexBasis: '65%',
    textAlign: 'left',
  },
  
  info: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexBasis: '10%',
    textAlign: 'center',
  },
  
});

export default Business;
