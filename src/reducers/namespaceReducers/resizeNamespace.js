/* @flow */

import _ from 'lodash/fp';

import {
  RESIZE_NAMESPACE_INVALID,
  RESIZE_NAMESPACE_REQUESTING,
  RESIZE_NAMESPACE_SUCCESS,
  RESIZE_NAMESPACE_FAILURE
} from '../../constants/namespaceConstants/resizeNamespace';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: RESIZE_NAMESPACE_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idName: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case RESIZE_NAMESPACE_REQUESTING:
      return _.assign(state, {
        readyStatus: RESIZE_NAMESPACE_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idName: null,
        err: null
      });
    case RESIZE_NAMESPACE_SUCCESS:
      return _.assign(state, {
        readyStatus: RESIZE_NAMESPACE_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idName: action.idName,
        err: null
      });
    case RESIZE_NAMESPACE_FAILURE:
      return _.assign(state, {
        readyStatus: RESIZE_NAMESPACE_FAILURE,
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
