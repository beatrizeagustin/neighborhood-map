import React, { Component } from 'react'
import ToggleButton from '../Components/ToggleButton'

class SearchMenu extends Component {
  state = {
    query: ''
  }


  updateQuery = (nQuery) => {
    // pass query to filtering()
    this.setState({ query: nQuery});
    this.props.filtering(nQuery);
};
  render() {
    return (
      <div id='searchMenu'>
      {/* Toggle component */}
        <ToggleButton
          toggleOpen={this.props.toggleOpen}/>
      {/* Menu */}
        <div id='menu-wrap' className="menu-wrap">
          <div className="menu-sidebar">
            <input
              className="searchInput"
              onChange={e => this.updateQuery(e.target.value)}
              value={this.state.query}
              type="text"
              placeholder="Filter Search"
              name="filter"/>
            {/* results */}
            <ul className="menu">
              {this.props.locations && this.props.locations.map((location, i) => {
                return (
                  <li key={i}>
                    <button
                      key={i}
                      onClick={e => this.props.clickList(i)}
                      className="locationBtn">
                        {location.name}</button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchMenu
