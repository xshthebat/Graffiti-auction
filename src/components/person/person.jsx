import React, { Component } from 'react'
require('./person.styl');


function Personshow({ name, gamestate='getready',state = 'getready', callback, my }) {
  let stand = true;
  let persenwords = '...';
  let myclass = my ? 'my' : '';
  // console.log(state,gamestate);
  return (<div className="person" onClick={()=>callback({name,state})}>
    <i className={stand ? myclass + 'personstand' : myclass + 'person'}>
    <p className={'personwords'}>{persenwords}</p>
    </i>
    <i className={stand ? myclass + 'personstandbody' : myclass + 'personbody'}></i>
    <p className={'personname'}>{name}</p>
  </div>)
}
export default class Persons extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  personclick = ({name,state}) => {
    if(name===this.props.my&&this.props.gamestate==='getready'){
      //点自己
      // console.log(state,name);
      if(state==='getready'){
        //准备
        this.props.socket.emit('ready');
      } else{
        this.props.socket.emit('getready');
        //取消准备
      }
    } else{
      console.log('点别人');
    }
  }
  render() {
    let dom = this.props.persons.length ? (this.props.persons.map((item, index) => {
      if (!item.name) {
        if(this.props.gamestate!=='getready'){
          return ;
        }
        return <div className="noneperson" key={index}><i></i><p>等待...</p></div>
      }
      return <Personshow my={item.name === this.props.my} gamestate={this.props.gamestate} key={index} name={item.name} state={item.gamestate} callback={({name,state})=>{this.personclick({name,state})}} />
    })) : null
    return (
      <div className="userbox">
        {dom}
      </div>)
  }
}