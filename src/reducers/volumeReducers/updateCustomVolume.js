/* @flow */

import _ from 'lodash/fp';

import {
  UPDATE_CUSTOM_VOLUME_INVALID,
  UPDATE_CUSTOM_VOLUME_REQUESTING,
  UPDATE_CUSTOM_VOLUME_SUCCESS,
  UPDATE_CUSTOM_VOLUME_FAILURE
} from '../../constants/volumeConstants/updateCustomVolume';
import type { Action } from '../../types';

const initialState = {
  readyStatus: UPDATE_CUSTOM_VOLUME_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idVol: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_CUSTOM_VOLUME_REQUESTING:
      return _.assign(state, {
        readyStatus: UPDATE_CUSTOM_VOLUME_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idVol: null,
        err: null
      });
    case UPDATE_CUSTOM_VOLUME_SUCCESS:
      return _.assign(state, {
        readyStatus: UPDATE_CUSTOM_VOLUME_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idVol: action.idVol,
        err: null
      });
    case UPDATE_CUSTOM_VOLUME_FAILURE:
      return _.assign(state, {
        readyStatus: UPDATE_CUSTOM_VOLUME_FAILURE,
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
