/* @flow */

import _ from 'lodash/fp';

import {
  CREATE_NAMESPACE_INVALID,
  CREATE_NAMESPACE_REQUESTING,
  CREATE_NAMESPACE_SUCCESS,
  CREATE_NAMESPACE_FAILURE
} from '../../constants/namespaceConstants/createNamespace';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: CREATE_NAMESPACE_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idName: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case CREATE_NAMESPACE_REQUESTING:
      return _.assign(state, {
        readyStatus: CREATE_NAMESPACE_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idName: null,
        err: null
      });
    case CREATE_NAMESPACE_SUCCESS:
      return _.assign(state, {
        readyStatus: CREATE_NAMESPACE_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idName: action.idName,
        err: null
      });
    case CREATE_NAMESPACE_FAILURE:
      return _.assign(state, {
        readyStatus: CREATE_NAMESPACE_FAILURE,
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
