/* @flow */

import _ from 'lodash/fp';

import {
  GET_USER_PROFILE_BY_EMAIL_INVALID,
  GET_USER_PROFILE_BY_EMAIL_REQUESTING,
  GET_USER_PROFILE_BY_EMAIL_SUCCESS,
  GET_USER_PROFILE_BY_EMAIL_FAILURE
} from '../../constants/profileConstants/getUserProfileByEmail';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_USER_PROFILE_BY_EMAIL_INVALID,
  isFetching: false,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_USER_PROFILE_BY_EMAIL_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_USER_PROFILE_BY_EMAIL_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_USER_PROFILE_BY_EMAIL_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_USER_PROFILE_BY_EMAIL_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_USER_PROFILE_BY_EMAIL_FAILURE:
      return _.assign(state, {
        readyStatus: GET_USER_PROFILE_BY_EMAIL_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
