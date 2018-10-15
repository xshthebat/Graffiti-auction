import React from 'react';
import Homepage from './components/Homepage/Homepage';
import Gameroom from './components/Gameroom/Gameroom';
import { HashRouter,Route} from 'react-keeper';
import Drawboard from './components/drawboard/drawboard';
import Tipbox from './components/base/Tipsbox/Tipsbox';
import { connect } from 'react-redux';
class App extends React.Component {
    render() {
        return (
            <HashRouter>
            {/* <Switch> */}
            <div className="app">
            <Route exact path='/home' miss component={Homepage} />
            <Route exact cathe path="/gameroom" component={Gameroom} />
            <Route exact path="/gameroom/drawboard" component={Drawboard}/>
            <Tipbox message={this.props.tip.message} show={this.props.tip.show}></Tipbox>
            </div>
            {/* <Redirect to='/'/> */}
            {/* </Switch> */}
            </HashRouter>
        )
    }
}
const mapStateProps = (state, ownProps) => ({
    tip: state.tip
})
export default connect(mapStateProps)(App);