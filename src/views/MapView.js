import React, { Component } from 'react'
import {Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react'

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
    selectedPlace: [],
    showingInfoWindow: false
  }

/*  constructor(props){
        super(props);

        this.locations = [
            {title: 'Starbucks', location: {lat: 37.78609, lng: -122.453120}},
            {title: 'Cal-Mart', location: {lat: 40.7444883, lng: -73.9949465}},
            {title: 'Bryans', location: {lat: 37.786330, lng: -122.450830}},
            {title: 'Papyrus', location: {lat: 37.786100, lng: -122.455860}},
            {title: 'ACE Hardware', location: {lat: 37.786140, lng: -122.452330}}
        ]
    } */

  componentDidMount = () => {
    console.log(this.props.locations)
  }


  // sets map state and markers for location
  mapLoaded = (props, map) => {
    this.setState({map})
    this.setMarkers(this.props.locations)

  }

  onMarkerClick = (props, marker, e) => {
    // close active markers when new one opens
    this.onClose();
    this.setState({
      currentMarker: marker,
      selectedPlace: props,
      currentMarkerProps: props,
      showingInfoWindow: true
    })
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        currentMarker: null,
        selectedPlace: [],
      })
    }
  }

  setMarkers = (locations) => {
    if (!locations)
    return;

    this.state.markers.forEach(marker => marker.setMap(null));

    let markerProps = [];
    // create new markers iterating through locations object
    let markers = locations.map((location, index) => {
      let mProps = {
        key: index,
        title: location.title,
        position: location.location,
      };
      markerProps.push(mProps);

      // make markers
      let marker = new this.props.google.maps.Marker({
        position: location.location,
        map: this.state.map,
        animation: this.props.google.maps.Animation.Drop
      });
      marker.addListner('click', () => {
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

    let amProps = this.state.activeMarkerProps;

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
