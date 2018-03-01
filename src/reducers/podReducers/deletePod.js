/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_POD_INVALID,
  DELETE_POD_REQUESTING,
  DELETE_POD_SUCCESS,
  DELETE_POD_FAILURE
} from '../../constants/podConstants/deletePod';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: DELETE_POD_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idName: null,
  idPod: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_POD_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_POD_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idName: null,
        idPod: null,
        err: null
      });
    case DELETE_POD_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_POD_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idName: action.idName,
        idPod: action.idPod,
        err: null
      });
    case DELETE_POD_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_POD_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: null,
        idName: action.idName,
        idPod: action.idPod,
        err: action.err
      });
    default:
      return state;
  }
};
