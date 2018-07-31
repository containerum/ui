/* @flow */

import _ from 'lodash/fp';

import {
  ADD_DOMAIN_INVALID,
  ADD_DOMAIN_REQUESTING,
  ADD_DOMAIN_SUCCESS,
  ADD_DOMAIN_FAILURE
} from '../../constants/domainConstants/addDomain';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: ADD_DOMAIN_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  ips: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_DOMAIN_REQUESTING:
      return _.assign(state, {
        readyStatus: ADD_DOMAIN_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        ips: null,
        err: null
      });
    case ADD_DOMAIN_SUCCESS:
      return _.assign(state, {
        readyStatus: ADD_DOMAIN_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        ips: action.ips,
        err: null
      });
    case ADD_DOMAIN_FAILURE:
      return _.assign(state, {
        readyStatus: ADD_DOMAIN_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: null,
        ips: null,
        err: action.err
      });
    default:
      return state;
  }
};
