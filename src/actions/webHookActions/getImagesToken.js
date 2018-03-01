/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_IMAGES_TOKEN_REQUESTING,
  GET_IMAGES_TOKEN_SUCCESS,
  GET_IMAGES_TOKEN_FAILURE
} from '../../constants/webHookConstants/getImagesToken';
import { webApi } from '../../config/index';

const getImagesTokenRequest = () => ({
  type: GET_IMAGES_TOKEN_REQUESTING,
  isFetching: true
});

const getImagesTokenSuccess = data => ({
  type: GET_IMAGES_TOKEN_SUCCESS,
  isFetching: false,
  data
});

const getImagesTokenFailure = err => ({
  type: GET_IMAGES_TOKEN_FAILURE,
  isFetching: false,
  err
});

export const fetchGetImagesToken = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(getImagesTokenRequest());

  const response = await axios.get(`${URL}/api/set_image_tokens`, {
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
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getImagesTokenSuccess(data));
      break;
    }
    case 401: {
      dispatch(getImagesTokenFailure(data.message));
      dispatch(push('/login'));
      break;
    }
    case 404: {
      dispatch(getImagesTokenSuccess([]));
      break;
    }
    default: {
      dispatch(getImagesTokenFailure(data.message));
    }
  }
};

export const fetchGetImagesTokenIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetImagesToken(axios));
