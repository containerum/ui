/* @flow */

import _ from 'lodash/fp';

import {
  CREATE_IMAGE_TOKEN_INVALID,
  CREATE_IMAGE_TOKEN_REQUESTING,
  CREATE_IMAGE_TOKEN_SUCCESS,
  CREATE_IMAGE_TOKEN_FAILURE
} from '../../constants/webHookConstants/createImageToken';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: CREATE_IMAGE_TOKEN_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  label: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case CREATE_IMAGE_TOKEN_REQUESTING:
      return _.assign(state, {
        readyStatus: CREATE_IMAGE_TOKEN_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        label: null,
        err: null
      });
    case CREATE_IMAGE_TOKEN_SUCCESS:
      return _.assign(state, {
        readyStatus: CREATE_IMAGE_TOKEN_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        label: action.label,
        err: null
      });
    case CREATE_IMAGE_TOKEN_FAILURE:
      return _.assign(state, {
        readyStatus: CREATE_IMAGE_TOKEN_FAILURE,
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
