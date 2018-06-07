/* @flow */

import _ from 'lodash/fp';

import {
  CREATE_EXTERNAL_SERVICE_INVALID,
  CREATE_EXTERNAL_SERVICE_REQUESTING,
  CREATE_EXTERNAL_SERVICE_SUCCESS,
  CREATE_EXTERNAL_SERVICE_FAILURE
} from '../../constants/serviceConstants/createExternalService';
import type { Action } from '../../types';

const initialState = {
  readyStatus: CREATE_EXTERNAL_SERVICE_INVALID,
  isFetching: false,
  data: null,
  status: null,
  idName: null,
  idSrv: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case CREATE_EXTERNAL_SERVICE_REQUESTING:
      return _.assign(state, {
        readyStatus: CREATE_EXTERNAL_SERVICE_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        idName: null,
        idSrv: null,
        err: null
      });
    case CREATE_EXTERNAL_SERVICE_SUCCESS:
      return _.assign(state, {
        readyStatus: CREATE_EXTERNAL_SERVICE_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        idName: action.idName,
        idSrv: action.idSrv,
        err: null
      });
    case CREATE_EXTERNAL_SERVICE_FAILURE:
      return _.assign(state, {
        readyStatus: CREATE_EXTERNAL_SERVICE_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        idName: action.idName,
        idSrv: action.idSrv,
        err: action.err
      });
    case CREATE_EXTERNAL_SERVICE_INVALID:
      return _.assign(state, {
        readyStatus: CREATE_EXTERNAL_SERVICE_INVALID,
        isFetching: false,
        data: null,
        status: null,
        idName: null,
        idSrv: null,
        err: null
      });
    default:
      return state;
  }
};
