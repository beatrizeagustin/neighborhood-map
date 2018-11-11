import React, { Component } from 'react'
import {Map, GoogleApiWrapper } from 'google-maps-react'

// tutorial from https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
// and theinfinitemonkey github

const styles = {
  width: '100%',
  height: '75%'
}

class MapView extends Component {
  state = {
    /* so no location markers applies to map during load */
    map: null,
    marker: [],
    markerProps: [],
    currentMarker: null,
    currentMarkerProps: null,
    InfoWindowDisplay: false
  }

  componentDidMount = () => {

  }

  mapReady = (props, map) => {
    this.setState({map});
    this.updateMarkers(this.props.location)
  }

  loadedMap = (props, map) => {
    this.setState({map})
  }

  render() {
    const center = {
      lat: this.props.lat,
      lng: this.props.lng
    }
    return (
      <Map
        google={this.props.google}
        onReady={this.loadedMap}
        role='application'
        aria-label='map'
        zoom={this.props.zoom}
        style={styles}
        initialCenter={center}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCiFdRLOziH2iNRsSM-IGe0oo2CllZs6tA'
})(MapView)
