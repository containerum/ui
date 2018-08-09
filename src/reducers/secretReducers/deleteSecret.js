/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_SECRET_INVALID,
  DELETE_SECRET_REQUESTING,
  DELETE_SECRET_SUCCESS,
  DELETE_SECRET_FAILURE
} from '../../constants/secretConstants/deleteSecret';
import type { Action } from '../../types';

const initialState = {
  readyStatus: DELETE_SECRET_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idSecret: null,
  configMapName: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_SECRET_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_SECRET_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idSecret: null,
        configMapName: null,
        err: null
      });
    case DELETE_SECRET_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_SECRET_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idSecret: action.idSecret,
        configMapName: action.configMapName,
        err: null
      });
    case DELETE_SECRET_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_SECRET_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: null,
        idSecret: action.idSecret,
        configMapName: action.configMapName,
        err: action.err
      });
    default:
      return state;
  }
};
