import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

//import createLogger from 'redux-logger'
//import createSagaMiddleware from 'redux-saga'

//const logger = createLogger()
//const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState = {}) {
  const reactRouterReduxMiddleware = routerMiddleware(browserHistory);
  // Create the store with two middlewares
  const middlewares = [
  //  sagaMiddleware
  //, logger
      reduxThunk
  ]

  const enhancers = [
      composeWithDevTools(applyMiddleware(...middlewares))
  ]

  const store = createStore(
    reducers,
    initialState,
    compose(...enhancers),
    routerMiddleware(reactRouterReduxMiddleware)
  )

  // Extensions
  //store.runSaga = sagaMiddleware.run
  store.asyncReducers = {} // Async reducer registry

  return store
}
