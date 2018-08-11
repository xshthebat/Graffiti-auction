import React, { Component } from 'react';
import Iscroll from 'iscroll'
require('./Timer.styl');
export default class Timer extends Component{
  constructor(props){
    super(props);
    this.state = {
      swiper:[]
    }
  }
  componentDidMount(){
    // this._inittimer();
  }//调用初始化方法
  shouldComponentUpdate(nextprop){
    if(this.props.time===nextprop.time){
      return false;
    } else{
      return true;
    }
  }
  componentDidUpdate(){
    console.log('haha重新熏染');
    // this._inittimer();
  }
  _inittimer = ()=>{
    console.log('重新初始化组件');
    let timerarr = [null,null,null];
    // timerarr[0] = this.position!==-1?new Iscroll(this.refs.positiondom,{
    //   scrollY:true
    // }):null
    // timerarr[1] = this.ten!==-1?new Iscroll(this.refs.tendom,{
    //   scrollY:true
    // }):null
    // timerarr[2] = this.hundred!==-1?new Iscroll(this.refs.hundredom,{
    //   scrollY:true
    // }):null
    this.setState({swiper:timerarr},()=>{
      console.log(this.state.swiper);
    })
  }
  render(){
    //判断位数;
    let hundredom,tendom,positiondom;
    this.position = -1;
    this.ten = -1;
    this.hundred = -1;
    if(this.props.time>=100){
      this.numlength = 3;
      this.position = this.props.time%100%10;
      this.ten = Math.floor(this.props.time%100/10);
      this.hundred = Math.floor(this.props.time/100);
      positiondom = Array(10).fill(1).map((val,index)=>{
        return (<div className="color" key={index}>
                  <p>{10-index-1}</p>
               </div>)
      })
      tendom = Array(10).fill(1).map((val,index)=>{
        return (<div className="color" key={index}>
                  <p>{10-index-1}</p>
               </div>)
      })
      hundredom = Array(10).fill(1).map((val,index)=>{
        return (<div className="color" key={index}>
                  <p>{10-index-1}</p>
               </div>)
      })
    } else if(this.props.time>10){
      this.numlength = 2;
      this.position = this.props.time%10;
      this.ten = Math.floor(this.props.time/10);
      positiondom = Array(10).fill(1).map((val,index)=>{
        return (<div className="color" key={index}>
                  <p>{10-index-1}</p>
               </div>)
      })
      tendom = Array(10).fill(1).map((val,index)=>{
        return (<div className="color" key={index}>
                  <p>{10-index-1}</p>
               </div>)
      })
    } else {
      this.numlength = 1;
      this.position = this.props.time;
     
      positiondom = Array(10).fill(1).map((val,index)=>{
        return (<div className="color" key={index}>
                  <p>{10-index-1}</p>
               </div>)
      })
    }
    return (
    <div className = "Timer" >
        {hundredom?(<div className="hundredom" ref="hundredom"><div>{hundredom} </div></div>):null}
        {tendom?(<div className="tendom" ref="tendom"><div>{tendom} </div></div>):null}
        {positiondom?(<div className="positiondom" ref="positiondom"><div>{positiondom} </div></div>):null}

    </div>
    )
  }
}
// function Timename ({dom,name}){
//   if(!dom){
//     return null;
//   }
//   return (
//     <div className={name}>
//       <div>
//         {dom}
//       </div>
//     </div>
//   )
// }