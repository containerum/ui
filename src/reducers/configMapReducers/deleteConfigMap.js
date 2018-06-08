/* @flow */

import _ from 'lodash/fp';

import {
  DELETE_CONFIG_MAP_INVALID,
  DELETE_CONFIG_MAP_REQUESTING,
  DELETE_CONFIG_MAP_SUCCESS,
  DELETE_CONFIG_MAP_FAILURE
} from '../../constants/configMapConstants/deleteConfigMap';
import type { Action } from '../../types';

const initialState = {
  readyStatus: DELETE_CONFIG_MAP_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idName: null,
  configMapName: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case DELETE_CONFIG_MAP_REQUESTING:
      return _.assign(state, {
        readyStatus: DELETE_CONFIG_MAP_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idName: null,
        configMapName: null,
        err: null
      });
    case DELETE_CONFIG_MAP_SUCCESS:
      return _.assign(state, {
        readyStatus: DELETE_CONFIG_MAP_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idName: action.idName,
        configMapName: action.configMapName,
        err: null
      });
    case DELETE_CONFIG_MAP_FAILURE:
      return _.assign(state, {
        readyStatus: DELETE_CONFIG_MAP_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: null,
        idName: action.idName,
        configMapName: action.configMapName,
        err: action.err
      });
    default:
      return state;
  }
};
