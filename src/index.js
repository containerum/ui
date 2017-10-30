import React from 'react';
import { render } from 'react-dom';
// import { render } from 'react-snapshot';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import configureStore from './store'

// Let the reducers handle initial state
const initialState = {};
const store = configureStore(initialState);

render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
