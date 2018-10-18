import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {setpropstate,settip} from '../../store/actions'
let {CSSTransition} = require('react-transition-group');
require('./Props.styl');
let backimg = require('../../common/image/bank_back.svg');
function Propsbox({name,sum,color,click}){
    let nameobj = {
        "钉子":' 强制让人立即加价100',
        "冰冻":'让人禁止出价到本回合结束',
        "新的线索":'发现一条新线索'
    }
    let iconobj = {
        "钉子":'thumbtack',
        "冰冻":'frozen',
        "新的线索":'clue'
    }
    return (
    <div className="propsbox">
        <div className={`propsbox_top${color?' props'+color:''}`} onClick={()=>{click()}}>
            <i className={iconobj[name]}></i>
            <span>{name}</span>
            <p>100¥ × {sum}</p>
        </div>
        <p className="propsbox_bot">{nameobj[name]}</p>
    </div>)
}
class Props extends Component{
    constructor(props){
        super(props);
        this.state = {
            pin:0,
            freeze:0,
            clues:0        
        };
    }
    componentDidMount(){
        console.log(this.props);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.person.length&&nextProps.personindex!==-1&&nextProps.person[nextProps.personindex]&&nextProps.person[nextProps.personindex].property){
           this.setState({
               pin:nextProps.person[nextProps.personindex].property.pin,
               freeze:nextProps.person[nextProps.personindex].property.freeze,
               clues:nextProps.person[nextProps.personindex].property.clues
            })
        } 
    }
    shouldComponentUpdate(nextProps){
        console.log(nextProps);
        console.log('收到props:',nextProps);
        if(nextProps.person.length&&nextProps.personindex!==-1&&nextProps.person[nextProps.personindex]&&nextProps.person[nextProps.personindex].property){
            console.log(nextProps.person[nextProps.personindex].property);
            return true;
        } else{
            return false;
        }
    }
    render(){
        console.log('渲染');
        return  (
            <CSSTransition in={this.props.show} timeout={{enter:200,exit:200}} classNames={'props'} unmountOnExit={true}>
                <div className="props_boxs">
                    <div className="props">
                        <div className="props_top">
                            <span>道具</span>
                        </div>
                        <div className="propsboxs">
                            <Propsbox name="钉子" sum={this.state.pin} color={'orange'} 
                            click={()=>{
                                if(!this.state.pin){
                                   this.props.settip({show:true,message:'道具不足'}); 
                                   return;
                                }
                                this.props.setpropstate('pin');
                                this.props.back();
                                setTimeout(()=>{
                                    this.props.settip({show:true,message:'请选择一个人出价'});
                                },500);
                                }}/>
                            <Propsbox name="冰冻" sum={this.state.freeze} color={'blue'} click={()=>{

                                if(!this.state.freeze){
                                    this.props.settip({show:true,message:'道具不足'}); 
                                    return;
                                 }
                                this.props.setpropstate('freeze');
                                this.props.back();
                                setTimeout(()=>{
                                    this.props.settip({show:true,message:'请选择一个人冰冻'});
                                },500);
                                }}/>
                            <Propsbox name="新的线索" sum={this.state.clues} color={'pink'} click={()=>{
                                if(!this.state.clues){
                                    this.props.settip({show:true,message:'道具不足'}); 
                                    return;
                                }
                                this.props.socket.emit('addclues');
                                this.props.settip({show:true,message:'线索添加成功'}); 
                                }}/>
                        </div>
                        <div className="props_back" onClick={()=>{this.props.back()}}><img src={backimg} /></div>
                    </div>
                </div>
           </CSSTransition>
        )
    }
}
const mapStateProps = (state, ownProps) => ({
    person: state.person,
    personindex:state.personindex
  })
  const mapDispatchToProps = {
    setpropstate,
    settip
  }
  export default connect(mapStateProps, mapDispatchToProps)(Props);