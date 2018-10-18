import React, { Component } from 'react'
import { connect } from 'react-redux';
import { settip, setpropsindex } from '../../store/actions'
require('./person.styl');


function Personshow({ name, gamestate = 'getready', state = 'getready', callback, my, index }) {
  let stand = true;
  let persenwords = '...';
  let myclass = my ? 'my' : '';
  // console.log(state,gamestate);
  return (<div className="person" onClick={() => callback({ name, state, index })}>
    <i className={stand ? myclass + 'personstand' : myclass + 'person'}>
      <p className={'personwords'}>{persenwords}</p>
    </i>
    <i className={stand ? myclass + 'personstandbody' : myclass + 'personbody'}></i>
    <p className={'personname'}>{name}</p>
  </div>)
}
class Persons extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  personclick = ({ name, state, index }) => {
    if (this.props.gamestate === 'getready') {
      //准备阶段
      if (name === this.props.my) {
        if (state === 'getready') {
          //准备
          this.props.socket.emit('ready');
        } else {
          this.props.socket.emit('getready');
          //取消准备
        }
      } else {
        console.log('点别人')
      }
    } else if (this.props.gamestate === 'buystart') {
      if (name === this.props.my) {
        this.props.settip({ show: true, message: '请对别人使用' });
      } else {
        if (this.props.propstate === 'pin') {
          console.log(index);
          if (index === this.props.personindex) {
            this.props.settip({ show: true, message: '请对别人使用' });
          } else if (index === this.props.imggetter.position - 1) {
            this.props.settip({ show: true, message: '对方不能在此回合叫价' });
          } else {
            // this.props.socket.emit('pin',index);
            if (this.props.propsindex !== index) {
              this.props.setpropsindex(index);
            }
            this.props.settip({ show: true, message: '请选择叫价金额' });
          }
        } else if (this.props.propstate === "freeze") {
          console.log(index);
          if (index === this.props.personindex) {
            this.props.settip({ show: true, message: '请对别人使用' });
          } else if (index === this.props.imggetter.position - 1) {
            this.props.settip({ show: true, message: '对方本回合不用叫价' });
          } else {
            if (this.props.propsindex !== index) {
              this.props.setpropsindex(index);
            }
            setTimeout(()=>{
              this.props.socket.emit('freeze', this.props.propsindex);
              console.log('冰冻', this.props.propsindex);
            },0);
          }
        } else {
          this.props.settip({ show: true, message: '请先选择道具' })
        }
      }
    }
  }
  render() {
    let dom = this.props.persons.length ? (this.props.persons.map((item, index) => {
      if (!item.name) {
        if (this.props.gamestate !== 'getready') {
          return null;
        }
        return <div className="noneperson" key={index}><i></i><p>等待...</p></div>
      }
      return <Personshow my={item.name === this.props.my} gamestate={this.props.gamestate} index={index} key={index} name={item.name} state={item.gamestate} callback={({ name, state, index }) => { this.personclick({ name, state, index }) }} />
    })) : null
    return (
      <div className="userbox">
        {dom}
      </div>)
  }
}

const mapStateProps = (state) => ({
  person: state.person,
  personindex: state.personindex,
  propstate: state.propstate,
  imggetter: state.imggetter,
  propsindex: state.propsindex
})
const mapDispatchToProps = {
  settip,
  setpropsindex
}
export default connect(mapStateProps, mapDispatchToProps)(Persons);