/* @flow */

import _ from 'lodash/fp';

import {
  GET_RELEASES_INVALID,
  GET_RELEASES_REQUESTING,
  GET_RELEASES_SUCCESS,
  GET_RELEASES_FAILURE
} from '../constants/getReleasesGithubConstants';
import type { Action } from '../types';

const initialState = {
  readyStatus: GET_RELEASES_INVALID,
  isFetching: false,
  data: {},
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_RELEASES_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_RELEASES_REQUESTING,
        isFetching: action.isFetching,
        data: {},
        err: null
      });
    case GET_RELEASES_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_RELEASES_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_RELEASES_FAILURE:
      return _.assign(state, {
        readyStatus: GET_RELEASES_FAILURE,
        isFetching: action.isFetching,
        data: {},
        err: action.err
      });
    default:
      return state;
  }
};
