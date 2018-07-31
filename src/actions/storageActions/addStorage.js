/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  ADD_STORAGE_REQUESTING,
  ADD_STORAGE_SUCCESS,
  ADD_STORAGE_FAILURE
} from '../../constants/storageConstants/addStorage';
import { webApi, routerLinks } from '../../config';

const addStorageRequest = () => ({
  type: ADD_STORAGE_REQUESTING,
  isFetching: true
});

const addStorageSuccess = (data, status, method, dataObj) => ({
  type: ADD_STORAGE_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  dataObj
});

const addStorageFailure = (err, status, dataObj) => ({
  type: ADD_STORAGE_FAILURE,
  isFetching: false,
  err,
  status,
  dataObj
});

const addStorageInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchAddStorage = (
  dataObj: Array,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(addStorageRequest());

  const response = await axios.post(
    `${URL}/storages`,
    {
      name: dataObj.name,
      size: parseInt(dataObj.size, 10)
      // used: parseInt(dataObj.used, 10)
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
      dispatch(addStorageSuccess(data, 201, config.method, dataObj));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(addStorageInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(addStorageFailure(data.message, status, dataObj));
      break;
    }
    default: {
      dispatch(addStorageFailure(data.message, status, dataObj));
    }
  }
};

export const fetchAddStorageIfNeeded = (dataObj: Array): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchAddStorage(dataObj, axios));
