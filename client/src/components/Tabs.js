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
    font-size: 15;
    align-self: center;
`
const ButtonSelected = styled.button`
    background-color: lightgrey;
    width: 100%;
    height: 100%;
    display: block;
  `
const Button = styled.button`
    background-color: beige;
    width: 100%;
    height: 100%;
    display: block;

  `

//currently wrapped in div, prob need to be button as default
export default class Tabs extends Component {
  render() {
    return (
      <FixToText>
        {this.props.home ? <ButtonSelected onClick={() => this.props.updateHome(true)}><Script>Find</Script></ButtonSelected> : <Button onClick={() => this.props.updateHome(true)}><Script>Find</Script></Button>}

        {this.props.home ? <Button onClick={() => this.props.updateHome(false)}><Script>Go</Script></Button> : <ButtonSelected onClick={() => this.props.updateHome(false)}><Script>Find</Script></ButtonSelected>}

      </FixToText>
    );
  }
}
