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
    margin-bottom: 10em;
  `
const ListItem = styled.div`
  font-size: 2em;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-bottom: 5em;
  scroll-snap-stop: always;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  scroll-snap-align: start;
  background-color: ghostwhite;
`
const Titles = styled.h1`
  color: ${props => props.footer ? "grey" : "chocolate"};
  font-size: ${props => props.footer ? "1.5em" : "2em"};
  line-height: ${props => props.footer ? "1.5em" : "1em"};
  margin-bottom: ${props => props.footer ? "8em" : "0em"};
  font-weight: 400;
    `

export default class Restaurants extends Component {
  render() {
    // categories (titles), name, id, photos, price, rating, review_count
    var list = this.props.foods.length === 0 ? 'empty' :
      (this.props.foods).map((restaurant, id) => {
        return <ListItem key={id}>
          <Titles>
            {restaurant[4]} <b>{restaurant[1]}</b>rated {restaurant[5]} by {restaurant[6]}
          </Titles>
          <img
            style={{ width: '100%', height: '100%' }}
            src={restaurant[3][0]}
          />
          <Titles footer>{restaurant[0].join(' | ')}</Titles>
        </ListItem>
      });

    return (
      <ListStyle>
        {list}
      </ListStyle>
    );
  }
}
