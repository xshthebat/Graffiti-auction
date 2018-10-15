import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Control } from 'react-keeper';
import Timeback from '../base/Timeback'
import { gamestart,settip } from '../../store/actions'
import  postimg from '../../api/postimg'
require('./drawboard.styl');
class Drawboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 6,
      color: '#000000',
      drawState: 'draw',
      index:0,
      back:false
    }
    this.colormap = ['#000000', '#e11b5e', '#ff9800', '#FFFF00', '#8bc34a', '#00BCD4', '#2196F3']
    this.savedraw = []
    this.Revoke = []
    this.finish = []
  }
  componentDidMount() {
    console.log(this);
    let barWidth = this.refs.bar.clientWidth / 2;
    let allWidth = Math.ceil(this.refs.all.offsetWidth);
    this.left = barWidth;
    this.refs.bar.style.left = `${this.left}px`;
    this.right = allWidth - barWidth;
    this.initcanvas()
    this.setState({back:false})
  }
  finishit =()=>{
    //保存这张图 然后清空 canvas以及缓存栈
    // console.log(this.savedraw.);
    if(!this.savedraw.length){
      console.log('画作为空');
      this.props.settip({
        show:true,
        message:'画作不能为空'
      })
      return; //这里弹出提示
    }
    this.refs.canvas.toBlob((blob)=>{
      this.finish.push(blob);
      this.savedraw = []
      this.Revoke = []
      this.ctx.clearRect(0, 0, this.refs.canvas.offsetWidth, this.refs.canvas.offsetHeight);
      this.ctx.fillStyle = "#fff";
      this.ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
      if(this.state.index===0){
        this.setState({index:1})
        return
      }
      this.setState({back:true})
    
      //完成图画 上传到服务器 然后返回到等待页面
      this.back();
    })
  }
  initcanvas() {
    this.refs.canvas.width = this.refs.draw.offsetWidth;
    this.refs.canvas.height = this.refs.draw.offsetHeight;
    this.ctx = this.refs.canvas.getContext("2d");
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
    console.log(this.ctx, this.refs.canvas.getContext("2d"));
  }
  startDraw = (e) => {
    // if (this.state.drawState === 'draw') {
      //画画
      this.ctx.lineWidth = this.state.size;
      this.ctx.strokeStyle = this.state.color;

      if (this.state.drawState !== 'draw'){
        this.ctx.strokeStyle = '#fff';
      }
      if (e.touches.length === 1) {
        let touch = e.touches[0];
        let ctx = this.ctx;
        let canvas = this.refs.canvas;
        // let self = this;
        ctx.beginPath();
        ctx.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
        let handlemove = (e) => {
          let newtouche = e.touches[0];
          ctx.lineTo(newtouche.clientX - canvas.offsetLeft, newtouche.clientY - canvas.offsetTop);
          ctx.stroke();
        }
        let handleend = (e) => {
          ctx.closePath();
          let src = canvas.toDataURL("image/jpeg");
          this.savedraw.push(src);
          canvas.removeEventListener('touchmove', handlemove);
          canvas.removeEventListener('touchend', handleend);
        }
        canvas.addEventListener('touchmove', handlemove, false)
        canvas.addEventListener('touchend', handleend, false)
      }
    // }
  }
  delete = ()=>{
    this.ctx.clearRect(0, 0, this.refs.canvas.offsetWidth, this.refs.canvas.offsetHeight);
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
    let src = this.refs.canvas.toDataURL("image/jpeg");
    this.savedraw.push(src);
  }
  backout = () => {
    console.log(this.savedraw)
    if (!this.savedraw.length) {
      return;
    }
    //讲保存内容取出
    //讲回退内容送入栈
    this.Revoke.push(this.savedraw.pop())
    if (!this.savedraw.length) {
      console.log('这时应该初始化为空白')
      this.ctx.clearRect(0, 0, this.refs.canvas.offsetWidth, this.refs.canvas.offsetHeight);
      this.ctx.fillStyle = "#fff";
      this.ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
    } else {
      let imgsrc = this.savedraw.pop()
      console.log('上次内容重绘', imgsrc);
      let img = new Image();
      img.onload = () => {
        // console.log(img);
        this.ctx.clearRect(0, 0, this.refs.canvas.offsetWidth, this.refs.canvas.offsetHeight);
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
        this.ctx.drawImage(img, 0, 0, this.refs.canvas.offsetWidth, this.refs.canvas.offsetHeight);
      }
      img.src = imgsrc;
      this.savedraw.push(imgsrc); //再推入
    }
  }
  go = ()=>{
    if(!this.Revoke.length){
      return  //垃圾栈为空
    } 
    let imgsrc = this.Revoke.pop() //垃圾栈出 保存栈入
    let img = new Image();
      img.onload = () => {
        // console.log(img);
        this.ctx.clearRect(0, 0, this.refs.canvas.offsetWidth, this.refs.canvas.offsetHeight);
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
        this.ctx.drawImage(img, 0, 0, this.refs.canvas.offsetWidth, this.refs.canvas.offsetHeight);
      }
      img.src = imgsrc;
      this.savedraw.push(imgsrc); //再推入
  }
  choosepen = ()=>{
    this.setState({drawState:'draw'})
  }
  choosewipe = ()=>{
    this.setState({drawState:'wipe'})
  }
  componentWillUnmount() {
    console.log(this.state.socket);
    if(!this.post){
        let self = this;
        console.log(this.finish)
        if(!this.finish.length){
           this.refs.canvas.toBlob((blob)=>{
          this.finish.push(blob);
          this.finish.push(blob);
          postimg(this.finish,this.props.room,this.props.personname).then((res)=>{
            console.log(res,this);
          });
        })
        } else if(this.finish.length===1){
           this.refs.canvas.toBlob((blob)=>{
          this.finish.push(blob);
          postimg(this.finish,this.props.room,this.props.personname).then((res)=>{
            console.log(res);
          });
        })
        } else{
            postimg(this.finish,this.props.room,this.props.personname).then((res)=>{
            console.log(res);
          });
        }
    
        console.log('自动上传');
      }
    console.log('画画结束,上传');
  }
  back = () => {
    //改变状态
    //上传逻辑
      postimg(this.finish,this.props.room,this.props.personname).then((res)=>{
        console.log(res);
        this.props.gamestart('finishdraw')
      });
      this.post  = true;
  }
  start = (e) => {
    this.startX = e.touches[0].pageX - (parseInt(this.refs.bar.style.left.split('px')[0],10));
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
  changecolor(index) {
    this.setState({ color: this.colormap[index] }, () => {
      console.log(this.state.color)
    });
  }
  render() {
    return (
      <div className="drawboard">
        <div className="drawhead">
          <i className="drawboardback" onClick={this.back}></i>
          <div className="drawboardtime"><Timeback time={this.props.time} show={true}></Timeback></div>
          <p className="drawfinish" onClick={this.finishit}>完成</p>
        </div>
        <div className="drawname">
            <p className="pname">{`图(${this.state.index+1}/2):${this.props.person[this.props.personindex].picture[this.state.index].name}`}</p>
            <p className="finishnane">完成请点右上角</p>
        </div>
        {this.state.back?null:(
          <div className="drawbox">
          <div className="draw" ref="draw">
            <canvas height="100%" width="100%" ref="canvas" onTouchStart={this.startDraw}>
              <span>亲，您的浏览器不支持canvas，换个浏览器试试吧！</span>
            </canvas>
          </div>
        </div>
        )}
        <div className="drawbottom">
          <div className="drawcolor">
            <ul className="colormap">
              {this.colormap.map((item, index) => {
                return (<li style={{ backgroundColor: item }} key={index} onClick={() => { this.changecolor(index) }}></li>)
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
            <div className="handle_right" onClick={() => { }}>
              <i className={this.state.drawState === 'draw' ? "penblack" : "pen"} onClick={this.choosepen}></i>
              <i className={this.state.drawState === 'wipe' ? "wipeblack" : "wipe"} onClick={this.choosewipe}></i>
              <i className="backout" onClick={this.backout}></i>
              <i className="go" onClick={this.go}></i>
              <i className="delete"  onClick={this.delete}></i>
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
  time: state.time,
  personindex:state.personindex,
  room:state.room
})
const mapDispatchToProps = {
  gamestart,
  settip
}
export default connect(mapStateProps, mapDispatchToProps)(Drawboard);