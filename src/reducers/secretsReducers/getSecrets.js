/* @flow */

import _ from 'lodash/fp';

import {
  GET_SECRETS_INVALID,
  GET_SECRETS_REQUESTING,
  GET_SECRETS_SUCCESS,
  GET_SECRETS_FAILURE
} from '../../constants/secretsConstants/getSecrets';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_SECRETS_INVALID,
  isFetching: false,
  data: [],
  status: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_SECRETS_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_SECRETS_REQUESTING,
        isFetching: action.isFetching,
        data: [],
        status: null,
        err: null
      });
    case GET_SECRETS_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_SECRETS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        err: null
      });
    case GET_SECRETS_FAILURE:
      return _.assign(state, {
        readyStatus: GET_SECRETS_FAILURE,
        isFetching: action.isFetching,
        data: [],
        status: action.status,
        err: action.err
      });
    default:
      return state;
  }
};
