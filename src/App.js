import React, { Component } from 'react';
import Map from './views/MapView'
import SearchMenu from './views/SearchMenu'
import locations from './data/locations.json'
import './App.css';

class App extends Component {

  state = {
    lat: 	37.786424,
    lng:  -122.451802,
    zoom: 16,
    location: locations
  }

/* constructor(props){
        super(props);

        this.locations = [
            {title: 'Starbucks', location: {lat: 37.78609, lng: -122.453120}},
            {title: 'Cal-Mart', location: {lat: 40.7444883, lng: -73.9949465}},
            {title: 'Bryans', location: {lat: 37.786330, lng: -122.450830}},
            {title: 'Papyrus', location: {lat: 37.786100, lng: -122.455860}},
            {title: 'ACE Hardware', location: {lat: 37.786140, lng: -122.452330}}
        ]
    } */
  toggleOpen = () => {
    let toggleButton = document.getElementById('toggle-button').classList
    let menu = document.getElementById('menu-wrap').classList
        toggleButton.toggle('open');
        menu.toggle('menu-open');
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">
          <h1>Laurel Village Neighborhood Shops</h1>
        </div>
        <section>
         <SearchMenu
            locations={this.state.location}
            toggleOpen={this.toggleOpen}/>
        </section>
        <section id='map'>
        <Map
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.location}
          />
        </section>

      </div>
    );
  }
}

export default App;
