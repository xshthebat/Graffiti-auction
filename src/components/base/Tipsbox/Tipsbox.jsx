import React, { Component } from 'react';
import { connect } from 'react-redux';
import { settip } from './../../../store/actions'
let {CSSTransition} = require('react-transition-group');
require('./Tipsbox.styl')
class Tipbox extends Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextprops) {
        if (nextprops.show) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.props.settip({ show: false });
            }, 1000);
        } else {
            return false;
        }
    }
    render() {
        return (
            <CSSTransition in={this.props.show} timeout={{enter:200,exit:200}} classNames={'example'} unmountOnExit={true}>
               <div className={`tipbox`}>
                    <div className={`tip_ms_b`}><p>{this.props.message}</p></div>
                </div>
            </CSSTransition> 
            )
    }
}
const mapStateProps = (state) => ({
    tip: state.tip
})
const mapDispatchToProps = {
    settip
}
export default connect(mapStateProps, mapDispatchToProps)(Tipbox);