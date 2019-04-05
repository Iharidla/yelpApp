import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StatusBar, FlatList, View, StyleSheet, Dimensions} from 'react-native';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Header } from '../components/Header'
import { connectAlert } from '../components/Alert';

import {getInitialConversion} from '../actions/currencies';
import {SearchBar} from "../components/SearchBar";
import {CategoryItem} from "../components/CategoryItem";
import {Logo} from "../components/Logo";

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    categories: PropTypes.array,
    primaryColor: PropTypes.string,
    currencyError: PropTypes.string,
  };

  componentDidMount() {
    this.props.dispatch(getInitialConversion());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currencyError && nextProps.currencyError !== this.props.currencyError) {
      this.props.alertWithType('error', 'Error', nextProps.currencyError);
    }
  }

  handleOptionsPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Options');
  };

  categorySearch = (text, value) => {
    const { navigation } = this.props;
    const searchParams = {
      text: value
    };
    navigation.navigate('Businesses', {searchParams});
  };

  searchPress = () => {
    console.log("searchPress");
    const { navigation } = this.props;
    const searchParams = {
      autoFocus: true
    };
    navigation.navigate('Businesses', {searchParams});
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex:1,
        flexDirection:'column',
        alignItems: 'center',
        width: Dimensions.get('window').width,
      }
    });
    const {primaryColor} = this.props;
    return (
      <Container backgroundColor={primaryColor}>
        <StatusBar translucent={false} barStyle="light-content" backgroundColor={primaryColor} />
        <Header onPress={this.handleOptionsPress} />
        <View style={styles.container}>
          <Logo />
          <View style={styles.categories}>
            <SearchBar
              onTouchStart={this.searchPress}
            />
            <FlatList
              data={ this.props.categories }
              keyExtractor={(item) => item.text}
              removeClippedSubviews={false}
              renderItem={ ({item, index}) =>
                <CategoryItem item={item} index={index} onPress={() => this.categorySearch(item.text, item.value)} />
              }
              numColumns={2}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.currencies.categories,
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error,
  };
};

export default connect(mapStateToProps)(connectAlert(Home));
