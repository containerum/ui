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

export const fetchChangeProfileInfo = (
  countryCode: number,
  firstName: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(changeProfileInfoRequest());

  const response = await axios.put(
    `${URL}/user/info`,
    {
      country_code: countryCode,
      first_name: firstName
    },
    {
      headers: {
        Authorization: token,
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
    case 401: {
      dispatch(changeProfileInfoFailure(data.message, status, config.method));
      dispatch(push('/login'));
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
