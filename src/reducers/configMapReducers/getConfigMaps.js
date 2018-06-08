/* @flow */

import _ from 'lodash/fp';

import {
  GET_CONFIG_MAPS_INVALID,
  GET_CONFIG_MAPS_REQUESTING,
  GET_CONFIG_MAPS_SUCCESS,
  GET_CONFIG_MAPS_FAILURE
} from '../../constants/configMapConstants/getConfigMaps';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_CONFIG_MAPS_INVALID,
  isFetching: false,
  data: [],
  status: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_CONFIG_MAPS_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_CONFIG_MAPS_REQUESTING,
        isFetching: action.isFetching,
        data: [],
        status: null,
        err: null
      });
    case GET_CONFIG_MAPS_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_CONFIG_MAPS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        err: null
      });
    case GET_CONFIG_MAPS_FAILURE:
      return _.assign(state, {
        readyStatus: GET_CONFIG_MAPS_FAILURE,
        isFetching: action.isFetching,
        data: [],
        status: action.status,
        err: action.err
      });
    default:
      return state;
  }
};
