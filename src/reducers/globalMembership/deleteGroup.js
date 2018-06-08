/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_GROUP_INVALID,
  DELETE_GROUP_REQUESTING,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE
} from '../../constants/globalMembershipConstants/deleteGroup';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: DELETE_GROUP_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idDep: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_GROUP_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_GROUP_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idDep: null,
        err: null
      });
    case DELETE_GROUP_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_GROUP_SUCCESS,
        isFetching: action.isFetching,
        data: action.name,
        status: action.status,
        method: action.method,
        idDep: action.idDep,
        err: null
      });
    case DELETE_GROUP_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_GROUP_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: null,
        idDep: action.idDep,
        err: action.err
      });
    default:
      return state;
  }
};
