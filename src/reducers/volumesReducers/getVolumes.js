/* @flow */

import _ from 'lodash/fp';

import {
  GET_VOLUMES_INVALID,
  GET_VOLUMES_REQUESTING,
  GET_VOLUMES_SUCCESS,
  GET_VOLUMES_FAILURE
} from '../../constants/volumesConstants/getVolumes';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_VOLUMES_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_VOLUMES_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_VOLUMES_REQUESTING,
        isFetching: action.isFetching,
        data: [],
        err: null
      });
    case GET_VOLUMES_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_VOLUMES_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_VOLUMES_FAILURE:
      return _.assign(state, {
        readyStatus: GET_VOLUMES_FAILURE,
        isFetching: action.isFetching,
        data: [],
        err: action.err
      });
    default:
      return state;
  }
};
