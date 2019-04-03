import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { connect } from "react-redux";
import {Business} from "../components/Businesses";
import {Separator} from "../components/List";
import {SearchMenu} from "../components/SearchMenu";
import {Container} from "../components/Container";

class Businesses extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
  };

  state = {
    businesses: [],
    isFetching: true,
  };

  setBusinesses = (businesses) => {
    console.log(...businesses);
    this.setState({businesses});
  };

  goBack = () => {
    console.log("go back")
    const {navigation} = this.props;
    navigation.goBack(null);
  };

  setFetching = (isFetching) => this.setState({isFetching});

  render() {
    console.log('output');
    console.log(this.state.businesses);

    let check = this.state.businesses.length != 0;
    
    const { navigation, primaryColor } = this.props;
    const searchParams = navigation.getParam('searchParams', {});
    const { isFetching } = this.state;
    return (
      <Container backgroundColor={primaryColor}>
        <SearchMenu
          backgroundColor={this.props.primaryColor}
          setBusinesses={this.setBusinesses}
          searchParams={searchParams}
          goBack={this.goBack}
          setFetching={this.setFetching}
        />
        <View style={{backgroundColor: 'white', height: '100%', justifyContent: 'center'}}>
          {isFetching
            ?
            <ActivityIndicator size="large" color={this.props.primaryColor} />
            :
            <FlatList
              data={this.state.businesses}
              renderItem={({ item }) => (
                <Business
                  name={item.name}
                  url={item.url}
                  image_url={item.image_url}
                  categories={item.categories}
                  address={item.location.address1}
                  phone={item.display_phone}
                  price={item.price}
                  rating={item.rating}
                />
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={Separator}
            />
          }
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error,
  };
};

export default connect(mapStateToProps)(Businesses);
