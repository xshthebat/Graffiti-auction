import React, { Component } from 'react'
import {connect} from 'react-redux';
import Persons from '../person/person';
require('./Messagebox.styl');
function Audioplay({item,click}){
  return (<div className="audioplay"><p>{item.name}:</p><i onClick={()=>{click(item.src)}}></i></div>)
}
class Messagebox extends Component {
  constructor(props){
    super(props);
    this.state = {
      message:[],
      currentsrc:''
    }
    this.flag = false;
  }
  componentWillReceiveProps(next){
    if(!this.flag){
      this.flag = true;
      next.socket.on('sendmessage', (data) => {
        //语言添加逻辑
        let message = this.state.message.slice(0);
        message.push(data);
        this.setState({message:message},()=>{
          if(this.refs.scroll.clientHeight<this.refs.scrollbox.clientHeight){
            this.refs.scroll.scrollTop = this.refs.scrollbox.clientHeight - this.refs.scroll.clientHeight
          }
        });
      })
      next.socket.on('sendvideo', (src) => {
        let message = this.state.message.slice(0);
        let name = src.split(':')[0];
        let url = `http://localhost:8881\\${src.split('public\\')[1]}`;
        message.push({name:name,src:url});
        this.setState({message:message},()=>{
          if(this.refs.scroll.clientHeight<this.refs.scrollbox.clientHeight){
            this.refs.scroll.scrollTop = this.refs.scrollbox.clientHeight - this.refs.scroll.clientHeight
          }
        });
      });
    }
  }
  play=  (src) =>{
    this.refs.audio.src = src;
  }
  startplay = ()=>{
      this.refs.audio.play();
      this.setState({currentsrc:this.refs.audio.src},()=>{
      
      });
  }
  playend = ()=>{
    this.setState({currentsrc:''});
  }
  render() {
    let lidom = this.state.message.map((item, index) => {
      if(typeof item === 'string'){
          return (<li key={index} className="message_li">{item}</li>)
      } else{
        return (<li key={index}  className ={'message_li'} ><Audioplay item={item} click={this.play}/></li>);
      }
    })
    return (
      <div className="messagebox">
        <div className= "message_box" ref="scroll">
          <ul className= "message_ul" ref="scrollbox">
            {lidom}
          </ul>  
        </div>
        <Persons persons={this.props.person} my={this.props.my} socket={this.props.socket} gamestate={this.props.gamestate}/>
        <audio ref="audio" onCanPlay = {this.startplay} onEnded = {this.playend}></audio>
      </div>
    )
  }
}


const mapStateProps = (state,ownProps)=>({
  person:state.person,
  my:state.personname,
  gamestate:state.state
})
const mapDispatchToProps = {
  
}
export default connect(mapStateProps,mapDispatchToProps)(Messagebox);