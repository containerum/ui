/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_CONFIG_MAPS_REQUESTING,
  GET_CONFIG_MAPS_SUCCESS,
  GET_CONFIG_MAPS_FAILURE
} from '../../constants/configMapConstants/getConfigMaps';
// import isTokenExist from '../functions/isTokenExist';
import { webApiLogin } from '../../config/index';

const getConfigMapsRequest = () => ({
  type: GET_CONFIG_MAPS_REQUESTING,
  isFetching: true
});

const getConfigMapsSuccess = (data, status) => ({
  type: GET_CONFIG_MAPS_SUCCESS,
  isFetching: false,
  data,
  status
});

const getConfigMapsFailure = (err, status) => ({
  type: GET_CONFIG_MAPS_FAILURE,
  isFetching: false,
  err,
  status
});

const getConfigMapsInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetConfigMaps = (
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(getConfigMapsRequest());

  const response = await axios.get(`${URL}/configmaps`, {
    headers: {
      Authorization: token,
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      const commonData = [];
      Object.keys(data).map(config => {
        if (data[config].configmaps.length) {
          data[config].configmaps.map((item, index) =>
            commonData.push({
              idName: config,
              configmap: data[config].configmaps[index]
            })
          );
        }
        return commonData;
      });
      dispatch(getConfigMapsSuccess(commonData, status));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getConfigMapsInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(getConfigMapsFailure(data.message, status));
      break;
    }
    default: {
      dispatch(getConfigMapsFailure(data.message, status));
      dispatch(push('/namespaces'));
    }
  }
};

export const fetchGetConfigMapsIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetConfigMaps(axios));
