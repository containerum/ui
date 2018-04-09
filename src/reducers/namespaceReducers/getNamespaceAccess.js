/* @flow */

import _ from 'lodash/fp';

import {
  GET_NAMESPACE_ACCESS_INVALID,
  GET_NAMESPACE_ACCESS_REQUESTING,
  GET_NAMESPACE_ACCESS_SUCCESS,
  GET_NAMESPACE_ACCESS_FAILURE
} from '../../constants/namespaceConstants/getNamespaceAccess';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_NAMESPACE_ACCESS_INVALID,
  isFetching: false,
  data: null,
  status: null,
  idName: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_NAMESPACE_ACCESS_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_NAMESPACE_ACCESS_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        idName: null,
        err: null
      });
    case GET_NAMESPACE_ACCESS_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_NAMESPACE_ACCESS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        idName: action.idName,
        err: null
      });
    case GET_NAMESPACE_ACCESS_FAILURE:
      return _.assign(state, {
        readyStatus: GET_NAMESPACE_ACCESS_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        idName: action.idName,
        err: action.err
      });
    default:
      return state;
  }
};
