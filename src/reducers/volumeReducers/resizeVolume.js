/* @flow */

import _ from 'lodash/fp';

import {
  RESIZE_VOLUME_INVALID,
  RESIZE_VOLUME_REQUESTING,
  RESIZE_VOLUME_SUCCESS,
  RESIZE_VOLUME_FAILURE
} from '../../constants/volumeConstants/resizeVolume';
import type { Action } from '../../types';

const initialState = {
  readyStatus: RESIZE_VOLUME_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idVol: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case RESIZE_VOLUME_REQUESTING:
      return _.assign(state, {
        readyStatus: RESIZE_VOLUME_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idVol: null,
        err: null
      });
    case RESIZE_VOLUME_SUCCESS:
      return _.assign(state, {
        readyStatus: RESIZE_VOLUME_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idVol: action.idVol,
        err: null
      });
    case RESIZE_VOLUME_FAILURE:
      return _.assign(state, {
        readyStatus: RESIZE_VOLUME_FAILURE,
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
