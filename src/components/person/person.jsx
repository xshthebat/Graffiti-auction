import React, { Component } from 'react'
import { connect } from 'react-redux';
import { settip, setpropsindex } from '../../store/actions'
require('./person.styl');


function Personshow({ name, gamestate, state = 'getready', callback, index, money }) {
  let personstr='';
  console.log('---------------------------',gamestate);
  if(gamestate==='getready'){
    personstr=state==='getready'?'请准备':'准备'
  } else if(gamestate==='gamestart'){
    personstr='...';
  } else if(gamestate==='drawstart'){
    personstr='绘画开始';
  }else if(gamestate==='drawend'){
    personstr='已经画完啦';
  } else if(gamestate==='buystart'){
    personstr=money;
  }
  return (
    <div className="person" onClick={() => callback({ name, state, index })}>
      <div className={'personimg'}>
        <i className={`personicon personicon${index + 1}`}></i>
        <div className="person_name"><span>{name}</span></div>
      </div>
      <p className="personstr">{personstr}</p>
    </div>
  )
}
class Persons extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.flag =2;
  }
  personclick = ({ name, state, index }) => {
    if (this.props.gamestate === 'getready') {
      return ;
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
            setTimeout(() => {
              this.props.socket.emit('freeze', this.props.propsindex);
              console.log('冰冻', this.props.propsindex);
            }, 0);
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
          return <div className="noneperson" key={index}></div>;
        }
        return <div className="noneperson" key={index}><i></i><p>等待中</p></div>
      }
      return <Personshow my={item.name === this.props.my} money={item.money} gamestate={this.props.gamestate} index={index} key={index} name={item.name} state={item.gamestate} callback={({ name, state, index }) => { this.personclick({ name, state, index }) }} />
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