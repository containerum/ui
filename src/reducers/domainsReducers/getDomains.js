/* @flow */

import _ from 'lodash/fp';

import {
  GET_DOMAINS_INVALID,
  GET_DOMAINS_REQUESTING,
  GET_DOMAINS_SUCCESS,
  GET_DOMAINS_FAILURE
} from '../../constants/domainsConstants/getDomains';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_DOMAINS_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_DOMAINS_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_DOMAINS_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_DOMAINS_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_DOMAINS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_DOMAINS_FAILURE:
      return _.assign(state, {
        readyStatus: GET_DOMAINS_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
