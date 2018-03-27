/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_DOMAIN_INVALID,
  DELETE_DOMAIN_REQUESTING,
  DELETE_DOMAIN_SUCCESS,
  DELETE_DOMAIN_FAILURE
} from '../../constants/serviceConstants/deleteDomain';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: DELETE_DOMAIN_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  label: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_DOMAIN_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_DOMAIN_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        label: null,
        err: null
      });
    case DELETE_DOMAIN_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_DOMAIN_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        label: action.label,
        err: null
      });
    case DELETE_DOMAIN_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_DOMAIN_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: null,
        label: action.label,
        err: action.err
      });
    default:
      return state;
  }
};
