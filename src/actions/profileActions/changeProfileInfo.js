/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  CHANGE_PROFILE_INFO_REQUESTING,
  CHANGE_PROFILE_INFO_SUCCESS,
  CHANGE_PROFILE_INFO_FAILURE
} from '../../constants/profileConstants/changeProfileInfo';
import { webApiLogin } from '../../config/index';

const changeProfileInfoRequest = () => ({
  type: CHANGE_PROFILE_INFO_REQUESTING,
  isFetching: true
});

const changeProfileInfoSuccess = (data, status, method) => ({
  type: CHANGE_PROFILE_INFO_SUCCESS,
  isFetching: false,
  data,
  status,
  method
});

const changeProfileInfoFailure = (err, status, method) => ({
  type: CHANGE_PROFILE_INFO_FAILURE,
  isFetching: false,
  err,
  status,
  method
});

const changeProfileInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchChangeProfileInfo = (
  countryCode: number,
  firstName: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(changeProfileInfoRequest());

  const response = await axios.put(
    `${URL}/user/info`,
    {
      country_code: countryCode,
      first_name: firstName
    },
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
        // 'Content-Type': 'application/json'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data, config } = response;
  switch (status) {
    case 200: {
      dispatch(changeProfileInfoSuccess(data, status, config.method));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(changeProfileInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else
        dispatch(changeProfileInfoFailure(data.message, status, config.method));
      break;
    }
    default: {
      dispatch(changeProfileInfoFailure(data.message, status, config.method));
    }
  }
};

export const fetchChangeProfileInfoIfNeeded = (
  countryCode: number,
  firstName: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchChangeProfileInfo(countryCode, firstName, axios));
