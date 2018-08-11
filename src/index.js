import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import './index.styl'
import App from './App';
import store from './store/index';
ReactDOM.render( <
    Provider store = { store } >
    <
    App / >
    <
    /Provider>,
    document.getElementById('root'));
registerServiceWorker();