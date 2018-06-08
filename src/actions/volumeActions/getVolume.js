/* @flow */

import { push } from 'react-router-redux';
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
  idName: string,
  idVol: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getVolumeRequest());

  const response = await axios.get(
    `${URL}/namespaces/${idName}/volumes/${idVol}`,
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
      dispatch(getVolumeSuccess(data, status, config.method, idVol));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getVolumeInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(getVolumeFailure(data.message, status, idVol));
      break;
    }
    default: {
      dispatch(getVolumeFailure(data.message, status, idVol));
    }
  }
};

export const fetchGetVolumeIfNeeded = (
  idName: string,
  idVol: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetVolume(idName, idVol, axios));
