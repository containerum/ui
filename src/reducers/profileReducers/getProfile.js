/* @flow */

import _ from 'lodash/fp';

import {
  GET_PROFILE_INVALID,
  GET_PROFILE_REQUESTING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE
} from '../../constants/profileConstants/getProfile';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_PROFILE_INVALID,
  isFetching: false,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_PROFILE_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_PROFILE_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_PROFILE_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_PROFILE_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_PROFILE_FAILURE:
      return _.assign(state, {
        readyStatus: GET_PROFILE_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
