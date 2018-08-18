import React from 'react';
import Homepage from './components/Homepage/Homepage';
import Gameroom from './components/Gameroom/Gameroom';
import { HashRouter,Route} from 'react-keeper';
import Drawboard from './components/drawboard/drawboard';
export default class App extends React.Component {
    render() {
        return (
            <HashRouter>
            {/* <Switch> */}
            <div className="app">
            <Route exact path='/home' miss component={Homepage} />
            <Route exact cathe path="/gameroom" component={Gameroom} />
            <Route exact path="/gameroom/drawboard" component={Drawboard}/>
            </div>
            {/* <Redirect to='/'/> */}
            {/* </Switch> */}
            </HashRouter>
        )
    }
}