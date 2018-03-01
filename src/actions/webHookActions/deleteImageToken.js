/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_IMAGE_TOKEN_REQUESTING,
  DELETE_IMAGE_TOKEN_SUCCESS,
  DELETE_IMAGE_TOKEN_FAILURE
} from '../../constants/webHookConstants/deleteImageToken';
import { webApi } from '../../config/index';

const deleteImageTokenRequest = () => ({
  type: DELETE_IMAGE_TOKEN_REQUESTING,
  isFetching: true
});

const deleteImageTokenSuccess = (data, status, method, label) => ({
  type: DELETE_IMAGE_TOKEN_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  label
});

const deleteImageTokenFailure = (err, status, label) => ({
  type: DELETE_IMAGE_TOKEN_FAILURE,
  isFetching: false,
  err,
  status,
  label
});

export const fetchDeleteImageToken = (
  label: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(deleteImageTokenRequest());

  const response = await axios.delete(`${URL}/api/set_image_tokens/${label}`, {
    headers: {
      Authorization: token,
      'User-Client': browser,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control':
        'no-cache, no-store, must-revalidate, max-age=-1, private'
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data, config } = response;
  switch (status) {
    case 202: {
      dispatch(deleteImageTokenSuccess(data, status, config.method, label));
      break;
    }
    case 401: {
      dispatch(deleteImageTokenFailure(data.message, status, label));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(deleteImageTokenFailure(data.message, status, label));
    }
  }
};

export const fetchDeleteImageTokenIfNeeded = (label: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchDeleteImageToken(label, axios));
