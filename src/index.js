import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client'
import mapActionToSocketMiddleware from './middleware/mapActionToSocketMiddleware'
import * as types from './actions/types'

import App from './components/app';
import reducers from './reducers';

const socket = new io('http://localhost:1337')

socket.on('state', (state) => {
    store.dispatch({ type: types.SET_STATE, state })
})

const store = createStore(reducers, applyMiddleware(
    mapActionToSocketMiddleware(socket)
));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.querySelector('.container'));
