import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { routes } from './routes';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers/index';
import registerServiceWorker from './registerServiceWorker';
import { composeWithDevTools } from 'redux-devtools-extension';
import $ from 'jquery';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-104800418-1');

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(reduxThunk)
));

// function checkFooter(){
//     if( $('body').height()<=$(window).height() ){
//         $('body').addClass('footer-absolute');
//     } else {
//         $('body').removeClass('footer-absolute');
//     }
//
//     $('.footer').show();
// }

function logPageView() {
    window.scrollTo(0, 0);
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
}

function setDeploymentId(e) {
    return store.dispatch({ type: 'SET_DATA_ID', payload: e.target.dataset.id });
}

render(
    <Provider store={store}>
        <Router onUpdate={logPageView} history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);

export default setDeploymentId;
registerServiceWorker();
