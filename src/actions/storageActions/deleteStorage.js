/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_STORAGE_REQUESTING,
  DELETE_STORAGE_SUCCESS,
  DELETE_STORAGE_FAILURE
} from '../../constants/storageConstants/deleteStorage';
import { webApi, routerLinks } from '../../config/index';

const deleteStorageRequest = () => ({
  type: DELETE_STORAGE_REQUESTING,
  isFetching: true
});

const deleteStorageSuccess = (data, status, method, name) => ({
  type: DELETE_STORAGE_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  name
});

const deleteStorageFailure = (err, status, name) => ({
  type: DELETE_STORAGE_FAILURE,
  isFetching: false,
  err,
  status,
  name
});

const deleteStorageInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeleteStorage = (
  name: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const accessToken = cookie.load('accessToken');
  const browser = cookie.load('browser');

  dispatch(deleteStorageRequest());

  const response = await axios.delete(`${URL}/storages/${name}`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data, config } = response;
  switch (status) {
    case 202: {
      dispatch(deleteStorageSuccess(data, status, config.method, name));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteStorageInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(deleteStorageFailure(data.message, status, name));

      break;
    }
    default: {
      dispatch(deleteStorageFailure(data.message, status, name));
    }
  }
};

export const fetchDeleteStorageIfNeeded = (name: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchDeleteStorage(name, axios));
