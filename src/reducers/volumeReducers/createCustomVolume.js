/* @flow */

import _ from 'lodash/fp';

import {
  CREATE_CUSTOM_VOLUME_INVALID,
  CREATE_CUSTOM_VOLUME_REQUESTING,
  CREATE_CUSTOM_VOLUME_SUCCESS,
  CREATE_CUSTOM_VOLUME_FAILURE
} from '../../constants/volumeConstants/createCustomVolume';
import type { Action } from '../../types';

const initialState = {
  readyStatus: CREATE_CUSTOM_VOLUME_INVALID,
  isFetching: false,
  data: null,
  status: null,
  method: null,
  idVol: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case CREATE_CUSTOM_VOLUME_REQUESTING:
      return _.assign(state, {
        readyStatus: CREATE_CUSTOM_VOLUME_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        status: null,
        method: null,
        idVol: null,
        err: null
      });
    case CREATE_CUSTOM_VOLUME_SUCCESS:
      return _.assign(state, {
        readyStatus: CREATE_CUSTOM_VOLUME_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        status: action.status,
        method: action.method,
        idVol: action.idVol,
        err: null
      });
    case CREATE_CUSTOM_VOLUME_FAILURE:
      return _.assign(state, {
        readyStatus: CREATE_CUSTOM_VOLUME_FAILURE,
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
