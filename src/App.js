import React, { Component } from 'react';
import Map from './views/MapView'
import SearchFilter from './views/SearchFilter'
import './App.css';

class App extends Component {
  state = {
    lat: 	37.786090,
    lng:  -122.453120,
    zoom: 15,
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Laurel Village Neighborhood Shops</h1>
        </div>
        <section id='map'>
        <Map
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}/>
        </section>
      </div>
    );
  }
}

export default App;
