/* @flow */

import _ from 'lodash/fp';

import {
  GET_STORAGES_INVALID,
  GET_STORAGES_REQUESTING,
  GET_STORAGES_SUCCESS,
  GET_STORAGES_FAILURE
} from '../../constants/storagesConstants/getStorages';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_STORAGES_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_STORAGES_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_STORAGES_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_STORAGES_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_STORAGES_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_STORAGES_FAILURE:
      return _.assign(state, {
        readyStatus: GET_STORAGES_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
