/* @flow */

import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import cookie from 'react-cookies';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

import { webApiLogin } from './config';
import type { Store } from './types';
import rootReducer from './reducers';

const browser = cookie.load('browser') ? cookie.load('browser') : null;
axios.interceptors.response.use(response => {
  const lastTimeToRefresh = cookie.load('lastTimeToRefresh')
    ? parseInt(cookie.load('lastTimeToRefresh'), 10)
    : null;
  const timeToRequest = 600000;
  const dateNow = Date.parse(new Date());
  const differenceDate =
    lastTimeToRefresh + timeToRequest - dateNow > 0
      ? lastTimeToRefresh + timeToRequest - dateNow > 0
      : 0;

  // console.log(response, 'BEFORE PUT', differenceDate);
  if (
    lastTimeToRefresh &&
    lastTimeToRefresh + timeToRequest <= dateNow &&
    differenceDate >= 0 &&
    response.status === 200 &&
    response.data.is_active
  ) {
    // console.log(response, 'AFTER PUT', differenceDate);
    axios
      .put(
        `${webApiLogin}/token/${cookie.load('refreshToken')}`,
        {},
        {
          headers: {
            'User-Client': browser
          },
          validateStatus: status => status >= 200 && status <= 505
        }
      )
      .then(res => {
        const { status } = res;
        switch (status) {
          case 200: {
            const {
              access_token: newAccessToken,
              refresh_token: newRefreshToken
            } = res.data;
            cookie.save('accessToken', newAccessToken, { path: '/' });
            cookie.save('refreshToken', newRefreshToken, { path: '/' });
            cookie.save('lastTimeToRefresh', dateNow, { path: '/' });
            break;
          }
          default: {
            cookie.remove('token', { path: '/' });
            cookie.remove('accessToken', { path: '/' });
            cookie.remove('refreshToken', { path: '/' });
          }
        }
        return res;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
  return response;
});

export default (history: Object, initialState: Object = {}): Store => {
  const middlewares = [
    thunk.withExtraArgument(axios),
    routerMiddleware(history)
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
