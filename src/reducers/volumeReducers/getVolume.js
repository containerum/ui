/* @flow */

import _ from 'lodash/fp';

import {
  GET_VOLUME_INVALID,
  GET_VOLUME_REQUESTING,
  GET_VOLUME_SUCCESS,
  GET_VOLUME_FAILURE
} from '../../constants/volumeConstants/getVolume';
import type { Action } from '../../types/index';

const initialState = {
  readyStatus: GET_VOLUME_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idVol: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_VOLUME_REQUESTING:
      return _.assign(state, {
        readyStatus: GET_VOLUME_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idVol: null,
        err: null
      });
    case GET_VOLUME_SUCCESS:
      return _.assign(state, {
        readyStatus: GET_VOLUME_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idVol: action.idVol,
        err: null
      });
    case GET_VOLUME_FAILURE:
      return _.assign(state, {
        readyStatus: GET_VOLUME_FAILURE,
        isFetching: action.isFetching,
        data: null,
        status: action.status,
        method: null,
        idVol: action.idVol,
        err: action.err
      });
    default:
      return state;
  }
};
