import React, { Component } from 'react'

class ToggleButton extends Component {
  render() {
    return (
      <div>
      {/* hamburger animated icon */}
      <span id="toggle-button" className="toggle-button" onClick={this.props.toggleOpen}>
        <div className="menu-bar bar-top"></div>
        <div className="menu-bar bar-middle"></div>
        <div className="menu-bar bar-bottom"></div>
      </span>
      </div>
    )
  }
}

export default ToggleButton
