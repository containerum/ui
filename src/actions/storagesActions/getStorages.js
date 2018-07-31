/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_STORAGES_REQUESTING,
  GET_STORAGES_SUCCESS,
  GET_STORAGES_FAILURE
} from '../../constants/storagesConstants/getStorages';
import { webApi, routerLinks } from '../../config/index';

const getStoragesRequest = () => ({
  type: GET_STORAGES_REQUESTING,
  isFetching: true
});

const getStoragesSuccess = data => ({
  type: GET_STORAGES_SUCCESS,
  isFetching: false,
  data
});

const getStoragesFailure = err => ({
  type: GET_STORAGES_FAILURE,
  isFetching: false,
  err
});

const getStoragesInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetStorages = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const accessToken = cookie.load('accessToken');
  const browser = cookie.load('browser');

  dispatch(getStoragesRequest());

  const response = await axios.get(`${URL}/storages`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getStoragesSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getStoragesInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getStoragesFailure(data.message));
      break;
    }
    default: {
      dispatch(getStoragesFailure(data.message));
    }
  }
};

export const fetchGetStoragesIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetStorages(axios));
