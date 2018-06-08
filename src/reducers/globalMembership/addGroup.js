/* @flow */

import _ from 'lodash/fp';

import {
  ADD_GROUP_INVALID,
  ADD_GROUP_REQUESTING,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAILURE
} from '../../constants/globalMembershipConstants/addGroup';
import type { Action } from '../../types';

const initialState = {
  readyStatus: ADD_GROUP_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idDep: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_GROUP_REQUESTING:
      return _.assign(state, {
        readyStatus: ADD_GROUP_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idDep: null,
        err: null
      });
    case ADD_GROUP_SUCCESS:
      return _.assign(state, {
        readyStatus: ADD_GROUP_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idDep: action.idDep,
        err: null
      });
    case ADD_GROUP_FAILURE:
      return _.assign(state, {
        readyStatus: ADD_GROUP_FAILURE,
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
