/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_PROFILE_REQUESTING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE
} from '../../constants/profileConstants/getProfile';
import { webApi, routerLinks } from '../../config';

const getProfileRequest = () => ({
  type: GET_PROFILE_REQUESTING,
  isFetching: true
});

const getProfileSuccess = data => ({
  type: GET_PROFILE_SUCCESS,
  isFetching: false,
  data
});

const getProfileFailure = err => ({
  type: GET_PROFILE_FAILURE,
  isFetching: false,
  err
});

const getProfileInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetProfile = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getProfileRequest());

  const response = await axios.get(`${URL}/user/info`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getProfileSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getProfileInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getProfileFailure(data.message));
      break;
    }
    default: {
      dispatch(getProfileFailure(data.message));
    }
  }
};

export const fetchGetProfileIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetProfile(axios));
