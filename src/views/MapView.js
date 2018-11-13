import React, { Component } from 'react'
import { GoogleApiWrapper, Map, InfoWindow } from 'google-maps-react'

// tutorial from https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
// and theinfinitemonkey github

const FSCLIENT = '11HUZWWZBSADCCJDO1P0KMUPT142BN4JIAMO4BKNEO03KAD2'
const FSSECRET = 'ST31PITHE3B31A2FHGCXFLN2GGEVXHGBZCWAXYHHSGXT5NNC'
const FSVERSION = '20181112'

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

  getVenueInfo = (props, data) => {
    // compare FS data to markers
    return data.response.venues.filter(item =>
      item.name.includes(props.name) || props.name.includes(item.name));
  }
  // sets states for InfoWindow
  onMarkerClick = (props, marker, e) => {
    // opens markers and closes when new markers are opened
    this.onClose();
    // fetch FS data for photos
    // ***** remove position, follow where props is coming
   //  let position = this.props.locations.location
    let url = `https://api.foursquare.com/v2/venues/search?client_id=${FSCLIENT}&client_secret=${FSSECRET}&v=${FSVERSION}&radius=100&ll=${props.position.lat},${props.position.lng}&llAcc=100`
    let headers = new Headers();
		let request = new Request(url, {
			method: 'GET',
			headers
    });
      // *** Needs work -- read FS DOC
      let currentMarkerProps
      fetch(request).then(response => response.json()).then(result => {
        let shops = this.getVenueInfo(props, result);
        currentMarkerProps = {
          ...props,
          foursquare: shops[0]
        };
        // setting state for data and get images for each shop
        if (currentMarkerProps.foursquare) {
          let url = `https://api.foursquare.com/v2/venues/${shops[0].id}/photos?client_id=${FSCLIENT}&client_secret=${FSSECRET}&v=${FSVERSION}`
          fetch(url).then(response => response.json()).then(result => {
            currentMarkerProps = {
              ...currentMarkerProps,
              images: result.response.photos
            };
            if (this.state.currentMarker)
              this.state.currentMarker.setAnimation(null);
              marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
              this.setState({
                currentMarker: marker,
                showingInfoWindow: true,
                currentMarkerProps });
          });
        } else {
          marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
          this.setState({
            currentMarker: marker,
            showingInfoWindow: true,
            currentMarkerProps
          })
        }
      });
  }


  // resets InfoWindow
  onClose = props => {
    // closes active marker and stops animations
    if (this.state.showingInfoWindow) {
      this.state.currentMarker.setAnimation(null);
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
    // removes any existing markers on load
    this.state.markers.forEach(marker => marker.setMap(null));

    let markerProps = [];
    // create new markers iterating through locations (json) object
    let markers = locations.map((location, i) => {
      let mProps = {
        key: i,
        name: location.name,
        position: location.location
      };
      // add new props to markerProps
      markerProps.push(mProps);

      // make new markers object with values from objects in location (in json)
      let marker = new this.props.google.maps.Marker({
        position: location.location,
        map: this.state.map,
        animation: this.props.google.maps.Animation.DROP
      });
      // call onMarkerClick for new markers
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

    const styles = {
      width: '100%',
      height: '75%'
    }
    // set currentMarkerProps to variable to avoid repetition
    // ******* amProps is null
    let amProps = this.state.currentMarkerProps;
    console.log(amProps)
    return (
      // components from google-maps-react pkg
      <Map
        google={this.props.google}
        onReady={this.mapLoaded}
        role='application'
        aria-label='map'
        zoom={this.props.zoom}
        style={styles}
        initialCenter={center}
      >
      {/* iterate through locations to create markers
      {this.props.locations.map((location, i) => (
              <Marker
                key={i}
                onClick={this.onMarkerClick}
                title={location.name}
                position={location.location}
              />
			))}
       <Marker
        onClick={this.onMarkerClick}
        /> */}
        <InfoWindow
        marker={this.state.currentMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
        >
          <div>
            {/* compare data from json to FS and use json as fallback */}
            <h4>{amProps && amProps.name}</h4>
            {amProps && amProps.url ? (<a href={amProps.url}>site</a>) : ''}
            {amProps && amProps.images ? (<div>
              <img
                alt={amProps.name + " food picture"}
                src={amProps.images.items[0].prefix + "100x100" + amProps.images.items[0].suffix}/>
                <p>Image from Foursquare</p>
              </div>) : ""}
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCiFdRLOziH2iNRsSM-IGe0oo2CllZs6tA'
})(MapView)
