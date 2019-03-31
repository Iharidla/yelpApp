import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, KeyboardAvoidingView, Text, FlatList, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Header } from '../components/Header'
import { connectAlert } from '../components/Alert';

import {getInitialConversion} from '../actions/currencies';
import YelpSearchBar from "../components/SearchBar/YelpSearchBar";
import Logo from "../components/Logo/Logo";
import CategoryItem from "../components/CategoryItem/CategoryItem";
import {Separator} from "../components/List";

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

  state = {
    text: '',
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

  updateSearch = (text) => {
    console.log(`search text: ${text}`);
    this.setState({text});
  };

  categorySearch = (text, value) => {
    console.log(`category value: ${value}`);
    this.setState({text: text});
  };

  render() {
    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar translucent={false} barStyle="light-content" backgroundColor='#4F6D7A' />
        <Header onPress={this.handleOptionsPress} />
        {/*remove keyboardAvoidingView after updating search bar*/}
        <KeyboardAvoidingView behavior="height">
          {/*<Logo tintColor={this.props.primaryColor}/>*/}
          <YelpSearchBar updateSearch={this.updateSearch} search={this.state.text}/>
          <FlatList
            data={ this.props.categories }
            renderItem={ ({item, index}) =>
              <CategoryItem item={item} index={index} onPress={this.categorySearch(item.text, item.value)} />
            }
            numColumns={3}
            ItemSeparatorComponent={Separator}
          />
          
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { baseCurrency, quoteCurrency } = state.currencies;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};
  console.log(state.currencies.categories);
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
