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

export const fetchCreateImageToken = (
  label: string,
  regexp: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(createImageTokenRequest());

  const response = await axios.post(
    `${URL}/api/set_image_tokens`,
    {
      label,
      regexp
    },
    {
      headers: {
        Authorization: token,
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
    case 401: {
      dispatch(createImageTokenFailure(data.message, status, label));
      dispatch(push('/login'));
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
