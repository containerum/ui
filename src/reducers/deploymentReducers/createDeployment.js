/* @flow */

import _ from 'lodash/fp';

import {
  CREATE_DEPLOYMENT_INVALID,
  CREATE_DEPLOYMENT_REQUESTING,
  CREATE_DEPLOYMENT_SUCCESS,
  CREATE_DEPLOYMENT_FAILURE
} from '../../constants/deploymentConstants/createDeployment';
import type { Action } from '../../types';

const initialState = {
  readyStatus: CREATE_DEPLOYMENT_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idDep: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case CREATE_DEPLOYMENT_REQUESTING:
      return _.assign(state, {
        readyStatus: CREATE_DEPLOYMENT_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idDep: null,
        err: null
      });
    case CREATE_DEPLOYMENT_SUCCESS:
      return _.assign(state, {
        readyStatus: CREATE_DEPLOYMENT_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idDep: action.idDep,
        err: null
      });
    case CREATE_DEPLOYMENT_FAILURE:
      return _.assign(state, {
        readyStatus: CREATE_DEPLOYMENT_FAILURE,
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
