import React, { Component } from 'react'

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
        {/* hamburger animated icon */}
        <span className="toggle-button">
          <div className="menu-bar bar-top"></div>
          <div className="menu-bar bar-middle"></div>
          <div className="menu-bar bar-bottom"></div>
        </span>

        <div class="menu-wrap">
          <div class="menu-sidebar">
            <ul class="menu">
              <li><a href="#"><i class="material-icons">account_circle</i>home</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchMenu
