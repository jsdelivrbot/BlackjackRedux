import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';


const store = createStore(reducers, applyMiddleware(
    socketIO(io.connect(1337))
));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.querySelector('.container'));
