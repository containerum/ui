/* @flow */

import _ from 'lodash/fp';

import {
  GET_USERLIST_INVALID,
  GET_USERLIST_REQUESTING,
  GET_USERLIST_SUCCESS,
  GET_USERLIST_FAILURE
} from '../../constants/globalMembership/getUserList';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_USERLIST_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_USERLIST_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_USERLIST_REQUESTING,
        isFetching: action.isFetching,
        data: [],
        err: null
      });
    case GET_USERLIST_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_USERLIST_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_USERLIST_FAILURE:
      return _.assign(state, {
        readyStatus: GET_USERLIST_FAILURE,
        isFetching: action.isFetching,
        data: [],
        err: action.err
      });
    default:
      return state;
  }
};
