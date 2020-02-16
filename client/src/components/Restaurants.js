/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';

const ListStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    align-items: center;
  `
const ListItem = styled.div`
  font-size: 45px;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-bottom: 4em;
  scroll-snap-align: start;
`
const Titles = styled.h1`
  color: grey;
  font-size: 45px;
  margin-top: 0px;
`

export default class Restaurants extends Component {
  render() {
    // categories (titles), name, id, photos, price, rating, review_count
    var list = this.props.foods.length === 0 ? 'empty' :
      (this.props.foods).map((restaurant, id) => {
        return <ListItem key={id}>
          <span>
            {restaurant[4]} <b>{restaurant[1]}</b>, rated {restaurant[5]} by {restaurant[6]}
          </span>
          <img
            style={{ width: '100%', height: '100%' }}
            src={restaurant[3][0]}
          />
          <Titles>{restaurant[0].join(' | ')}</Titles>
        </ListItem>
      });

    return (
      <ListStyle>
        {list}
      </ListStyle>
    );
  }
}
