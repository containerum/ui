/* @flow */

import _ from 'lodash/fp';

import {
  ADMIN_DELETE_USER_INVALID,
  ADMIN_DELETE_USER_REQUESTING,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAILURE
} from '../../constants/globalMembership/adminDeleteUser';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: ADMIN_DELETE_USER_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idName: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ADMIN_DELETE_USER_REQUESTING:
      return _.assign(state, {
        readyStatus: ADMIN_DELETE_USER_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idName: null,
        err: null
      });
    case ADMIN_DELETE_USER_SUCCESS:
      return _.assign(state, {
        readyStatus: ADMIN_DELETE_USER_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idName: action.idName,
        err: null
      });
    case ADMIN_DELETE_USER_FAILURE:
      return _.assign(state, {
        readyStatus: ADMIN_DELETE_USER_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: null,
        idName: action.idName,
        err: action.err
      });
    default:
      return state;
  }
};
