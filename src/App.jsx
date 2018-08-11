import React from 'react';
import Homepage from './components/Homepage/Homepage';
import Gameroom from './components/Gameroom/Gameroom';
import { BrowserRouter, Route , Redirect,Switch} from 'react-router-dom';
export default class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
            <Switch>
            <Route exact path='/' component={Homepage}/>
            <Route exact path="/gameroom" component={Gameroom} />
            <Redirect to='/'/>
            </Switch>
            </BrowserRouter>
        )
    }
}