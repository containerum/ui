/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_VOLUME_REQUESTING,
  DELETE_VOLUME_SUCCESS,
  DELETE_VOLUME_FAILURE
} from '../../constants/volumeConstants/deleteVolume';
import { webApi } from '../../config';

const deleteVolumeRequest = () => ({
  type: DELETE_VOLUME_REQUESTING,
  isFetching: true
});

const deleteVolumeSuccess = (data, status, method, idVol) => ({
  type: DELETE_VOLUME_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idVol
});

const deleteVolumeFailure = (err, status, idVol) => ({
  type: DELETE_VOLUME_FAILURE,
  isFetching: false,
  err,
  status,
  idVol
});

const deleteVolumeInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeleteVolume = (
  idVol: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(deleteVolumeRequest());

  const response = await axios.delete(`${URL}/api/volumes/${idVol}`, {
    headers: {
      'User-Client': browser,
      'Content-Type': 'application/x-www-form-urlencode',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control':
        'no-cache, no-store, must-revalidate, max-age=-1, private'
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { data, status, config } = response;
  switch (status) {
    case 202: {
      dispatch(deleteVolumeSuccess(data, status, config.method, idVol));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteVolumeInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(deleteVolumeFailure(data.message, status, idVol));
      break;
    }
    default: {
      dispatch(deleteVolumeFailure(data.message, status, idVol));
    }
  }
};

export const fetchDeleteVolumeIfNeeded = (idVol: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchDeleteVolume(idVol, axios));
