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
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    categories: PropTypes.array,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    isFetching: PropTypes.bool,
    lastCovetedDate: PropTypes.object,
    primaryColor: PropTypes.string,
    alertWithType: PropTypes.func,
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
    console.log(`category value: ${value}`);
    // this.setState({text: text});
  };

  searchPress = () => {
    console.log("searchPress");
    const { navigation } = this.props;
    navigation.navigate('Businesses', {
      autoFocus: true,
    });
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
    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar translucent={false} barStyle="light-content" backgroundColor='#4F6D7A' />
        <Header onPress={this.handleOptionsPress} />
        <View style={styles.container}>
          <Logo />
          <View style={styles.categories}>
            <SearchBar
              onTouchStart={this.searchPress}
            />
            <FlatList
              data={ this.props.categories }
              keyExtractor={(item) => item.index}
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
  const { baseCurrency, quoteCurrency } = state.currencies;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};

  return {
    baseCurrency,
    quoteCurrency,
    categories: state.currencies.categories,
    amount: state.currencies.amount,
    conversionRate: rates[quoteCurrency] || 0,
    isFetching: conversionSelector.isFetching,
    lastCovetedDate: conversionSelector.date? new Date(conversionSelector.date) : new Date(),
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error,
  };
};

export default connect(mapStateToProps)(connectAlert(Home));
