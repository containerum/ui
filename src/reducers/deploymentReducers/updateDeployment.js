/* @flow */

import _ from 'lodash/fp';

import {
  UPDATE_DEPLOYMENT_INVALID,
  UPDATE_DEPLOYMENT_REQUESTING,
  UPDATE_DEPLOYMENT_SUCCESS,
  UPDATE_DEPLOYMENT_FAILURE
} from '../../constants/deploymentConstants/updateDeployment';
import type { Action } from '../../types';

const initialState = {
  readyStatus: UPDATE_DEPLOYMENT_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idDep: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_DEPLOYMENT_REQUESTING:
      return _.assign(state, {
        readyStatus: UPDATE_DEPLOYMENT_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idDep: null,
        err: null
      });
    case UPDATE_DEPLOYMENT_SUCCESS:
      return _.assign(state, {
        readyStatus: UPDATE_DEPLOYMENT_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idDep: action.idDep,
        err: null
      });
    case UPDATE_DEPLOYMENT_FAILURE:
      return _.assign(state, {
        readyStatus: UPDATE_DEPLOYMENT_FAILURE,
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
