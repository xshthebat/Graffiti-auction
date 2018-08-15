import React, { Component } from 'react';
require('./Timer.styl');
export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    //判断位数;
      return (
        <div className="Timer">
         <p>{this.props.time-1}</p>
        </div>
      )
  }
}