import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Control} from 'react-keeper';
import Timeback from '../base/Timeback'
require('./drawboard.styl');
class Drawboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      size:24,
      color:'#000000'
    }
  }
  componentWillMount(){
    // if(this.props.state!=='drawstart'){
    //   // this.props.history.push('/');
    //   Control.go('/home')
    //   return;
    // }
    // else{
    //   console.log('测试');
    //   // this.props.history.push('/gameroom');
    //   // Control.go('/gameroom')
    //   // setTimeout(()=>{
    //   //   Control.go('/gameroom')
    //   // },10000)
    // }
  }
  componentMounted(){
    console.log(this);
  }
  back(){
    Control.go('/gameroom');
  }
  move(){
    console.log('haha');
  }
  render(){
    return (
    <div className = "drawboard">
      <div className="drawhead">
        <i className="drawboardback" onClick={this.back}></i>
        <div className="drawboardtime"><Timeback time={120} show={true}></Timeback></div>
        <p className="drawfinish">完成</p>
      </div> 
      <div className="drawbottom">
        <div className="drawcolor"></div>
        <div className="handle">
          <div className="handle_left">
            <div className="point_size">
              <i style={{width:`${this.state.size}px`,height:`${this.state.size}px`}}></i> 
            </div>
            <div className="size_handle" onTouchMove={()=>{this.move()}}>
              <i className="size_progress"></i> 
              <i className="size_bar" ref="bar"></i> 
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
  state: state.state
})
const mapDispatchToProps = {
}
export default connect(mapStateProps, mapDispatchToProps)(Drawboard);