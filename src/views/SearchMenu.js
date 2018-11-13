import React, { Component } from 'react'
import ToggleButton from '../Components/ToggleButton'

class SearchMenu extends Component {
  state = {
    query: ''
  }


  updateQuery = (query) => {
    this.setState({ query: query})
};
  render() {
    return (
      <div id='searchMenu'>
        <ToggleButton
          toggleOpen={this.props.toggleOpen}/>

        <div id='menu-wrap' className="menu-wrap">
          <div className="menu-sidebar">
            <ul className="menu">
              <li><a href="#"><i className="material-icons">account_circle</i>home</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchMenu
