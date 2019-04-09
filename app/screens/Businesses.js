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
    primaryColor: PropTypes.string,
    currencyError: PropTypes.string,
  };

  state = {
    businesses: [],
    isFetching: true,
  };

  setBusinesses = (businesses) => this.setState({businesses});

  goBack = () => this.props.navigation.goBack(null);

  setFetching = (isFetching) => this.setState({isFetching});

  render() {
    const { navigation, primaryColor } = this.props;
    const searchParams = navigation.getParam('searchParams', {});
    const { isFetching, businesses } = this.state;

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
              data={businesses}
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
  };
};

export default connect(mapStateToProps)(Businesses);
