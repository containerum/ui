/* @flow */

import _ from 'lodash/fp';

import {
  GET_RESOURCES_INVALID,
  GET_RESOURCES_REQUESTING,
  GET_RESOURCES_SUCCESS,
  GET_RESOURCES_FAILURE
} from '../../constants/statisticsConstants/getResourcesConstants';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_RESOURCES_INVALID,
  isFetching: false,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_RESOURCES_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_RESOURCES_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_RESOURCES_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_RESOURCES_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_RESOURCES_FAILURE:
      return _.assign(state, {
        readyStatus: GET_RESOURCES_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
