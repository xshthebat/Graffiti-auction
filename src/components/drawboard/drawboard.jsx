import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control } from 'react-keeper';
import Timeback from '../base/Timeback'
import { gamestart } from '../../store/actions'
require('./drawboard.styl');
class Drawboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 6,
      color: '#000000'
    }
    this.colormap = ['#000000', '#e11b5e', '#ff9800', '#FFFF00', '#8bc34a', '#00BCD4', '#2196F3']
  }
  componentDidMount() {
    console.log(this);
    let barWidth = this.refs.bar.clientWidth / 2;
    let allWidth = Math.ceil(this.refs.all.offsetWidth);
    this.left = barWidth;
    this.refs.bar.style.left = `${this.left}px`;
    this.right = allWidth - barWidth;
  }
  componentWillUnmount() {
    console.log('画画结束,上传');
  }
  back = () => {
    //改变状态
    this.props.gamestart('finishdraw')
  }
  start = (e) => {
    this.startX = e.touches[0].pageX - (parseInt(this.refs.bar.style.left.split('px')[0]));
  }
  move = (e) => {
    let left = e.touches[0].pageX - this.startX;
    if (left <= this.left) {
      left = this.left;
    }
    if (left >= this.right) {
      left = this.right
    }
    this.changebar(left);
  }
  changebar(x) {
    this.refs.bar.style.left = `${x}px`;
    this.refs.sizeg.style.width = `${x - this.left}px`;
    let size = Math.floor((x / this.right) * 24) > 4 ? Math.floor((x / this.right) * 24) : 6;
    this.setState({ size: size });
  }
  changecolor(index){
    this.setState({color:this.colormap[index]},()=>{
      console.log(this.state.color)
    });
  }
  render() {
    return (
      <div className="drawboard">
        <div className="drawhead">
          <i className="drawboardback" onClick={this.back}></i>
          <div className="drawboardtime"><Timeback time={this.props.time} show={true}></Timeback></div>
          <p className="drawfinish">完成</p>
        </div>
        <div className="drawname">

        </div>
        <div className="drawbox">

        </div>
        <div className="drawbottom">
          <div className="drawcolor">
            <ul className="colormap">
                {this.colormap.map((item, index) => {
                  return (<li style={{ backgroundColor: item }} key={index} onClick={()=>{this.changecolor(index)}}></li>)
                })}
            </ul>
          </div>
          <div className="handle">
            <div className="handle_left">
              <div className="point_size">
                <i style={{ width: `${this.state.size}px`, height: `${this.state.size}px`, backgroundColor: `${this.state.color}` }}></i>
              </div>
              <div className="size_handle" onTouchStart={this.start} onTouchMove={this.move}>
                <i className="size_progress" ref="sizeg" style={{ borderColor: `${this.state.color}` }}></i>
                <i className="size_bar" ref="bar" style={{ backgroundColor: `${this.state.color}` }}></i>
                <i className="all_progress" ref="all"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateProps = (state, ownProps) => ({
  personname: state.personname,
  person: state.person,
  state: state.state,
  time: state.time
})
const mapDispatchToProps = {
  gamestart
}
export default connect(mapStateProps, mapDispatchToProps)(Drawboard);