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
    margin-bottom: 40em;
    scroll-snap-type: y proximity;
  `
const ListItem = styled.div`
  font-size: 2em;
  display: flex;
  flex-direction: column;
  width: 85%;
  margin-bottom: 2em;
  scroll-snap-stop: always;
  // position: sticky;
  // position: -webkit-sticky;
  // top: 0;
  scroll-snap-align: start;
  background-color: ghostwhite;
  scroll-margin: 10vh;
`
const Titles = styled.div`
  color: ${props => props.footer ? "grey" : "chocolate"};
  font-size: ${props => props.footer ? "1.2em" : "1.4em"};
  line-height: ${props => props.footer ? "1.2em" : "1em"};
  margin-bottom: ${props => props.margin ? "2em" : "0em"};
  font-weight: 400;
    `

const Go = styled.button`
font-size: 1em;
background-color: burlywood;
height: 1.2em;
margin-left: 1m;
`

const Arrow = styled.span`
  font-size: 50px;
  position: absolute;
  top: 10vh;
  left: 0;
  z-index: 1;
`

export default class Restaurants extends Component {
  render() {
    // categories (titles), name, id, photos, price, rating, review_count
    var list = this.props.foods.length === 0 ? 'empty' :
      (this.props.foods).map((restaurant, id) => {
        return <ListItem key={id}>
          <Titles>
            {restaurant[4]} <b>{restaurant[1]}</b>
          </Titles>
          <Titles footer>
            {restaurant[5]}/5 by {restaurant[6]} foodies
          </Titles>
          <img
            style={{ width: '100%', height: '100%' }}
            src={restaurant[3][0]}
          />
          <Titles footer margin><Go onClick={() => this.props.select(restaurant[1], [restaurant[7], restaurant[8]])}>select</Go>{restaurant[0].join(' | ')}</Titles>

        </ListItem>
      });

    return (
      <div>
        <ListStyle>
          {list}
        </ListStyle>
        <Arrow>&#8594;</Arrow>
      </div>
    );
  }
}
