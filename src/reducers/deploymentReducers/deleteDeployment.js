/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_DEPLOYMENT_INVALID,
  DELETE_DEPLOYMENT_REQUESTING,
  DELETE_DEPLOYMENT_SUCCESS,
  DELETE_DEPLOYMENT_FAILURE
} from '../../constants/deploymentConstants/deleteDeployment';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: DELETE_DEPLOYMENT_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idDep: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_DEPLOYMENT_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_DEPLOYMENT_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idDep: null,
        err: null
      });
    case DELETE_DEPLOYMENT_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_DEPLOYMENT_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idDep: action.idDep,
        err: null
      });
    case DELETE_DEPLOYMENT_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_DEPLOYMENT_FAILURE,
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
