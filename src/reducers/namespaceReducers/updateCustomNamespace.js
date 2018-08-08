/* @flow */

import _ from 'lodash/fp';

import {
  UPDATE_CUSTOM_NAMESPACE_INVALID,
  UPDATE_CUSTOM_NAMESPACE_REQUESTING,
  UPDATE_CUSTOM_NAMESPACE_SUCCESS,
  UPDATE_CUSTOM_NAMESPACE_FAILURE
} from '../../constants/namespaceConstants/updateCustomNamespace';
import type { Action } from '../../types';

const initialState = {
  readyStatus: UPDATE_CUSTOM_NAMESPACE_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  label: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_CUSTOM_NAMESPACE_REQUESTING:
      return _.assign(state, {
        readyStatus: UPDATE_CUSTOM_NAMESPACE_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        label: null,
        err: null
      });
    case UPDATE_CUSTOM_NAMESPACE_SUCCESS:
      return _.assign(state, {
        readyStatus: UPDATE_CUSTOM_NAMESPACE_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        label: action.label,
        err: null
      });
    case UPDATE_CUSTOM_NAMESPACE_FAILURE:
      return _.assign(state, {
        readyStatus: UPDATE_CUSTOM_NAMESPACE_FAILURE,
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
