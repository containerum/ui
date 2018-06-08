/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  CREATE_VOLUME_REQUESTING,
  CREATE_VOLUME_SUCCESS,
  CREATE_VOLUME_FAILURE
} from '../../constants/volumeConstants/createVolume';
import { webApi, routerLinks } from '../../config';

// const isServer = typeof window === 'undefined';
// const ReactGA = isServer ? require('react-ga') : null;

const createVolumeRequest = () => ({
  type: CREATE_VOLUME_REQUESTING,
  isFetching: true
});

const createVolumeSuccess = (data, status, method, idVol) => ({
  type: CREATE_VOLUME_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idVol
});

const createVolumeFailure = (err, status, idVol) => ({
  type: CREATE_VOLUME_FAILURE,
  isFetching: false,
  err,
  status,
  idVol
});

const createVolumeInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchCreateVolume = (
  idVol: string,
  idName: string,
  tariff: string,
  price: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(createVolumeRequest());

  const response = await axios.post(
    `${URL}/namespaces/${idName}/volumes`,
    {
      label: idVol,
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
    case 201: {
      dispatch(createVolumeSuccess(data, status, config.method, idVol));
      // if (
      //   typeof window !== 'undefined' &&
      //   typeof window.navigator !== 'undefined'
      // ) {
      //   ReactGA.event({
      //     category: 'UI',
      //     action: `UI_create_vol_${price}`
      //   });
      // }
      dispatch(push(routerLinks.getVolumesLink(idName)));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(createVolumeInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(createVolumeFailure(data.message, status, idVol));
      break;
    }
    default: {
      dispatch(createVolumeFailure(data.message, status, idVol));
    }
  }
};

export const fetchCreateVolumeIfNeeded = (
  idVol: string,
  idName: string,
  tariff: string,
  price: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchCreateVolume(idVol, idName, tariff, price, axios));
