import React, { Component } from 'react';
let { CSSTransition } = require('react-transition-group');
require('./Payback.styl');
let img = require('../../common/image/shark.png')
export default class Payback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    show() {
        this.setState({ show: true });
    }
    disshow(){
        this.setState({ show: false });
    }
    render() {
        return (
            <CSSTransition in={this.state.show} timeout={{ enter: 200, exit: 200 }} classNames={'payback'} unmountOnExit={true}>
                <div className="Payback_boxs">
                    <div className="Payback_word">
                        <p>{`老铁,  该还贷款了`}</p>
                    </div>
                    <div className="Payback_shark">
                        <img src={img}/>
                        <div className="payback_shadows"></div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}
