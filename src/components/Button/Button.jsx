import React, { Component } from 'react'
require('./Button.styl')
export default class Button extends Component {

  render() {
    return (
      <button className="button" onClick={this.props.callback}><span>{this.props.name}</span></button>
    )
  }
}
