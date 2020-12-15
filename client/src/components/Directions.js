/* eslint-disable react/prop-types */
import React, { Component } from "react";
import styled from "styled-components";
import googleAPI from "./googleAPI";

const placeHolderOrigin = [47.611981, -122.345618];

const { compose, withProps, lifecycle } = require("recompose");

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${googleAPI}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `90%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: new google.maps.LatLng(...this.props.origin),
          destination: new google.maps.LatLng(...this.props.destination),
          // origin: new google.maps.LatLng(41.8507300, -87.6512600),
          // destination: new google.maps.LatLng(41.8525800, -87.6514100),
          travelMode: google.maps.TravelMode.WALKING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  })
)(props => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(41.85073, -87.65126)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

export default class Directions extends Component {
  render() {
    return (
      <MapWithADirectionsRenderer
        origin={this.props.origin}
        destination={this.props.destination}
      />
    );
  }
}
