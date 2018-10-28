import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import './index.styl'
import App from './App';
import store from './store/index';
import FastClick from 'fastclick';
document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
}, false);
ReactDOM.render(
    <Provider store={store} >
            <App />
    </Provider>,
    document.getElementById('root')
);
{/* registerServiceWorker(); */ }