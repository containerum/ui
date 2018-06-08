/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_NAMESPACE_INVALID,
  DELETE_NAMESPACE_REQUESTING,
  DELETE_NAMESPACE_SUCCESS,
  DELETE_NAMESPACE_FAILURE
} from '../../constants/namespaceConstants/deleteNamespace';
import type { Action } from '../../types';

const initialState = {
  readyStatus: DELETE_NAMESPACE_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idName: null,
  idLabel: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_NAMESPACE_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_NAMESPACE_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idName: null,
        err: null
      });
    case DELETE_NAMESPACE_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_NAMESPACE_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idName: action.idName,
        idLabel: action.idLabel,
        err: null
      });
    case DELETE_NAMESPACE_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_NAMESPACE_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: null,
        idName: action.idName,
        err: action.err
      });
    default:
      return state;
  }
};
