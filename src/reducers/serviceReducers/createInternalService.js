/* @flow */

import _ from 'lodash/fp';

import {
  CREATE_INTERNAL_SERVICE_INVALID,
  CREATE_INTERNAL_SERVICE_REQUESTING,
  CREATE_INTERNAL_SERVICE_SUCCESS,
  CREATE_INTERNAL_SERVICE_FAILURE
} from '../../constants/serviceConstants/createInternalService';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: CREATE_INTERNAL_SERVICE_INVALID,
  isFetching: false,
  data: null,
  status: null,
  idSrv: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case CREATE_INTERNAL_SERVICE_REQUESTING:
      return _.assign(state, {
        readyStatus: CREATE_INTERNAL_SERVICE_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        idSrv: null,
        err: null
      });
    case CREATE_INTERNAL_SERVICE_SUCCESS:
      return _.assign(state, {
        readyStatus: CREATE_INTERNAL_SERVICE_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        idSrv: action.idSrv,
        err: null
      });
    case CREATE_INTERNAL_SERVICE_FAILURE:
      return _.assign(state, {
        readyStatus: CREATE_INTERNAL_SERVICE_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        idSrv: action.idSrv,
        err: action.err
      });
    case CREATE_INTERNAL_SERVICE_INVALID:
      return _.assign(state, {
        readyStatus: CREATE_INTERNAL_SERVICE_INVALID,
        isFetching: false,
        data: null,
        status: null,
        idSrv: null,
        err: null
      });
    default:
      return state;
  }
};
