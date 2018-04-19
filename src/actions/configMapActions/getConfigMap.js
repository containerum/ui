/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_CONFIG_MAP_REQUESTING,
  GET_CONFIG_MAP_SUCCESS,
  GET_CONFIG_MAP_FAILURE
} from '../../constants/configMapConstants/getConfigMap';
import { webApiLogin } from '../../config/index';

const getConfigMapRequest = () => ({
  type: GET_CONFIG_MAP_REQUESTING,
  isFetching: true
});

const getConfigMapSuccess = (data, status, idName, configMapName) => ({
  type: GET_CONFIG_MAP_SUCCESS,
  isFetching: false,
  data,
  status,
  idName,
  configMapName
});

const getConfigMapFailure = (err, status, idName, configMapName) => ({
  type: GET_CONFIG_MAP_FAILURE,
  isFetching: false,
  err,
  status,
  idName,
  configMapName
});

const getConfigMapInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetConfigMap = (
  idName: string,
  configMapName: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(getConfigMapRequest());

  const response = await axios.get(
    `${URL}/namespaces/${idName}/configmaps/${configMapName}`,
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getConfigMapSuccess(data, status, idName, configMapName));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getConfigMapInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else
        dispatch(
          getConfigMapFailure(data.message, status, idName, configMapName)
        );
      break;
    }
    default: {
      dispatch(
        getConfigMapFailure(data.message, status, idName, configMapName)
      );
      dispatch(push('/namespaces'));
    }
  }
};

export const fetchGetConfigMapIfNeeded = (
  idName: string,
  configMapName: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetConfigMap(idName, configMapName, axios));
