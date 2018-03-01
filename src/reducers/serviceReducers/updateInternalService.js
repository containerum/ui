/* @flow */

import _ from 'lodash/fp';

import {
  UPDATE_INTERNAL_SERVICE_INVALID,
  UPDATE_INTERNAL_SERVICE_REQUESTING,
  UPDATE_INTERNAL_SERVICE_SUCCESS,
  UPDATE_INTERNAL_SERVICE_FAILURE
} from '../../constants/serviceConstants/updateInternalService';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: UPDATE_INTERNAL_SERVICE_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idSrv: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_INTERNAL_SERVICE_REQUESTING:
      return _.assign(state, {
        readyStatus: UPDATE_INTERNAL_SERVICE_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idSrv: null,
        err: null
      });
    case UPDATE_INTERNAL_SERVICE_SUCCESS:
      return _.assign(state, {
        readyStatus: UPDATE_INTERNAL_SERVICE_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idSrv: action.idSrv,
        err: null
      });
    case UPDATE_INTERNAL_SERVICE_FAILURE:
      return _.assign(state, {
        readyStatus: UPDATE_INTERNAL_SERVICE_FAILURE,
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
