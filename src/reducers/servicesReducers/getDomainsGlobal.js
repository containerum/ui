/* @flow */

import _ from 'lodash/fp';

import {
  GET_DOMAINS_GLOBAL_INVALID,
  GET_DOMAINS_GLOBAL_REQUESTING,
  GET_DOMAINS_GLOBAL_SUCCESS,
  GET_DOMAINS_GLOBAL_FAILURE
} from '../../constants/serviceConstants/getDomainsGlobal';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_DOMAINS_GLOBAL_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_DOMAINS_GLOBAL_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_DOMAINS_GLOBAL_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_DOMAINS_GLOBAL_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_DOMAINS_GLOBAL_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_DOMAINS_GLOBAL_FAILURE:
      return _.assign(state, {
        readyStatus: GET_DOMAINS_GLOBAL_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
