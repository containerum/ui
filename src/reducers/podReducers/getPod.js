/* @flow */

import _ from 'lodash/fp';

import {
  GET_POD_INVALID,
  GET_POD_REQUESTING,
  GET_POD_SUCCESS,
  GET_POD_FAILURE
} from '../../constants/podConstants/getPod';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_POD_INVALID,
  isFetching: false,
  data: null,
  status: null,
  idName: null,
  idDep: null,
  idPod: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_POD_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_POD_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        idName: null,
        idDep: null,
        idPod: null,
        err: null
      });
    case GET_POD_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_POD_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        idName: action.idName,
        idDep: action.idDep,
        idPod: action.idPod,
        err: null
      });
    case GET_POD_FAILURE:
      return _.assign(state, {
        readyStatus: GET_POD_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        idName: action.idName,
        idDep: action.idDep,
        idPod: action.idPod,
        err: action.err
      });
    default:
      return state;
  }
};
