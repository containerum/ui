/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_IMAGE_TOKEN_INVALID,
  DELETE_IMAGE_TOKEN_REQUESTING,
  DELETE_IMAGE_TOKEN_SUCCESS,
  DELETE_IMAGE_TOKEN_FAILURE
} from '../../constants/webHookConstants/deleteImageToken';
import type { Action } from '../../types';

const initialState = {
  readyStatus: DELETE_IMAGE_TOKEN_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  label: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_IMAGE_TOKEN_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_IMAGE_TOKEN_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        label: null,
        err: null
      });
    case DELETE_IMAGE_TOKEN_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_IMAGE_TOKEN_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        label: action.label,
        err: null
      });
    case DELETE_IMAGE_TOKEN_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_IMAGE_TOKEN_FAILURE,
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
