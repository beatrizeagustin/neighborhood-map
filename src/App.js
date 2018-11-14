import React, { Component } from 'react';
import Map from './views/MapView'
import SearchMenu from './views/SearchMenu'
import locations from './data/locations.json'
import './App.css';
// tutorial from theinfinitemonkey @ github
class App extends Component {

  state = {
    lat: 	37.786424,
    lng:  -122.451802,
    zoom: 16,
    location: locations,
    open: false,
    filtered: null
  }
  // check if component mounted and push locations value to filtered
  componentDidMount = () => {
    this.setState({
      ...this.state,
      filtered: this.filtering(this.state.location, '')
    });
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
    // toggle button and menu animation open
    let toggleButton = document.getElementById('toggle-button').classList
    let menu = document.getElementById('menu-wrap').classList
        toggleButton.toggle('open');
        menu.toggle('menu-open');
    this.setState({
      // sets opposite of open's state
      open: !this.state.open
    })

  }
  // update query and adding filtered locations, indexKey
  updateQuery = (query) => {
    this.setState({
      ...this.state,
      indexKey: null,
      filtered: this.filtering(this.state.location, query)
    });
  }
  // filtering locations to match user query
  // needs toLowerCase!
  filtering = (locations, query) => {
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  clickList = (index) => {
    this.setState({
      indexKey: index,
      open: !this.state.open
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">
          <h1>Laurel Village Neighborhood Shops</h1>
        </div>
        <section id="SearchMenu">
        <SearchMenu
          open={this.state.open}
          locations={this.state.filtered}
          toggleOpen={this.toggleOpen}
          filtering={this.updateQuery}
          clickList={this.clickList}
          />
        </section>
        <section id='map'>
        <Map
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.filtered}
          indexKey={this.state.indexKey}
          />
        </section>

      </div>
    );
  }
}

export default App;
