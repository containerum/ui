/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_USER_PROFILE_BY_EMAIL_REQUESTING,
  GET_USER_PROFILE_BY_EMAIL_SUCCESS,
  GET_USER_PROFILE_BY_EMAIL_FAILURE
} from '../../constants/profileConstants/getUserProfileByEmail';
import { webApi, routerLinks } from '../../config';

const getUserProfileByEmailRequest = () => ({
  type: GET_USER_PROFILE_BY_EMAIL_REQUESTING,
  isFetching: true
});

const getUserProfileByEmailSuccess = data => ({
  type: GET_USER_PROFILE_BY_EMAIL_SUCCESS,
  isFetching: false,
  data
});

const getUserProfileByEmailFailure = err => ({
  type: GET_USER_PROFILE_BY_EMAIL_FAILURE,
  isFetching: false,
  err
});

const getUserProfileByEmailInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetUserProfileByEmail = (
  login: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getUserProfileByEmailRequest());

  const response = await axios.get(`${URL}/user/info/login/${login}`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getUserProfileByEmailSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getUserProfileByEmailInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else {
        dispatch(getUserProfileByEmailFailure(data.message));
        window.history.back();
      }
      break;
    }
    case 404: {
      if (data.message === 'Token was not found in storage') {
        dispatch(push(routerLinks.login));
      } else {
        dispatch(getUserProfileByEmailFailure(data.message));
        window.history.back();
      }
      break;
    }
    case 403: {
      dispatch(push(routerLinks.login));
      break;
    }
    default: {
      dispatch(getUserProfileByEmailFailure(data.message));
      window.history.back();
    }
  }
};

export const fetchGetUserProfileByEmailIfNeeded = (
  login: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetUserProfileByEmail(login, axios));
