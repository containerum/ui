/* @flow */

import _ from 'lodash/fp';

import {
  GET_SERVICE_INVALID,
  GET_SERVICE_REQUESTING,
  GET_SERVICE_SUCCESS,
  GET_SERVICE_FAILURE
} from '../../constants/serviceConstants/getService';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_SERVICE_INVALID,
  isFetching: false,
  data: null,
  status: null,
  idName: null,
  idSrv: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_SERVICE_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_SERVICE_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        idName: null,
        idSrv: null,
        err: null
      });
    case GET_SERVICE_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_SERVICE_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        idName: action.idName,
        idSrv: action.idSrv,
        err: null
      });
    case GET_SERVICE_FAILURE:
      return _.assign(state, {
        readyStatus: GET_SERVICE_FAILURE,
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
