/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';


const ListStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding-top: 15%
`
const ListItem = styled.h1`
    font-size: 25px;
    padding: 5%;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`

export default class GOAT extends Component {
  render() {

    const likedRestaurants = this.props.restaurant === '' ? 'empty' : (this.props.restaurants).map((restaurant, id) => {
      return <ListItem key={id}>
        <span> ❥ </span>
        <span> {restaurant} </span>
      </ListItem>
    })

    return (
      <div>
        <ListStyle>
          {likedRestaurants}
        </ListStyle>
      </div>
    );
  }
}
