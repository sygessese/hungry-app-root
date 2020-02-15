/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';

const ListStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding-top: 10%;
    padding-teft: 5%;
  `
const ListItem = styled.div`
  font-size: 15;
  padding-bottom: 10%;
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Titles = styled.h1`
  color: grey;
`

export default class Restaurants extends Component {
  render() {
    // categories (titles), name, id, photos, price, rating, review_count
    var list = this.props.foods.length === 0 ? 'empty' :
      (this.props.foods).map((restaurant, id) => {
        return <ListItem key={id}>
          <span>
            {restaurant[4]} {restaurant[1]}, rated {restaurant[5]} by {restaurant[6]}
          </span>
          <Titles>{restaurant[0].join(' | ')}</Titles>
          <img
            style={{ width: '90%', height: '90%' }}
            src={restaurant[3][0]}
          />
        </ListItem>
      });

    return (
      <ListStyle>
        {list}
      </ListStyle>
    );
  }
}
