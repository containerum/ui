/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  DELETE_CONFIG_MAP_REQUESTING,
  DELETE_CONFIG_MAP_SUCCESS,
  DELETE_CONFIG_MAP_FAILURE
} from '../../constants/configMapConstants/deleteConfigMap';
import { routerLinks, webApi } from '../../config';

const deleteConfigMapRequest = () => ({
  type: DELETE_CONFIG_MAP_REQUESTING,
  isFetching: true
});

const deleteConfigMapSuccess = (
  data,
  status,
  method,
  configMapName,
  idName
) => ({
  type: DELETE_CONFIG_MAP_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idName,
  configMapName
});

const deleteConfigMapFailure = (err, status, configMapName, idName) => ({
  type: DELETE_CONFIG_MAP_FAILURE,
  isFetching: false,
  err,
  status,
  idName,
  configMapName
});

const deleteConfigMapInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeleteConfigMap = (
  idName: string,
  configMapName: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(deleteConfigMapRequest());

  const response = await axios.delete(
    `${URL}/namespaces/${idName}/configmaps/${configMapName}`,
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
    case 202: {
      dispatch(
        deleteConfigMapSuccess(data, 202, config.method, configMapName, idName)
      );
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteConfigMapInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else
        dispatch(
          deleteConfigMapFailure(data.message, status, configMapName, idName)
        );
      break;
    }
    default: {
      dispatch(
        deleteConfigMapFailure(data.message, status, configMapName, idName)
      );
    }
  }
};

export const fetchDeleteConfigMapIfNeeded = (
  idName: string,
  configMapName: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeleteConfigMap(idName, configMapName, axios));
