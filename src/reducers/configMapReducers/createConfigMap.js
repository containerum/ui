/* @flow */

import _ from 'lodash/fp';

import {
  CREATE_CONFIG_MAP_INVALID,
  CREATE_CONFIG_MAP_REQUESTING,
  CREATE_CONFIG_MAP_SUCCESS,
  CREATE_CONFIG_MAP_FAILURE
} from '../../constants/configMapConstants/createConfigMap';
import type { Action } from '../../types';

const initialState = {
  readyStatus: CREATE_CONFIG_MAP_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  configMapName: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case CREATE_CONFIG_MAP_REQUESTING:
      return _.assign(state, {
        readyStatus: CREATE_CONFIG_MAP_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        configMapName: null,
        err: null
      });
    case CREATE_CONFIG_MAP_SUCCESS:
      return _.assign(state, {
        readyStatus: CREATE_CONFIG_MAP_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        configMapName: action.configMapName,
        err: null
      });
    case CREATE_CONFIG_MAP_FAILURE:
      return _.assign(state, {
        readyStatus: CREATE_CONFIG_MAP_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: null,
        configMapName: action.configMapName,
        err: action.err
      });
    default:
      return state;
  }
};
