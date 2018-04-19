/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';
// import cloneDeep from 'clone-deep';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  CREATE_CONFIG_MAP_REQUESTING,
  CREATE_CONFIG_MAP_SUCCESS,
  CREATE_CONFIG_MAP_FAILURE
} from '../../constants/configMapConstants/createConfigMap';
import { webApiLogin } from '../../config';

const createConfigMapRequest = () => ({
  type: CREATE_CONFIG_MAP_REQUESTING,
  isFetching: true
});

const createConfigMapSuccess = (data, status, method, configMapName) => ({
  type: CREATE_CONFIG_MAP_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  configMapName
});

const createConfigMapFailure = (err, status, configMapName) => ({
  type: CREATE_CONFIG_MAP_FAILURE,
  isFetching: false,
  err,
  status,
  configMapName
});

const createConfigMapInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchCreateConfigMap = (
  idName: string,
  dataObj: Object,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(createConfigMapRequest());

  const response = await axios.post(
    `${URL}/namespaces/${idName}/configmaps`,
    dataObj,
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
    case 201: {
      dispatch(createConfigMapSuccess(data, 201, config.method, dataObj.name));
      dispatch(push(`/namespaces/${idName}/configMaps`));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(createConfigMapInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(createConfigMapFailure(data.message, status));
      break;
    }
    default: {
      dispatch(createConfigMapFailure(data.message, status));
    }
  }
};

export const fetchCreateConfigMapIfNeeded = (
  idName: string,
  data: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchCreateConfigMap(idName, data, axios));
