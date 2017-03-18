import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import 'babel-polyfill';

import configureStore from 'stores/configure-store';

import Routes from 'routes';

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import {createDevTools} from 'redux-devtools';

// Load SCSS
import '../scss/app.scss';



const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'
                 defaultIsVisible={false}>
        <LogMonitor theme='tomorrow'/>
    </DockMonitor>
);

const isProduction = process.env.NODE_ENV === 'production';

// Creating store
let store = configureStore(isProduction, DevTools.instrument);

// Render it to DOM
ReactDOM.render(
    <Provider store={ store }>
        { isProduction ?
            <Routes /> :
            <div>
                <Routes />
                <DevTools />
            </div> }
    </Provider>,
    document.getElementById('root')
);
