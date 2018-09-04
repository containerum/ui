/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  UPDATE_CUSTOM_VOLUME_REQUESTING,
  UPDATE_CUSTOM_VOLUME_SUCCESS,
  UPDATE_CUSTOM_VOLUME_FAILURE
} from '../../constants/volumeConstants/updateCustomVolume';
import { webApi, routerLinks } from '../../config';

const updateCustomVolumeRequest = () => ({
  type: UPDATE_CUSTOM_VOLUME_REQUESTING,
  isFetching: true
});

const updateCustomVolumeSuccess = (data, status, method, idVol) => ({
  type: UPDATE_CUSTOM_VOLUME_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idVol
});

const updateCustomVolumeFailure = (err, status) => ({
  type: UPDATE_CUSTOM_VOLUME_FAILURE,
  isFetching: false,
  err,
  status
});

const updateCustomVolumeInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchUpdateCustomVolume = (
  dataNS: Object,
  idName: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(updateCustomVolumeRequest());

  const { label, storage } = dataNS;
  const response = await axios.put(
    `${URL}/admin/namespaces/${idName}/volumes/${label}`,
    {
      capacity: storage
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
      dispatch(updateCustomVolumeSuccess(data, 202, config.method, label));
      dispatch(push(`${routerLinks.namespaceLink(idName)}/volumes`));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(updateCustomVolumeInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(updateCustomVolumeFailure(data.message));
      break;
    }
    default: {
      dispatch(updateCustomVolumeFailure(data.message, status));
    }
  }
};

export const fetchUpdateCustomVolumeIfNeeded = (
  dataNS: Object,
  idName: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchUpdateCustomVolume(dataNS, idName, axios));
