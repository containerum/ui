/* @flow */

import _ from 'lodash/fp';

import {
  GET_VOLUMES_BY_NS_INVALID,
  GET_VOLUMES_BY_NS_REQUESTING,
  GET_VOLUMES_BY_NS_SUCCESS,
  GET_VOLUMES_BY_NS_FAILURE
} from '../../constants/volumesConstants/getVolumesByNS';
import type { Action } from '../../types';

const initialState = {
  readyStatus: GET_VOLUMES_BY_NS_INVALID,
  isFetching: false,
  data: [],
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_VOLUMES_BY_NS_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_VOLUMES_BY_NS_REQUESTING,
        isFetching: action.isFetching,
        data: [],
        err: null
      });
    case GET_VOLUMES_BY_NS_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_VOLUMES_BY_NS_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case GET_VOLUMES_BY_NS_FAILURE:
      return _.assign(state, {
        readyStatus: GET_VOLUMES_BY_NS_FAILURE,
        isFetching: action.isFetching,
        data: [],
        err: action.err
      });
    default:
      return state;
  }
};
