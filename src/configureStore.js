/* @flow */

import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

import rootSaga from './sagas';
import type { Store } from './types';
import rootReducer from './reducers';

export default (history: Object, initialState: Object = {}): Store => {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    thunk.withExtraArgument(axios),
    routerMiddleware(history),
    sagaMiddleware
  ];
  const composeEnhancers =
    (typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const enhancers = composeEnhancers(
    applyMiddleware(
      ...middlewares,
      loadingBarMiddleware({
        promiseTypeSuffixes: ['REQUESTING', 'SUCCESS', 'FAILURE']
      })
    )
    // Other store enhancers if any
  );
  const store = createStore(rootReducer, initialState, enhancers);

  // then run the saga
  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      try {
        const nextReducer = require('./reducers').default;

        store.replaceReducer(nextReducer);
      } catch (error) {
        console.error(`==> 😭  ReduxState hot reloading error ${error}`);
      }
    });
  }

  return store;
};
