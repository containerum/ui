/* @flow */

// import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_VOLUME_REQUESTING,
  GET_VOLUME_SUCCESS,
  GET_VOLUME_FAILURE
} from '../../constants/volumeConstants/getVolume';
// import isTokenExist from '../functions/isTokenExist';
import { webApi } from '../../config/index';

const getVolumeRequest = () => ({
  type: GET_VOLUME_REQUESTING,
  isFetching: true
});

const getVolumeSuccess = (data, status, method, idVol) => ({
  type: GET_VOLUME_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idVol
});

const getVolumeFailure = (err, status, idVol) => ({
  type: GET_VOLUME_FAILURE,
  isFetching: false,
  err,
  status,
  idVol
});

const getVolumeInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetVolume = (
  idVol: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(getVolumeRequest());

  const response = await axios.get(`${URL}/api/volumes/${idVol}`, {
    headers: {
      'User-Client': browser,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control':
        'no-cache, no-store, must-revalidate, max-age=-1, private'
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data, config } = response;
  switch (status) {
    case 200: {
      dispatch(getVolumeSuccess(data, status, config.method, idVol));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getVolumeInvalidToken());
      } else dispatch(getVolumeFailure(data.message, status, idVol));
      break;
    }
    default: {
      dispatch(getVolumeFailure(data.message, status, idVol));
    }
  }
};

export const fetchGetVolumeIfNeeded = (idVol: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetVolume(idVol, axios));
