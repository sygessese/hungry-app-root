import React, { Component } from 'react';
import Tabs from './Tabs';
import Directions from './Directions';
import Restaurants from './Restaurants';
import axios from 'axios';
import styled from 'styled-components';
import ClipLoader from "react-spinners/ClipLoader";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: true,
      locationSet: false,
      foodFetched: false,
      lat: '',
      long: '',
      locError: '',
      foods: [],
      foodsError: '',
      liked: '',
      likedError: '',
      restaurantName: '',
      restaurantCoords: [],
    };
    this.updateHome = this.updateHome.bind(this);
    this.getLoc = this.getLoc.bind(this);
    this.restaurantSelected = this.restaurantSelected.bind(this)
    this.setLocation = this.setLocation.bind(this)
    this.geoError = this.geoError.bind(this)
    this.geoSuccess = this.geoSuccess.bind(this)
  }

  getFoods() {
    axios.get('/yelp', { params: { lat: this.state.lat, long: this.state.long } })
      .then(foods => {
        var results = [];
        foods.data.data.search.business.map(({ categories, name, id, photos, price, rating, review_count, coordinates }) => {
          categories = categories.map(({ title }) => title)
          var lat = coordinates.latitude;
          var long = coordinates.longitude;
          results.push([categories, name, id, photos, price, rating, review_count, lat, long]);
        })
        results = results.filter(item => item[5] >= 4)
        results.sort((a, b) => b[6] - a[6])
        this.setState({
          foods: results,
          foodFetched: true
        })
      })
      .catch(foodsError => {
        console.log('oops')
        console.log(foodsError)
        this.setState({ foodsError })
      })
  }

  getLoc() {
    axios({
      method: 'get',
      url: 'https://ipapi.co/json/',
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(res => {
        this.setState({ lat: res.data.latitude, long: res.data.longitude, locationSet: true }, this.getFoods)
      })
      .catch(err => {
        this.setState({ locError: err })
      })
  }

  updateHome(bool) {
    if (bool !== this.state.home) {
      this.setState({ home: bool })
    }
  }

  restaurantSelected(name, coords) {
    this.setState({ restaurantName: name, restaurantCoords: coords }, () => this.updateHome(false))
    // change tab to maps, loaded with coords
  }

  setLocation(lat,long) {
    this.setState({ lat, long, locationSet: true }, this.getFoods)
  }

  geoSuccess(position) {
    this.setLocation(position.coords.latitude, position.coords.longitude)
  }

  geoError(error) {
    this.getLoc()
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(this.geoSuccess, this.geoError, {
        enableHighAccuracy: true, 
        timeout: 5000
      });
    } else {
      this.getLoc();
    }
  }

  render() {
    const search = <SearchContainer>
      <SearchTitle>
        Hungry &emsp;   
        <ClipLoader
          size={50}
          color={"000000"}
        /></SearchTitle>
    </SearchContainer>;

    const found =
      <FoundContainer>
        <FoundTitle>Hungry</FoundTitle>
        {this.state.foodFetched ?
          <div><Restaurants foods={this.state.foods} select={this.restaurantSelected} /></div> :
          <h6>{this.state.foodsError}</h6>}
      </FoundContainer>
      ;

    const homeView = this.state.locationSet ? found : search;

    const goView = <GoContainer><Directions origin={[this.state.lat, this.state.long]} destination={this.state.restaurantCoords} resturantName={this.state.restaurantName} /></GoContainer>

    return (
      <Body>
        {this.state.home ? homeView : goView}
        <TabsContainer>
          <Tabs updateHome={this.updateHome} home={this.state.home} />
        </TabsContainer>
      </Body>
    )
  }
}

const GoContainer = styled.div`
  padding-top: 10%;
  background-color: #9eafc1;
  height: 100%;
`
const FoundContainer = styled.div`
  background-color: ghostwhite;
  height: 100%;
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scroll-padding-top: em;
  scroll-snap-type: y mandatory;
    `
const FoundTitle = styled.h1`
font-size: 4em;
font-weight: 600;
color: black;
height: 40px;
padding-bottom: 2em;
padding-top: 1.5em;
text-align: center;
scroll-snap-align: center;
z-index: 99;
background-color: white;
margin-top: 0;
`
const SearchTitle = styled.h1`
font-size: 100px;
font-weight: 600;
padding-top: 40vh;
color: black;
text-align: center;
`
const SearchContainer = styled.div`
font-size: 18;
font-weight: 600;
color: darkgrey;
height: 100%;
`
const TabsContainer = styled.div`
background-color: black;
z-index: 99;
height: 5vh;
width: inherit;
flex-direction: row;
@media (max-width: 600px) {
  height: 5vh;
}
`
const Body = styled.div`
display: flex;
flex-direction: column;  
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
overflow: auto;
background-color: ghostwhite;
font-family: times;
`

export default App;
