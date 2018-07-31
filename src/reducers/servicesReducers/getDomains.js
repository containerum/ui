/* @flow */

import _ from 'lodash/fp';

import {
  GET_INGRESSES_INVALID,
  GET_INGRESSES_REQUESTING,
  GET_INGRESSES_SUCCESS,
  GET_INGRESSES_FAILURE
} from '../../constants/serviceConstants/getDomains';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_INGRESSES_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_INGRESSES_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_INGRESSES_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_INGRESSES_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_INGRESSES_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_INGRESSES_FAILURE:
      return _.assign(state, {
        readyStatus: GET_INGRESSES_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
