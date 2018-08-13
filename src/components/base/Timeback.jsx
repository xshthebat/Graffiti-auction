import React from 'react';
import ('./Timeback.styl')
export default function Timeback({ time, show }) {
  if (!show) {
    return null;
  }
  return (<div className="timeback"><i></i><p className="p1"></p> <p className="p2"></p><p className="p3"></p><p className="timeword">{time}S</p></div>)
}