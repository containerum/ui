/* @flow */

import _ from 'lodash/fp';

import {
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_SUCCESS,
  GET_NAMESPACES_FAILURE
} from '../../constants/namespacesConstants/getNamespaces';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_NAMESPACES_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_NAMESPACES_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_NAMESPACES_REQUESTING,
        isFetching: action.isFetching,
        data: [],
        err: null
      });
    case GET_NAMESPACES_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_NAMESPACES_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_NAMESPACES_FAILURE:
      return _.assign(state, {
        readyStatus: GET_NAMESPACES_FAILURE,
        isFetching: action.isFetching,
        data: [],
        err: action.err
      });
    default:
      return state;
  }
};
