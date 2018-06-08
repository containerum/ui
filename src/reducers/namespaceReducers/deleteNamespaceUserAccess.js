/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_NAMESPACE_USER_ACCESS_INVALID,
  DELETE_NAMESPACE_USER_ACCESS_REQUESTING,
  DELETE_NAMESPACE_USER_ACCESS_SUCCESS,
  DELETE_NAMESPACE_USER_ACCESS_FAILURE
} from '../../constants/namespaceConstants/deleteNamespaceUserAccess';
import type { Action } from '../../types';

const initialState = {
  readyStatus: DELETE_NAMESPACE_USER_ACCESS_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idName: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_NAMESPACE_USER_ACCESS_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_NAMESPACE_USER_ACCESS_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idName: null,
        err: null
      });
    case DELETE_NAMESPACE_USER_ACCESS_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_NAMESPACE_USER_ACCESS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idName: action.idName,
        err: null
      });
    case DELETE_NAMESPACE_USER_ACCESS_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_NAMESPACE_USER_ACCESS_FAILURE,
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
