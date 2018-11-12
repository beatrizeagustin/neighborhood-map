import React, { Component } from 'react'
import {Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react'

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
    markers: [],
    markerProps: [],
    currentMarker: null,
    currentMarkerProps: null,
    showingInfoWindow: false
  }

  componentDidMount = () => {
    console.log(this.props.locations)
  }

  // sets map state and markers for location
  mapLoaded = (props, map) => {
    this.setState({map})
    this.setMarkers(this.props.locations)

  }

  onMarkerClick = (props, marker, e) => {
    // opens markers and closes when new markers are opened
    this.onClose();
    this.setState({
      currentMarker: marker,
      currentMarkerProps: props,
      showingInfoWindow: true
    })
  }

  onClose = props => {
    // closes active markers
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        currentMarkerProps: null,
        currentMarker: null,
      })
    }
  }

  setMarkers = (locations) => {
    if (!locations)
    return;

    this.state.markers.forEach(marker => marker.setMap(null));

    let markerProps = [];
    // create new markers iterating through locations object
    let markers = locations.map((location, i) => {
      let mProps = {
        key: i,
        title: location.title,
        position: location.location
      };
      markerProps.push(mProps);

      // make new markers object
      let marker = new this.props.google.maps.Marker({
        position: location.location,
        map: this.state.map,
        animation: this.props.google.maps.Animation.DROP
      });
      marker.addListener('click', () => {
        this.onMarkerClick(mProps, marker, null)
      });
      return marker;
    })
    this.setState({
      markers,
      markerProps
    })
  }

  render() {
    const center = {
      lat: this.props.lat,
      lng: this.props.lng
    }
    // set currentMarkerProps to variable to avoid repetition
    let amProps = this.state.currentMarkerProps;

    return (
      <Map
        google={this.props.google}
        onReady={this.mapLoaded}
        role='application'
        aria-label='map'
        zoom={this.props.zoom}
        style={styles}
        initialCenter={center}
      >
    {/*   <Marker
        onClick={this.onMarkerClick}

        /> */}
        <InfoWindow
        marker={this.state.currentMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
        >
          <div>
            <h4>{amProps && amProps.title}</h4>
            {amProps && amProps.url ? (<a href={amProps.url}>site</a>) : ''}
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCiFdRLOziH2iNRsSM-IGe0oo2CllZs6tA'
})(MapView)
