import React, { Component } from 'react';
import Messagebox from '../Messagebox/Messagebox';
import Messageinput from '../Messageinput/Messageinput';
import axios from "axios";
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { updataperson, gamestart,setime,setindex,setroom,setimgs,setimgindex,setimgpirce,setgetters,settip,reset, setpropsindex, setpropstate} from '../../store/actions'
import Timer from '../Timer/Timer'
import {Control} from 'react-keeper';
import Timeback from '../base/Timeback';
import Gamebotton from '../base/gamebotton/Gamebotton';
import Bank from '../bank/Bank';
import Props from '../Props/Props';
require('./Gameroom.styl')

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
      bankshow:false,
      propshow:false,
      freeze:false
    }
  }
  componentWillMount() {
    //这里要考虑很多 尤其是 gamestate
    if (this.props.personname === '') {
      // this.props.history.push('/');
      Control.go('/home');
      return;
    }
    this.props.gamestart('getready');
    axios.get('http://localhost:8881/getroom').then(res => {
      let socket = io.connect('ws://localhost:8881');
      this.props.setroom(res.data.room);
      this.setState({ socket: socket, room: res.data.room, position: res.data.position })
      socket.on('connect', () => {
        socket.emit('joinroom', { room: res.data.room, position: res.data.position, name: this.props.personname });
      })
      socket.on('getpersons', (data) => {
        this.props.updataperson(data);
      })
      socket.on('getmoney',(data)=>{
        this.setState({bankshow:false});
      })
      socket.on('gamestart', () => {
        console.log('游戏开始 初始化');
        console.log(this.props.person[this.state.myindex]);
        this.props.gamestart('gamestart');
      })
      socket.on('readytime', (data) => {
        this.props.setime(data);
        // console.log(this.props.time);
      })
      socket.on('drawstart', () => {
        this.props.gamestart('drawstart');
      })
      socket.on('drawtime', (data) => {
        this.props.setime(data);
      })
      socket.on('drawtimeout',()=>{
        this.props.gamestart('drawend');
        console.log('时间到,开始拍卖');
        Control.go('/gameroom')
      })
      socket.on('buystart',(data)=>{
        //这里触发一个action 设置图片
        console.log(this.props);
        this.props.gamestart('buystart');
        this.props.setimgs(data);
        console.log('游戏开始');
      })
      socket.on('lindex',()=>{
        console.log('dasda');
      })
      socket.on('setpicuresindex',(index)=>{
        console.log('设置画作:',index);
        //设置画作
        this.props.setimgindex(index);
      })
      socket.on('setpicurespirce',(pirce)=>{
        console.log('设置价格:',pirce);
        //设置画作
        this.props.setimgpirce(pirce);
      })
      socket.on('setgetters',(person)=>{
        console.log('设置拥有者:',person);
        //设置画作
        if(person===-1){
          this.props.setgetters('');
        } else{
          this.props.setgetters(this.props.person[person]);
          this.setState({freeze:false})
          this.props.setpropsindex(-1);
          this.props.setpropstate(null);
        }
      })
      socket.on('theonequite',()=>{
          this.state.socket.close();
          this.props.reset();
          Control.go('/home')
          this.props.settip({show:true,message:'队友退出,强制解散房间'});
      })
      socket.on('pinout',(success)=>{
        if(success){
          this.props.settip({show:true,message:'钉子使用成功'});
        } else{
          this.props.settip({show:true,message:'对方金额不足,道具作废'});
          this.props.setpropsindex(-1);
          this.props.setpropstate(null);
        }
      })
      socket.on('freezesuccess',()=>{
        this.props.settip({show:true,message:'冰冻使用成功'});
      })
      socket.on('freeze',()=>{
        this.setState({freeze:true})
      })
    })
  }
  componentWillReceiveProps(next) {
    let thename = next.personname;
    let persons = next.person;
    let back = false;
    this.timeout();
    persons.forEach((person, index) => {
      if (person.name === thename) {
        this.props.setindex(index);
        // console.log(person.name, thename);
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
              this.pause = true;
              return;
            }
            if (this.state.time === 0 && back) {
              this.state.socket.close();
              // this.props.history.push('/');
              Control.go('/home')
              return;
            }
            if (this.state.myself.gamestate === 'getready' && next.state === 'getready' && this.pause) {
              if (this.timer) {
                clearInterval(this.timer)
              }
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
                    // this.props.history.push('/');
                    Control.go('/home');
                  }
                })
              }, 1000);
              return ;
            }
            this.setState({ time: time });
            console.log('haha');
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
    this.props.reset();
    Control.go('/home')
  }
  readclick = () => {
    clearInterval(this.timer);
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
    if(this.props.state === 'finishdraw'){
      return '其他人马上就完成作品了'
    }
    if(this.props.state === 'drawend'){
      return '开始拍卖'
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
  timeout = ()=>{
    if(this.props.state === 'drawstart'){
      // console.log('开启画板');
      Control.go('/gameroom/drawboard')
    } 
    else if(this.props.state === 'sadas'){
      console.log('拍卖开始');
    } else if(this.props.state === 'finishdraw'){
      Control.go('/gameroom')
    }
    // this.props.history.push('/gameroom/drawboard');
  }
  render() {
    return (
      <div className="Gameroom">
        <div className="gameroomHeader">
         <i className="back" onClick={this.back}></i>
         <div className="gameroomtime"><Timeback time={this.state.time} show={this.timeshow()} /></div>
         <p className="roomnumber">{`${this.state.room}号房间`}</p>
        </div>
        <div className="gameroomMiddle">
        {(this.props.state === 'gamestart'||this.props.state ==='drawstart'||this.props.state==='finishdraw')&&this.props.time!=='-1'?
        <div className="theTimer"><Timer time={this.props.time} ></Timer> </div>:null}
        {this.props.imgindex!==-1?(
        <div className="picture">
           <div className="pricebox">
           <p className="pricebox_p1">{`(${this.props.imgindex+1}/${this.props.imgs.length})当前价格:`}</p>
           <p className="pricebox_p2">{`${this.props.imgpirce}¥`}</p>
           {this.props.imggetter?(<p className="pricebox_p3">{`${this.props.imggetter.name}`}</p>):null}
           </div>
           <div className="picturebox">
            <img className="thepicture" src={`http://localhost:8881/${this.props.imgs[this.props.imgindex].path.split('public/')[1]}`}/>
           </div>
           <div className="buttonbox">
            <div className="buttonwrap_1">
             <div className="gamebottons"><Gamebotton name={`${this.props.imgpirce+100}¥`} callback = {()=>{
               if(this.props.propstate === 'pin'){
                 if(this.props.propsindex===-1){
                   this.props.settip({show:true,message:'请先选择道具使用者'})
                 } else{
                  console.log({getter:this.propsindex,pirce:this.props.imgpirce+100});
                   this.state.socket.emit('pin',{getter:this.props.propsindex,pirce:this.props.imgpirce+100});
                 }
                 return ;
               }
               this.state.socket.emit('setprice',this.props.imgpirce+100)
               }} disable={this.props.propstate==='pin'?false:(this.state.freeze||this.props.imggetter.name===this.props.personname||this.props.person[this.props.personindex].money<this.props.imgpirce+100)} color={'glue'}/></div>
             <div className="gamebottons"><Gamebotton name={`${this.props.imgpirce+200}¥`} callback = {()=>{
               if(this.props.propstate === 'pin'){
                if(this.props.propsindex===-1){
                  this.props.settip({show:true,message:'请先选择道具使用者'})
                } else{
                  console.log({getter:this.propsindex,pirce:this.props.imgpirce+200});
                  this.state.socket.emit('pin',{getter:this.props.propsindex,pirce:this.props.imgpirce+200});
                }
                return ;
              }
               this.state.socket.emit('setprice',this.props.imgpirce+200)
               }} disable={this.props.propstate==='pin'?false:(this.state.freeze||this.props.imggetter.name===this.props.personname||this.props.person[this.props.personindex].money<this.props.imgpirce+200)} color={'glue'}/></div>
             <div className="gamebottons"><Gamebotton name={`${this.props.imgpirce+300}¥`} callback = {()=>{
               if(this.props.propstate === 'pin'){
                if(this.props.propsindex===-1){
                  this.props.settip({show:true,message:'请先选择道具使用者'})
                } else{
                  console.log({getter:this.propsindex,pirce:this.props.imgpirce+300});
                  this.state.socket.emit('pin',{getter:this.props.propsindex,pirce:this.props.imgpirce+300});
                }
                return ;
              }
               this.state.socket.emit('setprice',this.props.imgpirce+300)}
               } disable={this.props.propstate==='pin'?false:(this.state.freeze||this.props.imggetter.name===this.props.personname||this.props.person[this.props.personindex].money<this.props.imgpirce+300)} color={'glue'}/></div>
            </div>
            <div className="buttonwrap_2">
             <div className="gamebottons"><Gamebotton name={'银行'} callback = {()=>{
               if(this.props.person[this.props.personindex].money<this.props.imgpirce+300){
                this.setState({bankshow:!this.state.bankshow})
              } else{
                this.props.settip({show:true,message:'金额足够无法贷款'});
              }
            }
              } disable={false} color={'blue'}/></div>
             <div className="gamebottons"><Gamebotton name={'线索'} callback = {()=>{
                this.props.settip({show:true,message:<React.Fragment>线索1:这是线索1的提示这是线索1的提示这是线索1的提示<br/>线索2：这是线索2的提示这是线索2的提示这是线索2的提示</React.Fragment>});
             }} disable={false} color={'pink'}/></div>
             <div className="gamebottons"><Gamebotton name={'道具'} callback = {()=>{
               this.setState({propsshow:!this.state.propsshow})
             }} disable={false} color={'orange'}/></div> 
            </div>
           </div>
        </div>
        ):<Text text={this.gettext()} />}
        <Readybutton state={this.state.myself} click={() => { this.readclick() }} show={this.timeshow()} />
        </div>
        <Messagebox socket={this.state.socket} />
        <Messageinput socket={this.state.socket} />
        <Bank  socket={this.state.socket} show={this.state.bankshow} back={()=>{this.setState({bankshow:false})}}/>
        <Props socket={this.state.socket} show={this.state.propsshow} back={()=>{this.setState({propsshow:false})}}></Props>
      </div>
    )
  }
}

const mapStateProps = (state, ownProps) => ({
  personname: state.personname,
  person: state.person,
  state: state.state,
  time:state.time,
  room:state.room,
  imgs:state.imgs,
  imgindex:state.imgindex,
  imgpirce:state.imgpirce,
  imggetter:state.imggetter,
  personindex:state.personindex,
  propstate:state.propstate,
  propsindex:state.propsindex
})
const mapDispatchToProps = {
  updataperson,
  gamestart,
  setime,
  setindex,
  setroom,
  setimgs,
  setimgindex,
  setimgpirce,
  setgetters,
  settip,
  reset,
  setpropsindex,
  setpropstate
}
export default connect(mapStateProps, mapDispatchToProps)(Gameroom);