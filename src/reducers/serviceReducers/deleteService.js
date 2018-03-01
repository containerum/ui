/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_SERVICE_INVALID,
  DELETE_SERVICE_REQUESTING,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAILURE
} from '../../constants/serviceConstants/deleteService';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: DELETE_SERVICE_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idSrv: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_SERVICE_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_SERVICE_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idSrv: null,
        err: null
      });
    case DELETE_SERVICE_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_SERVICE_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idSrv: action.idSrv,
        err: null
      });
    case DELETE_SERVICE_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_SERVICE_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: null,
        idSrv: action.idSrv,
        err: action.err
      });
    default:
      return state;
  }
};
