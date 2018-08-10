/* @flow */

import _ from 'lodash/fp';

import {
  GET_SECRET_INVALID,
  GET_SECRET_REQUESTING,
  GET_SECRET_SUCCESS,
  GET_SECRET_FAILURE
} from '../../constants/secretConstants/getSecret';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_SECRET_INVALID,
  isFetching: false,
  data: null,
  status: null,
  idName: null,
  idSecret: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_SECRET_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_SECRET_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        idName: null,
        idSecret: null,
        err: null
      });
    case GET_SECRET_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_SECRET_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        idName: action.idName,
        idSecret: action.idSecret,
        err: null
      });
    case GET_SECRET_FAILURE:
      return _.assign(state, {
        readyStatus: GET_SECRET_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        idName: action.idName,
        idSecret: action.idSecret,
        err: action.err
      });
    default:
      return state;
  }
};
