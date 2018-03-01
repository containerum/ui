/* @flow */

import _ from 'lodash/fp';

import {
  GET_IMAGES_TOKEN_INVALID,
  GET_IMAGES_TOKEN_REQUESTING,
  GET_IMAGES_TOKEN_SUCCESS,
  GET_IMAGES_TOKEN_FAILURE
} from '../../constants/webHookConstants/getImagesToken';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_IMAGES_TOKEN_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_IMAGES_TOKEN_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_IMAGES_TOKEN_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case GET_IMAGES_TOKEN_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_IMAGES_TOKEN_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_IMAGES_TOKEN_FAILURE:
      return _.assign(state, {
        readyStatus: GET_IMAGES_TOKEN_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
