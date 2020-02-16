/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';


const FixToText = styled.div`
    display: flex;
    flex-direction: row;
    width: inherit;
    height: inherit;
    background-color: white;
    // justifyContent: space-around;
  `
const Script = styled.h1`
    font-size: 2.2em;
    align-self: center;
    color: ${props => props.selected ? "black" : "grey"}
`
const Button = styled.button`
    background-color: ${props => props.selected ? "lightsteelblue" : "whitesmoke"};
    width: 100%;
    height: 100%;
    display: block;
    font-family: times;

  `

//currently wrapped in div, prob need to be button as default
export default class Tabs extends Component {
  render() {
    return (
      <FixToText>
        {this.props.home ? <Button selected onClick={() => this.props.updateHome(true)}><Script selected>Find</Script></Button> : <Button onClick={() => this.props.updateHome(true)}><Script>Find</Script></Button>}

        {this.props.home ? <Button onClick={() => this.props.updateHome(false)}><Script>Go</Script></Button> : <Button selected onClick={() => this.props.updateHome(false)}><Script selected>Go</Script></Button>}

      </FixToText>
    );
  }
}
