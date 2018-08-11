import React, { Component } from 'react';
import Messagebox from '../Messagebox/Messagebox';
import Messageinput from '../Messageinput/Messageinput';
import axios from "axios";
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { updataperson, gamestart } from '../../store/actions'
import Timer from '../Timer/Timer'
require('./Gameroom.styl')

function Timeback({ time, show }) {
  if (!show) {
    return null;
  }
  return (<div className="timeback"><i></i><p className="p1"></p> <p className="p2"></p><p className="p3"></p><p className="timeword">{time}S</p></div>)
}
function Readybutton({ state, click, show }) {
  if (!show) {
    return null;
  }
  let text = '准备';
  if (state) {
    if (state.gamestate === 'ready') {
      text = '取消';
    }
  }
  return (
    <div className="readybutton" onClick={click}>
      <div className="buttondot">
        <div className="buttondot2">
          <div className="buttondot3">{text}</div>
        </div>
      </div>
    </div>
  )
}
function Text({ text }) {
  return (<p className="text">{text}</p>)
}
class Gameroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      room: null,
      position: null,
      time: 30,
      myself: null,
      myindex: -1,
      timm:120
    }
  }
  componentWillMount() {
    console.log(this.props);
    if (this.props.personname === '') {
      this.props.history.push('/');
      return;
    }
    axios.get('http://localhost:8881/getroom').then(res => {
      let socket = io.connect('ws://localhost:8881');
      this.setState({ socket: socket, room: res.data.room, position: res.data.position })
      socket.on('connect', () => {
        socket.emit('joinroom', { room: res.data.room, position: res.data.position, name: this.props.personname });
      })
      socket.on('getpersons', (data) => {
        this.props.updataperson(data);
      })
      socket.on('gamestart', () => {
        console.log('游戏开始 初始化');
        console.log(this.props.person[this.state.myindex]);
        this.props.gamestart('gamestart');
      })
    })
  }
  componentWillReceiveProps(next) {
    let thename = next.personname;
    let persons = next.person;
    let back = false;
    persons.forEach((person, index) => {
      if (person.name === thename) {
        console.log(person.name, thename);
        this.setState({ myself: person, myindex: index }, () => {
          if (this.timer) {
            clearInterval(this.timer)
          }
          this.timer = setInterval(() => {
            let time = this.state.time;
            time = time - 1;
            if (this.state.myself.gamestate !== 'ready') {
              back = true;
            }
            if (!back) {
              clearInterval(this.timer);
              this.setState({timm:20});
              this.pause = true;
              return;
            }
            if (this.state.time === 0 && back) {
              this.state.socket.close();
              this.props.history.push('/');
              return;
            }
            if (this.state.myself.gamestate === 'getready' && next.state === 'getready' && this.pause) {
         
              this.timer = setInterval(() => {
                let time = this.state.time;
                time = time - 1;
                this.setState({ time: time }, () => {
                  if (this.state.myself.gamestate !== 'ready') {
                    back = true;
                  }
                  if (!back) {
                    clearInterval(this.timer);
                    this.pause = true;
                  }
                  if (this.state.time === 0 && back) {
                    clearInterval(this.timer);
                    this.state.socket.close();
                    console.log('退出');
                    this.props.history.push('/');
                  }
                })
              }, 1000);
              return ;
            }
            this.setState({ time: time });
          }, 1000);
        })
      }
    })
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  back = () => {
    this.state.socket.close();
    this.props.history.push('/');
  }
  readclick = () => {
    if (this.state.myself.gamestate === 'getready') {
      //准备
      this.state.socket.emit('ready');
    } else {
      this.state.socket.emit('getready');
      //取消准备
    }
  }
  gettext = () => {
    if (!this.state.myself) {
      return '请玩家准备'
    }
    if (this.props.state === 'getready') {
      //准备阶段
      if (this.state.myself.gamestate === 'getready') {
        return '请玩家准备';
      } else {
        return '至少n名玩家准备游戏即可开始'
      }
    }
    if (this.props.state === 'gamestart') {
      return '游戏马上开始'
    }
  }
  timeshow = () => {
    if (this.props.state === 'getready') {
      //准备阶段
      return true
    }
    clearInterval(this.timer);
    return false
  }
  render() {
    return (
      <div className="Gameroom">
        <i className="back" onClick={this.back}></i>
        <Timeback time={this.state.time} show={this.timeshow()} />
        <p className="roomnumber">{`${this.state.room}号房间`}</p>
        <Text text={this.gettext()} />
        <div className="theTimer"> 
        <Timer time={this.state.timm}></Timer>
        </div>
        <Readybutton state={this.state.myself} click={() => { this.readclick() }} show={this.timeshow()} />
        <Messagebox socket={this.state.socket} />
        <Messageinput socket={this.state.socket} />
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
  updataperson,
  gamestart
}
export default connect(mapStateProps, mapDispatchToProps)(Gameroom);