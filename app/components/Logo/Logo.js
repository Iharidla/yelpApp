import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, Keyboard, Animated, StyleSheet, Platform, Image} from 'react-native';

import styles from './styles';

const ANIMATION_DURATION = 250;

class Logo extends Component {
  static propTypes = {
    tintColor: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      containerImageWidth: new Animated.Value(styles.$largeContainerSize),
      imageWidth: new Animated.Value(styles.$largeImageSize),
    };
  }

  componentDidMount() {
    const name = Platform.OS === 'ios' ? 'Will' : 'Did';
    this.keyboardDidShowListener = Keyboard.addListener(
        `keyboard${name}Show`,
        this.keyboardWillShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
        `keyboard${name}Hide`,
        this.keyboardWillHide,
    );
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  keyboardWillShow = () => {
    const { containerImageWidth, imageWidth } = this.state;

    Animated.parallel([
      Animated.timing(containerImageWidth, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(imageWidth, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION,
      }),
    ]).start();
  };

  keyboardWillHide = () => {
    const { containerImageWidth, imageWidth } = this.state;

    Animated.parallel([
      Animated.timing(containerImageWidth, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(imageWidth, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION,
      }),
    ]).start();
  };

  render() {

    return (
      <View style={styles.container}>
        <Image resizeMode="contain" source={require('./images/fast_food.png')} />
      </View>
    )
  }
}

export default Logo;
