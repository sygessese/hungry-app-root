import React, { Component } from 'react';
import Tabs from './Tabs';
import Directions from './Directions';
import Restaurants from './Restaurants';
import axios from 'axios';
import styled from 'styled-components';

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
    };
    this.updateHome = this.updateHome.bind(this);
    this.getLoc = this.getLoc.bind(this);
  }

  getFoods() {
    axios.get('/yelp', { params: { lat: this.state.lat, long: this.state.long } })
      .then(foods => {
        console.log(foods)
        var results = [];
        foods.data.data.search.business.map(({ categories, name, id, photos, price, rating, review_count }) => {
          categories = categories.map(({ title }) => title)
          results.push([categories, name, id, photos, price, rating, review_count]);
        })
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
    /*    // depreciated for http origin sites 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);
        this.setState({ lat, long, locationSet: true }, this.getFoods)
      })
    } else {
      this.setState({ locError: 'geolocation API unavailable' })
    }
    */

    axios({
      method: 'get',
      url: 'https://ipapi.co/json/',
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(res => {
        this.setState({ lat: res.latitude, long: res.longitude, locationSet: true }, this.getFoods)
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

  componentDidMount() {
    // this.getLikes();
  }

  render() {
    const search = <SearchContainer>
      <SearchTitle onClick={this.getLoc}>Hungry!!!</SearchTitle>
    </SearchContainer>;

    const found =
      <FoundContainer>
        <FoundTitle>Hungry</FoundTitle>
        {this.state.foodFetched ?
          <div><Restaurants foods={this.state.foods} /></div> :
          <h6>{this.state.foodsError}</h6>}
      </FoundContainer>
      ;

    const homeView = this.state.locationSet ? found : search;

    const goView = <GoContainer><Directions /></GoContainer>

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
  background-color: #9eafc1;
  height: 100%;
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
    `
const FoundTitle = styled.h1`
font-size: 24;
font-weight: 600;
color: black;
height: 40px;
margin-bottom: 0px;
text-align: center;
background-color: #9eafc1;
`
const SearchTitle = styled.h1`
font-size: 50px;
font-weight: 600;
padding-top: 300px;
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
height: 100px;
width: inherit;
flex-direction: row;
@media (max-width: 600px) {
  height: 10vh;
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
background-color: slategray;

@media (max-width: 600px) {
  height: 100vh;
  width: 100vw;
}
`

export default App;
