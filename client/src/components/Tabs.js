/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';


const FixToText = styled.div`
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: '10%',
    fontSize: 50,
  `
const ButtonSelected = styled.button`
    backgroundColor: 'lightgrey',
    width: '50%',
    height: '100%',
  `
const Button = styled.button`
    backgroundColor: 'beige',
    width: '50%',
    height: '100%',
  `
const Script = styled.h1`
    fontSize: 15,
    alignSelf: 'center',
    marginTop: '15%',
`
//currently wrapped in div, prob need to be button as default
export default class Tabs extends Component {
  render() {
    return (
      <FixToText>
        {this.props.home ? <ButtonSelected onClick={() => this.props.updateHome(true)}><Script>Find</Script></ButtonSelected> : <Button onClick={() => this.props.updateHome(true)}><Script>Find</Script></Button>}

        {this.props.home ? <Button onClick={() => this.props.updateHome(false)}><Script>GOAT</Script></Button> : <ButtonSelected onClick={() => this.props.updateHome(false)}><Script>Find</Script></ButtonSelected>}

      </FixToText>
    );
  }
}
