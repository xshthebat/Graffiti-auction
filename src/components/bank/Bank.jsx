import React, { Component } from 'react';
import { connect } from 'react-redux';
let {CSSTransition} = require('react-transition-group');
require('./Bank.styl');
let img = require('../../common/image/shark.png')
let backimg = require('../../common/image/bank_back.svg');
class Bank extends Component{
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    setmoney(){
        console.log('发送请求加钱');
        this.props.decnum()
        this.props.socket.emit('getmoney',this.props.personindex);
    }
    render(){
        return (
                <CSSTransition in={this.props.show} timeout={{enter:200,exit:200}} classNames={'bank'} unmountOnExit={true}>
                    <div className="bank_boxs">
                        <div className="bank">
                           <div className="land"></div>
                           <div className="shark">
                            <img src={img}/>
                            <div className="shark_shadows"></div>
                           </div>
                           <div className="wave_container">
                            <div className="wave"></div>
                           </div>
                           <div className="bank_name">
                              <p className="b_p_1">掠夺者银行</p>
                              <p className="b_p_2">银行借款在游戏结算时还款</p>
                              <p className="b_p_3">还款为当前借款的1.1倍</p>
                           </div>
                           <div className="bank_button">
                                <button className="bank_b" onClick={()=>{this.setmoney()}}><span>1000¥</span></button>
                           </div>
                           <div className="bank_back" onClick={()=>{this.props.back()}}><img src={backimg} /></div>
                        </div>
                    </div>
                </CSSTransition>
        )
    }
}
const mapStateProps = (state) => ({
    person: state.person,
    imgpirce:state.imgpirce,
    personindex:state.personindex
})
export default connect(mapStateProps)(Bank);