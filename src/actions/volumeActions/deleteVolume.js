/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  DELETE_VOLUME_REQUESTING,
  DELETE_VOLUME_SUCCESS,
  DELETE_VOLUME_FAILURE
} from '../../constants/volumeConstants/deleteVolume';
import { webApi, routerLinks } from '../../config';

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
  idName: string,
  idVol: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(deleteVolumeRequest());

  const response = await axios.delete(
    `${URL}/namespaces/${idName}/volumes/${idVol}`,
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { data, status, config } = response;
  switch (status) {
    case 200: {
      dispatch(deleteVolumeSuccess(data, 202, config.method, idVol));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteVolumeInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(deleteVolumeFailure(data.message, status, idVol));
      break;
    }
    default: {
      dispatch(deleteVolumeFailure(data.message, status, idVol));
    }
  }
};

export const fetchDeleteVolumeIfNeeded = (
  idName: string,
  idVol: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeleteVolume(idName, idVol, axios));
