/* @flow */

import _ from 'lodash/fp';

import {
  GET_NAMESPACES_USAGE_INVALID,
  GET_NAMESPACES_USAGE_REQUESTING,
  GET_NAMESPACES_USAGE_SUCCESS,
  GET_NAMESPACES_USAGE_FAILURE
} from '../../constants/namespacesConstants/getUsageNamespaces';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_NAMESPACES_USAGE_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_NAMESPACES_USAGE_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_NAMESPACES_USAGE_REQUESTING,
        isFetching: action.isFetching,
        data: [],
        err: null
      });
    case GET_NAMESPACES_USAGE_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_NAMESPACES_USAGE_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_NAMESPACES_USAGE_FAILURE:
      return _.assign(state, {
        readyStatus: GET_NAMESPACES_USAGE_FAILURE,
        isFetching: action.isFetching,
        data: [],
        err: action.err
      });
    default:
      return state;
  }
};
