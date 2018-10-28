import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
let { CSSTransition } = require('react-transition-group');
let backimg = require('../../common/image/bank_back.svg');
require('./Gamend.styl');
function Person({ name, rank, money, index }) {
    let rankdom = rank === 1 ? (<i className={'rank rank_first'}></i>) : <i className={'rank'}>{rank}</i>
    return (
        <div className="rankbox">
            <div className="rank_person">
                {rankdom}
                <div className={`rank_img rank_person_img${index}`}><div className="rank_person_name"><span>{name}</span></div></div>
            </div>
            <div className="money">
                <p >{money}</p>
            </div>
        </div>)
}
class Gamends extends Component {
    constructor(props) {
        super(props);
    }
    show() {
        this.setState({ show: true });
    }
    componentWillUpdate(nextProps) {
        if (nextProps.person && !nextProps.person.length) {
            return false;
        } else {
            // console.log(this.props.person);
            this.newpersons = this.props.person.filter((ele, index) => {
                 return ele.name ? true : false;
            })
            this.newpersons.forEach((element,index) => {
                element.oldindex = index;
            });
            this.newpersons.sort((ele1, ele2) => {
                return ele2.money - ele1.money;
            })
            console.log(this.newpersons);
            return true;
        }
    }
    render() {
        console.log(this.newpersons);
        let personsdom = this.newpersons ? this.newpersons.map((item, index) => { return (<Person name={item.name} index={item.oldindex+1} rank={index + 1} money={item.money} key={index} />) }) : null;
        return (
            <CSSTransition in={this.props.endshow} timeout={{ enter: 200, exit: 200 }} classNames={'gamend'} unmountOnExit={true}>
                <div className="gamend_boxs">
                    <div className="gamend">
                        <div className="gamend_top">
                            <span>排行榜</span>
                        </div>
                        <div className="gamend_contend">
                            {personsdom}
                        </div>
                        <div className="gamend_back" onClick={() => { this.props.back() }}><img src={backimg} /></div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}
const mapStateProps = (state) => ({
    person: state.person,
    imgpirce: state.imgpirce,
    personindex: state.personindex
})
export default connect(mapStateProps)(Gamends);