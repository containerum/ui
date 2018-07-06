/* @flow */

import _ from 'lodash/fp';

import {
  GET_CONFIG_MAPS_BY_NS_INVALID,
  GET_CONFIG_MAPS_BY_NS_REQUESTING,
  GET_CONFIG_MAPS_BY_NS_SUCCESS,
  GET_CONFIG_MAPS_BY_NS_FAILURE
} from '../../constants/configMapConstants/getConfigMapsByNS';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_CONFIG_MAPS_BY_NS_INVALID,
  isFetching: false,
  data: [],
  status: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_CONFIG_MAPS_BY_NS_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_CONFIG_MAPS_BY_NS_REQUESTING,
        isFetching: action.isFetching,
        data: [],
        status: null,
        err: null
      });
    case GET_CONFIG_MAPS_BY_NS_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_CONFIG_MAPS_BY_NS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        err: null
      });
    case GET_CONFIG_MAPS_BY_NS_FAILURE:
      return _.assign(state, {
        readyStatus: GET_CONFIG_MAPS_BY_NS_FAILURE,
        isFetching: action.isFetching,
        data: [],
        status: action.status,
        err: action.err
      });
    default:
      return state;
  }
};
