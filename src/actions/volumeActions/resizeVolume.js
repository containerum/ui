/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  RESIZE_VOLUME_REQUESTING,
  RESIZE_VOLUME_SUCCESS,
  RESIZE_VOLUME_FAILURE
} from '../../constants/volumeConstants/resizeVolume';
// import isTokenExist from '../functions/isTokenExist';
import { webApi } from '../../config/index';

const resizeVolumeRequest = () => ({
  type: RESIZE_VOLUME_REQUESTING,
  isFetching: true
});

const resizeVolumeSuccess = (data, status, method, idVol) => ({
  type: RESIZE_VOLUME_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idVol
});

const resizeVolumeFailure = (err, status, idVol) => ({
  type: RESIZE_VOLUME_FAILURE,
  isFetching: false,
  err,
  status,
  idVol
});

const resizeVolumeInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchResizeVolume = (
  idVol: string,
  tariff: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');

  dispatch(resizeVolumeRequest());

  const response = await axios.put(
    `${URL}/api/volumes/${idVol}`,
    {
      tariff_label: tariff
    },
    {
      headers: {
        'User-Client': browser,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control':
          'no-cache, no-store, must-revalidate, max-age=-1, private'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data, config } = response;
  switch (status) {
    case 202: {
      dispatch(resizeVolumeSuccess(data, status, config.method, idVol));
      dispatch(push('/volumes'));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(resizeVolumeInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(resizeVolumeFailure(data.message, status, idVol));
      break;
    }
    default: {
      dispatch(resizeVolumeFailure(data.message, status, idVol));
    }
  }
};

export const fetchResizeVolumeIfNeeded = (
  idVol: string,
  tariff: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchResizeVolume(idVol, tariff, axios));
