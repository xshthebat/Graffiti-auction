import React, { Component } from 'react';
// import { withRouter } from "react-router-dom";
import postvideo from '../../api/postvideo';
require('./Messageinput.styl')
function Text({ mode, touchstart, touchmove, touchend }) {
  if (mode) {
    return null
  } else {
    return (<p className="hold_handle" onTouchStart={touchstart} onTouchMove={touchmove} onTouchEnd={touchend}>长按说话</p>)
  }
}
function Timewran({ time, cancel, show }) {
  if (!show) {
    return null
  }
  return (
    <div className="Time_wran">
      <p>{time}</p>
      <div className={cancel ? 'cancel' : 'none'}>{cancel ? '松开手指,取消发送' : '上划取消,松开发送'}</div>
    </div>
  )
}

class Messageinput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cansend: true,
      mode: true,
      wranshow: false,
      textvalue: "",
      wramcancel: false,
      time: 0,
      oldvalue:""
    }
    this.init();
  }
  init = () =>{
    if (!this.promise) {
      try {
        this.promise = navigator.mediaDevices.getUserMedia({
          audio: true
        });
        this.promise.then((stream) => {
          this.recorder = new MediaRecorder(stream);
          this.recorder.ondataavailable = (event)=>{
            //收集媒体设备 获得到的 可以使用的 媒体流数据
            this.video = event.data;
            console.log(this.video);
            if(this.state.wramcancel){
              console.log('取消发送');
              return ; 
            }
            if(this.state.time<=2){
              console.log('时间过短');
              return ; 
            }
            console.log('发送');
            postvideo(this.video).then((res)=>{
              this.props.socket.emit('sendvideo',res.data.src,()=>{console.log('发送成功')});
            })
          }
        })
        this.promise.catch((err)=>{
          console.log(err);
        })
        console.log('授权录制');
      }
      catch (e) {
        console.log(e);
        console.log('设备不支持');
      }
    }
  }
  planesend = () => {
    if (this.state.cansend&&this.state.textvalue!=='') {
      this.props.socket.emit('sendmessage', this.state.textvalue, () => {
        this.setState({ textvalue: '' })
      });
    } else {
      console.log('禁止手动发消息');
    }
  }
  changeMode = () => {
    let mode = !this.state.mode;
    console.log(mode);
    if (!mode) {
      this.setState({
        mode: mode,
        cansend: false,
        textvalue: '',
        oldvalue:this.state.textvalue
      })
      // this.refs.input.value = "";
    } else {
      console.log(this.state);
      this.setState({
        mode: mode,
        cansend: true,
        textvalue:this.state.oldvalue,
        oldvalue:""
      })
    }
  }
  mode = () => {
    return this.state.mode ? 'key_input' : 'voice_input'
  }
  showTime = (time) => {
    let result, minute = 0, second = 0;
    if (time >= 0) {
      minute = Math.floor((time) / 60);
      if (minute < 10) {
        minute = "0" + minute;
      }

      second = Math.floor(time % 60);
      if (second < 10) {
        second = "0" + second;
      }
      result = `${minute}:${second}`;
      return result;
    }
  }
  input = (e) => {
    this.setState({
      textvalue: e.target.value
    })
  }
  showwrann = () => {
    console.log('开始录制');
    this.setState({
      wranshow: true,
      wramcancel:false,
      time:0
    }, () => {
      this.recorder.start();
      this.voicetimer = setInterval(() => {
        let time = this.state.time + 1;
        this.setState({ time: time })
      }, 1000);
    })
  }
  disshowwrann = () => {
    if (this.state.wramcancel) {
      this.setState({
        wranshow: false,
        wramcancel: true
      }, () => {
        this.recorder.stop();
        if (this.voicetimer) {
          clearInterval(this.voicetimer);
        }
      })
    } else {
      this.setState({
        wranshow: false,
        wramcancel: false
      }, () => {
        this.recorder.stop();
        if (this.voicetimer) {
          clearInterval(this.voicetimer);
        }
      })
    }
  }
  wranncancel = (e) => {
    if (e.touches[0].clientY < document.body.clientHeight - this.refs.Messageinput.clientHeight) {
      this.setState({
        wramcancel: true
      })
    } else {
      this.setState({
        wramcancel: false
      })
    }
  }
  render() {
    return (
      <div ref="Messageinput" className="Messageinput">
        <Timewran time={this.showTime(this.state.time)} cancel={this.state.wramcancel} show={this.state.wranshow} />
        <i className={`Message_i ${this.mode()}`} onClick={this.changeMode}></i>
        <div className="Message_input_box">
          <Text mode={this.state.mode} touchstart={this.showwrann} touchmove={this.wranncancel} touchend={this.disshowwrann} />
          <input type="text" ref="input" disabled={!this.state.cansend} onChange={this.input} value={this.state.textvalue} />
        </div>
        <i className="Message_i plane" onClick={this.planesend}></i>
      </div>
    )
  }
}
export default Messageinput