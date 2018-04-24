/* @flow */

import _ from 'lodash/fp';

import {
  UPDATE_EXTERNAL_SERVICE_INVALID,
  UPDATE_EXTERNAL_SERVICE_REQUESTING,
  UPDATE_EXTERNAL_SERVICE_SUCCESS,
  UPDATE_EXTERNAL_SERVICE_FAILURE
} from '../../constants/serviceConstants/updateExternalService';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: UPDATE_EXTERNAL_SERVICE_INVALID,
  isFetching: false,
  data: null,
  status: null,
  idName: null,
  idSrv: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_EXTERNAL_SERVICE_REQUESTING:
      return _.assign(state, {
        readyStatus: UPDATE_EXTERNAL_SERVICE_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        idName: null,
        idSrv: null,
        err: null
      });
    case UPDATE_EXTERNAL_SERVICE_SUCCESS:
      return _.assign(state, {
        readyStatus: UPDATE_EXTERNAL_SERVICE_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        idName: action.idName,
        idSrv: action.idSrv,
        method: action.method,
        err: null
      });
    case UPDATE_EXTERNAL_SERVICE_FAILURE:
      return _.assign(state, {
        readyStatus: UPDATE_EXTERNAL_SERVICE_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        idName: action.idName,
        idSrv: action.idSrv,
        err: action.err
      });
    default:
      return state;
  }
};
