import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from "react-redux";
import Business from "../components/businesses/Business";
import {Separator} from "../components/List";
import {SearchMenu} from "../components/SearchMenu";

class Coffee extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
  };

  state = {
    position: 'unknown',
    businesses: []
  };

  componentDidMount() {
    console.log("aaaaaaaar");
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("bbbbbbbbbbbbbb");
      this.setState({position});
        console.log("ccccccccccc");
      },
      (error) => { console.log(error); },
      { enableHighAccuracy: true, timeout: 30000 }
    );
  }

  fetchData(term = 'coffee') {
    // const lat = this.state.position.coords.latitude;
    // const lng = this.state.position.coords.longitude;
    const consumerKey = "aHkQvkO2mknb811VggwSodBjwyIVF65zfFq463PF9sxC088KEo8DfIkAGth0Pvwt4SnsBS7wMvnB16hJxB0b4m-c1qs5A36awFVek6CBG6c6Mz9tzKsGMDRFvh6aXHYx";
    // const location = 'New York';
    // // const term = 'coffee';
    //
    let params = 'location=New York';
    // if(lat && lng) {
    //   params += `latitude=${lat}&longitude=${lng}`
    // } else if(location) {
    //   params += `location=${location}`
    // }
    if(term) {
      params += `&term=${term}`
    }

    const resp = fetch(`https://api.yelp.com/v3/businesses/search?${params}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${consumerKey}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json();
    }).then((obj) => {
      this.setState({ businesses: obj.businesses });
    }).then((obj) => {
      console.log('output');
      console.log(this.state.businesses);
    });
  }

  render() {
    console.log('output');
    console.log(this.state.businesses);

    let check = this.state.businesses.length != 0;

    console.log(check);

    return (
      <View>
        <SearchMenu fetchData={this.fetchData}/>
        <Text style={{fontSize: 30, textAlign:'center'}}>WheresMyCoffee?!</Text>
        <TouchableOpacity
          style={{borderRadius: 7,padding: 10,  backgroundColor: 'rgb(37, 160, 205)'}}
          onPress={this.fetchData.bind(this)}
        >
          <Text style={{fontSize: 15}}>Find Coffee!</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 30, textAlign:'center'}}>Results</Text>
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
    );
  }
}

export default connect()(Coffee);
