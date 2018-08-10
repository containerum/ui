/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  CREATE_CUSTOM_VOLUME_REQUESTING,
  CREATE_CUSTOM_VOLUME_SUCCESS,
  CREATE_CUSTOM_VOLUME_FAILURE
} from '../../constants/volumeConstants/createCustomVolume';
import { webApi, routerLinks } from '../../config';

const createCustomVolumeRequest = () => ({
  type: CREATE_CUSTOM_VOLUME_REQUESTING,
  isFetching: true
});

const createCustomVolumeSuccess = (data, status, method, idVol) => ({
  type: CREATE_CUSTOM_VOLUME_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idVol
});

const createCustomVolumeFailure = (err, status, idVol) => ({
  type: CREATE_CUSTOM_VOLUME_FAILURE,
  isFetching: false,
  err,
  status,
  idVol
});

const createCustomVolumeInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchCreateCustomVolume = (
  idName: string,
  dataVol: Object,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(createCustomVolumeRequest());

  const { label, storage, currentStorage } = dataVol;
  const response = await axios.post(
    `${URL}/limits/namespaces/${idName}/volumes`,
    {
      label,
      capacity: storage,
      storage: currentStorage
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
    case 201: {
      dispatch(createCustomVolumeSuccess(data, status, config.method, label));
      dispatch(push(`${routerLinks.namespaceLink(idName)}/volumes`));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(createCustomVolumeInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(createCustomVolumeFailure(data.message));
      break;
    }
    default: {
      dispatch(createCustomVolumeFailure(data.message, status));
    }
  }
};

export const fetchCreateCustomVolumeIfNeeded = (
  idName: string,
  dataVol: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchCreateCustomVolume(idName, dataVol, axios));
