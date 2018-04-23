/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  CREATE_IMAGE_TOKEN_REQUESTING,
  CREATE_IMAGE_TOKEN_SUCCESS,
  CREATE_IMAGE_TOKEN_FAILURE
} from '../../constants/webHookConstants/createImageToken';
import { webApi } from '../../config/index';

const createImageTokenRequest = () => ({
  type: CREATE_IMAGE_TOKEN_REQUESTING,
  isFetching: true
});

const createImageTokenSuccess = (data, status, method, label) => ({
  type: CREATE_IMAGE_TOKEN_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  label
});

const createImageTokenFailure = (err, status, label) => ({
  type: CREATE_IMAGE_TOKEN_FAILURE,
  isFetching: false,
  err,
  status,
  label
});

const createImageTokenInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchCreateImageToken = (
  label: string,
  regexp: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');

  dispatch(createImageTokenRequest());

  const response = await axios.post(
    `${URL}/api/set_image_tokens`,
    {
      label,
      regexp
    },
    {
      headers: {
        'User-Client': browser,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control':
          'no-cache, no-store, must-revalidate, max-age=-1, private'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data, config } = response;
  switch (status) {
    case 201: {
      dispatch(createImageTokenSuccess(data, status, config.method, label));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(createImageTokenInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(createImageTokenFailure(data.message, status, label));
      break;
    }
    default: {
      dispatch(createImageTokenFailure(data.message, status, label));
    }
  }
};

export const fetchCreateImageTokenIfNeeded = (
  label: string,
  regexp: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchCreateImageToken(label, regexp, axios));
