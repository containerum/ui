/* @flow */

import _ from 'lodash/fp';

import {
  CREATE_DOMAIN_INVALID,
  CREATE_DOMAIN_REQUESTING,
  CREATE_DOMAIN_SUCCESS,
  CREATE_DOMAIN_FAILURE
} from '../../constants/serviceConstants/createDomain';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: CREATE_DOMAIN_INVALID,
  isFetching: false,
  data: null,
  status: null,
  idName: null,
  idSrv: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case CREATE_DOMAIN_REQUESTING:
      return _.assign(state, {
        readyStatus: CREATE_DOMAIN_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        idName: null,
        idSrv: null,
        err: null
      });
    case CREATE_DOMAIN_SUCCESS:
      return _.assign(state, {
        readyStatus: CREATE_DOMAIN_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        idName: action.idName,
        idSrv: action.idSrv,
        err: null
      });
    case CREATE_DOMAIN_FAILURE:
      return _.assign(state, {
        readyStatus: CREATE_DOMAIN_FAILURE,
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
