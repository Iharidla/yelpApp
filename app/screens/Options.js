import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar, Linking } from 'react-native';
import Icon from 'react-native-ionicons';

import  { ListItem, Separator } from '../components/List';
import { connectAlert } from '../components/Alert';

const ICON_COLOR = '#868686';
const ICON_SIZE = 23;

class Options extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func,
  };

  handleThemesPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Themes');
  };

  handleSitePress = () => {
    Linking.openURL('http://yelp.com').catch(() =>
      this.props.alertWithType('error', 'Sorry!', "Yelp can't be opened tight mow"),
    );
  };

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default"/>
        <ListItem
          text="Themes"
          onPress={this.handleThemesPress}
          customIcon={
            <Icon name="arrow-forward" color={ICON_COLOR} size={ICON_SIZE} />
          }
        />
        <Separator />
        <ListItem
          text="Yelp.com"
          onPress={this.handleSitePress}
          customIcon={
            <Icon name="link" color={ICON_COLOR} size={ICON_SIZE} />
          }
        />
      </ScrollView>
    )
  }
}

export default connectAlert(Options);
