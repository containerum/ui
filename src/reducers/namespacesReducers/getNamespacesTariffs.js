/* @flow */

import _ from 'lodash/fp';

import {
  GET_NAMESPACES_TARIFFS_INVALID,
  GET_NAMESPACES_TARIFFS_REQUESTING,
  GET_NAMESPACES_TARIFFS_SUCCESS,
  GET_NAMESPACES_TARIFFS_FAILURE
} from '../../constants/namespacesConstants/getNamespacesTariffs';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_NAMESPACES_TARIFFS_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_NAMESPACES_TARIFFS_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_NAMESPACES_TARIFFS_REQUESTING,
        isFetching: action.isFetching,
        data: [],
        err: null
      });
    case GET_NAMESPACES_TARIFFS_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_NAMESPACES_TARIFFS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_NAMESPACES_TARIFFS_FAILURE:
      return _.assign(state, {
        readyStatus: GET_NAMESPACES_TARIFFS_FAILURE,
        isFetching: action.isFetching,
        data: [],
        err: action.err
      });
    default:
      return state;
  }
};
