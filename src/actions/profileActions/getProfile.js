/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_PROFILE_REQUESTING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE
} from '../../constants/profileConstants/getProfile';
import { webApi } from '../../config/index';

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

export const fetchGetProfile = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(getProfileRequest());

  const response = await axios.get(`${URL}/api/profile`, {
    headers: {
      Authorization: token,
      'User-Client': browser,
      'Content-Type': 'application/x-www-form-urlencode',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control':
        'no-cache, no-store, must-revalidate, max-age=-1, private'
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getProfileSuccess(data));
      break;
    }
    case 401: {
      dispatch(getProfileRequest());
      dispatch(push('/login'));
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
