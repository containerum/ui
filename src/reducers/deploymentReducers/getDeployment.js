/* @flow */

import _ from 'lodash/fp';

import {
  GET_DEPLOYMENT_INVALID,
  GET_DEPLOYMENT_REQUESTING,
  GET_DEPLOYMENT_SUCCESS,
  GET_DEPLOYMENT_FAILURE
} from '../../constants/deploymentConstants/getDeployment';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_DEPLOYMENT_INVALID,
  isFetching: false,
  data: null,
  status: null,
  idName: null,
  idDep: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_DEPLOYMENT_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_DEPLOYMENT_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        idName: null,
        idDep: null,
        err: null
      });
    case GET_DEPLOYMENT_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_DEPLOYMENT_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        idName: action.idName,
        idDep: action.idDep,
        err: null
      });
    case GET_DEPLOYMENT_FAILURE:
      return _.assign(state, {
        readyStatus: GET_DEPLOYMENT_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        idName: action.idName,
        idDep: action.idDep,
        err: action.err
      });
    default:
      return state;
  }
};
