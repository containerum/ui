/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_INGRESS_INVALID,
  DELETE_INGRESS_REQUESTING,
  DELETE_INGRESS_SUCCESS,
  DELETE_INGRESS_FAILURE
} from '../../constants/serviceConstants/deleteIngress';
import type { Action } from '../../types';

const initialState = {
  readyStatus: DELETE_INGRESS_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  label: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_INGRESS_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_INGRESS_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        label: null,
        err: null
      });
    case DELETE_INGRESS_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_INGRESS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        label: action.label,
        err: null
      });
    case DELETE_INGRESS_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_INGRESS_FAILURE,
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
