import React from 'react';
import {View, Text, Image} from 'react-native';

import styles from './styles';

const Logo = () => (
  <View style={styles.container}>
    <Image resizeMode="contain" style={styles.logo} source={require('./images/binoculars.png')} />
    <Text style={styles.text}>EasySearch</Text>
  </View>
);



export default Logo;
