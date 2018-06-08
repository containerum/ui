/* @flow */

import _ from 'lodash/fp';

import {
  GET_PROFILE_TARIFFS_INVALID,
  GET_PROFILE_TARIFFS_REQUESTING,
  GET_PROFILE_TARIFFS_SUCCESS,
  GET_PROFILE_TARIFFS_FAILURE
} from '../../constants/profileConstants/getProfileTariffs';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_PROFILE_TARIFFS_INVALID,
  isFetching: false,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_PROFILE_TARIFFS_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_PROFILE_TARIFFS_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_PROFILE_TARIFFS_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_PROFILE_TARIFFS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_PROFILE_TARIFFS_FAILURE:
      return _.assign(state, {
        readyStatus: GET_PROFILE_TARIFFS_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
