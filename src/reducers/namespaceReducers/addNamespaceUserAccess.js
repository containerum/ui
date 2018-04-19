/* @flow */

import _ from 'lodash/fp';

import {
  ADD_NAMESPACE_USER_ACCESS_INVALID,
  ADD_NAMESPACE_USER_ACCESS_REQUESTING,
  ADD_NAMESPACE_USER_ACCESS_SUCCESS,
  ADD_NAMESPACE_USER_ACCESS_FAILURE
} from '../../constants/namespaceConstants/addNamespaceUserAccess';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: ADD_NAMESPACE_USER_ACCESS_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idName: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_NAMESPACE_USER_ACCESS_REQUESTING:
      return _.assign(state, {
        readyStatus: ADD_NAMESPACE_USER_ACCESS_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idName: null,
        err: null
      });
    case ADD_NAMESPACE_USER_ACCESS_SUCCESS:
      return _.assign(state, {
        readyStatus: ADD_NAMESPACE_USER_ACCESS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idName: action.idName,
        err: null
      });
    case ADD_NAMESPACE_USER_ACCESS_FAILURE:
      return _.assign(state, {
        readyStatus: ADD_NAMESPACE_USER_ACCESS_FAILURE,
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
