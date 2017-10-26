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
import ReactGA from 'react-ga';
ReactGA.initialize('UA-93921188-2', {
    gaOptions: {
        allowLinker: true
    }
});

const ga = ReactGA.ga();
// ga('create', 'UA-93921188-2', 'auto', { allowLinker: true });
ga('require', 'linker');
ga('linker:autoLink', ['containerum.com']);

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(reduxThunk)
));

function logPageView() {
    window.scrollTo(0, 0);
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
}

render(
    <Provider store={store}>
        <Router onUpdate={logPageView} history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
