import React, { Component } from 'react';
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
require('./Timer.styl');
export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swiper: []
    }
  }
  componentDidMount() {
    this._inittimer();
  }//调用初始化方法
  shouldComponentUpdate(nextprop) {
    // console.log(this);
    if (this.props.time === nextprop.time) {
      return false;
    } else {
      this.change = true;
      return true;
    }
  }
  componentWillReceiveProps(){
    console.log('收到计时数据');
    return true;
  }
  componentDidUpdate() {
    clearInterval(this.timer);
    console.log('重新计时');
    console.log(this);
    this._inittimer();
  }
  _inittimer = () => {
    // console.log('重新初始化组件');
    clearTimeout(this.timer);
    this.state.swiper.forEach((item) => {
      if (item) {
        item.destroy();
      }
    })
    let timerarr = [null, null, null];
    console.log(this.position);
    timerarr[0] = this.position !== -1 ? new Swiper(this.refs.positiondom, {
      direction: 'vertical',
      loop: true,
      initialSlide: 10 - 1 - this.position,
      allowTouchMove: false
    }) : null
    timerarr[1] = this.ten !== -1 ? new Swiper(this.refs.tendom, {
      direction: 'vertical',
      loop: true,
      initialSlide: 10 - 1 - this.ten,
      allowTouchMove: false
    }) : null
    timerarr[2] = this.hundred !== -1 ? new Swiper(this.refs.hundredom, {
      direction: 'vertical',
      loop: true,
      initialSlide: 10 - 1 - this.hundred,
      allowTouchMove: false
    }) : null
    this.setState({ swiper: timerarr }, () => {
      console.log('开始');
      let time = this.props.time -1;
      let self = this;
      console.log('计时器执行');
      let timmm = function () {
        if (time === 0) {
          clearInterval(self.timer);
          console.log('回掉执行');
          self.props.callback();
          return;
        }
        self.state.swiper[0].slideNext();
        if ((time % 100) % 10 === 0) {
          if ((time % 100) / 10 !== 0) {
            console.log('haha2');
            self.state.swiper[1].slideNext();
          }
          if ((time % 100) / 10 === 0 && Math.floor(time / 100) === 1 && self.numlength === 3) {
            //
            self.state.swiper[2].slideNext();
            self.state.swiper[1].slideNext();
          }
        }
        time = time - 1;
      }
      this.timer = setInterval(timmm, 1000)
    })
  }
  render() {
    //判断位数;
    let hundredom, tendom, positiondom;
    this.position = -1;
    this.ten = -1;
    this.hundred = -1;
    let localtime = this.props.time - 1;
    if (localtime >= 100) {
      this.numlength = 3;
      this.position = localtime % 100 % 10;
      this.ten = Math.floor(localtime % 100 / 10);
      this.hundred = Math.floor(localtime / 100);
      positiondom = Array(10).fill(1).map((val, index) => {
        return (<div className="color swiper-slide" key={index}>
          <p>{10 - index - 1}</p>
        </div>)
      })
      tendom = Array(10).fill(1).map((val, index) => {
        return (<div className="color swiper-slide" key={index}>
          <p>{10 - index - 1}</p>
        </div>)
      })
      hundredom = Array(10).fill(1).map((val, index) => {
        return (<div className="color swiper-slide" key={index}>
          <p>{10 - index - 1}</p>
        </div>)
      })
    } else if (localtime > 10) {
      this.numlength = 2;
      this.position = localtime % 10;
      this.ten = Math.floor(localtime / 10);
      positiondom = Array(10).fill(1).map((val, index) => {
        return (<div className="color swiper-slide" key={index}>
          <p>{10 - index - 1}</p>
        </div>)
      })
      tendom = Array(10).fill(1).map((val, index) => {
        return (<div className="color swiper-slide" key={index}>
          <p>{10 - index - 1}</p>
        </div>)
      })
    } else {
      this.numlength = 1;
      this.position = localtime;

      positiondom = Array(10).fill(1).map((val, index) => {
        return (<div className="color swiper-slide" key={index}>
          <p>{10 - index - 1}</p>
        </div>)
      })
    }
    return (
      <div className="Timer" >
        {hundredom ? (<div className="hundredom swiper-container" ref="hundredom"><div className="swiper-wrapper">{hundredom} </div></div>) : null}
        {tendom ? (<div className="tendom swiper-container" ref="tendom"><div className="swiper-wrapper">{tendom} </div></div>) : null}
        {positiondom ? (<div className="positiondom swiper-container" ref="positiondom"><div className="swiper-wrapper">{positiondom} </div></div>) : null}

      </div>
    )
  }
}