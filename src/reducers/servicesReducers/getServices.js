/* @flow */

import _ from 'lodash/fp';

import {
  GET_SERVICES_INVALID,
  GET_SERVICES_REQUESTING,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILURE
} from '../../constants/servicesConstants/getServices';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_SERVICES_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_SERVICES_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_SERVICES_REQUESTING,
        isFetching: action.isFetching,
        data: [],
        err: null
      });
    case GET_SERVICES_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_SERVICES_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_SERVICES_FAILURE:
      return _.assign(state, {
        readyStatus: GET_SERVICES_FAILURE,
        isFetching: action.isFetching,
        data: [],
        err: action.err
      });
    default:
      return state;
  }
};
