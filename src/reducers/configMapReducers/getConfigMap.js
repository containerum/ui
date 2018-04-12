/* @flow */

import _ from 'lodash/fp';

import {
  GET_CONFIG_MAP_INVALID,
  GET_CONFIG_MAP_REQUESTING,
  GET_CONFIG_MAP_SUCCESS,
  GET_CONFIG_MAP_FAILURE
} from '../../constants/configMapConstants/getConfigMap';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_CONFIG_MAP_INVALID,
  isFetching: false,
  data: null,
  status: null,
  idName: null,
  configMapName: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_CONFIG_MAP_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_CONFIG_MAP_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        idName: null,
        configMapName: null,
        err: null
      });
    case GET_CONFIG_MAP_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_CONFIG_MAP_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        idName: action.idName,
        configMapName: action.configMapName,
        err: null
      });
    case GET_CONFIG_MAP_FAILURE:
      return _.assign(state, {
        readyStatus: GET_CONFIG_MAP_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        idName: action.idName,
        configMapName: action.configMapName,
        err: action.err
      });
    default:
      return state;
  }
};
