/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  RESIZE_VOLUME_REQUESTING,
  RESIZE_VOLUME_SUCCESS,
  RESIZE_VOLUME_FAILURE
} from '../../constants/volumeConstants/resizeVolume';
// import isTokenExist from '../functions/isTokenExist';
import { webApi, routerLinks } from '../../config';

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
  idName: string,
  tariff: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(resizeVolumeRequest());

  const response = await axios.put(
    `${URL}/namespaces/${idName}/volumes/${idVol}`,
    {
      tariff_id: tariff
    },
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data, config } = response;
  switch (status) {
    case 200: {
      dispatch(resizeVolumeSuccess(data, 202, config.method, idVol));
      dispatch(push(routerLinks.getVolumesLink(idName)));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(resizeVolumeInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
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
  idName: string,
  tariff: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchResizeVolume(idVol, idName, tariff, axios));
