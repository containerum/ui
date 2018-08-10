/* @flow */

import _ from 'lodash/fp';

import {
  CREATE_SECRET_INVALID,
  CREATE_SECRET_REQUESTING,
  CREATE_SECRET_SUCCESS,
  CREATE_SECRET_FAILURE
} from '../../constants/secretConstants/createSecret';
import type { Action } from '../../types';

const initialState = {
  readyStatus: CREATE_SECRET_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  secretName: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case CREATE_SECRET_REQUESTING:
      return _.assign(state, {
        readyStatus: CREATE_SECRET_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        secretName: null,
        err: null
      });
    case CREATE_SECRET_SUCCESS:
      return _.assign(state, {
        readyStatus: CREATE_SECRET_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        secretName: action.secretName,
        err: null
      });
    case CREATE_SECRET_FAILURE:
      return _.assign(state, {
        readyStatus: CREATE_SECRET_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: null,
        secretName: action.secretName,
        err: action.err
      });
    default:
      return state;
  }
};
