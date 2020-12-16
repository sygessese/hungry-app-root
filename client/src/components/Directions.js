/* eslint-disable react/prop-types */
import React, { Component } from "react";
import googleAPI from "./googleAPI";

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
  <GoogleMap defaultZoom={13} defaultCenter={new google.maps.LatLng(...props.origin)}>
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

export default class Directions extends Component {
  render() {
    return <MapWithADirectionsRenderer origin={this.props.origin} destination={this.props.destination} />;
  }
}
