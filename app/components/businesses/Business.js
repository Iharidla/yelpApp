import React from 'react';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity} from 'react-native';

const Business = ({name, url, image_url, rating, phone}) => (
  <TouchableOpacity style={styles.resultRow} onPress={() => Linking.openURL(url)}>
    <Image source={{uri: image_url}}
           style={{width: 80, height: 80, justifyContent: 'flex-start'}} />
    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
      <Text style={{fontWeight: 'bold'}}>{`${name}`}</Text>
      <Text>Rating: {`${rating}`}</Text>
      <Text>Phone: {`${phone}`}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginBottom: 20,
    padding: 5,
  }
});

export default Business;