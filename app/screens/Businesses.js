import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
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
    text: '',
    autoFocus: false,
  };

  componentDidMount() {
    const { navigation } = this.props;

    this.setState({text: navigation.getParam('text', '')});
    this.setState({autoFocus: navigation.getParam('autoFocus', false)});
  }

  setBusinesses = (businesses) => {
    this.setState({businesses});
  };

  render() {
    console.log('output');
    console.log(this.state.businesses);

    let check = this.state.businesses.length != 0;

    return (
      <Container backgroundColor={this.props.primaryColor}>
        {/*<SearchMenu backgroundColor={this.props.primaryColor} setBusinesses={this.setBusinesses} text={this.state.text} autoFocus={this.state.autoFocus} />*/}
        <View style={{backgroundColor: 'white'}}>
          { check ? <FlatList
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
          /> : null }
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
