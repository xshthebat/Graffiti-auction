import React, { Component } from 'react';
import Button from '../Button/Button';
import {connect} from 'react-redux';
import {changename,settip} from '../../store/actions';
import checkname from '../../api/checkname';
import {Control} from 'react-keeper';
require('./Homepage.styl');
class Getname extends Component {
  constructor(props) {
    super(props)
    this.state = {
      val: ''
    };
  }
  getvalue = (e) => {
    this.setState({ val: e.target.value });
  }
  back = ()=>{
    this.setState({ val: '' });
    this.refs.input.value="";
    this.props.back();
  }
  render() {
    let dom = <div className="getname">
    <div className="getnamebox">
      <i onClick={this.back}>&times;</i>
      <p>请输入昵称</p>
      <input type="text" onChange={this.getvalue} ref="input"/>
      <Button name="确定" callback={() => {if(!this.state.val.length)return; this.props.submit(this.state.val); }} />
      </div>
    </div>
    return (
      this.props.show ? dom : null
    )
  }
}
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }
  setname = () => {
    this.setState({ show: true });
  }
  getname = (name) => {
    console.log('验证',name);
    checkname(name).then((res)=>{
      console.log(res.data);
      if(!res.data.err){
        this.setState({show:false},()=>{
          this.props.changename(name);
          console.log(this);
          // this.props.history.push('/gameroom')
          Control.go('/gameroom');
        });
      } else{
        console.log('请重新输入');
      }
    })
  }
  back= ()=>{
    console.log('关闭');
    this.setState({show:false});
  }
  render() {
    return (
      <div className="home">
        <p className="hometitle">涂鸦拍卖</p>
        <div className="Button_home" >
          <Button name="开始匹配" callback={this.setname} />
        </div>
        <div className="Button_home2" >
          <Button name="游戏教程" callback={() => this.props.settip({show:!this.props.tip.show,message:'测试代码'})} />
        </div>
        <Getname submit={this.getname} show={this.state.show} back={this.back}/>
      </div>
    )
  }
}

const mapStateProps = (state,ownProps)=>({
  personname:state.personname,
  tip:state.tip
})
const mapDispatchToProps = {
  changename,
  settip
}
export default connect(mapStateProps,mapDispatchToProps)(Home);