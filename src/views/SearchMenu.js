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
        <span id="toggle-button" className="toggle-button" onClick={this.props.toggleOpen}>
          <div className="menu-bar bar-top"></div>
          <div className="menu-bar bar-middle"></div>
          <div className="menu-bar bar-bottom"></div>
        </span>

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
