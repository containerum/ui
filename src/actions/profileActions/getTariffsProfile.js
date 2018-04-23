/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_PROFILE_TARIFFS_REQUESTING,
  GET_PROFILE_TARIFFS_SUCCESS,
  GET_PROFILE_TARIFFS_FAILURE
} from '../../constants/profileConstants/getProfileTariffs';
import { webApiLogin } from '../../config/index';

const getProfileTariffsRequest = () => ({
  type: GET_PROFILE_TARIFFS_REQUESTING,
  isFetching: true
});

const getProfileTariffsSuccess = data => ({
  type: GET_PROFILE_TARIFFS_SUCCESS,
  isFetching: false,
  data
});

const getProfileTariffsFailure = err => ({
  type: GET_PROFILE_TARIFFS_FAILURE,
  isFetching: false,
  err
});

const getProfileTariffsInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetProfileTariffs = (
  monthly: ?string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getProfileTariffsRequest());

  const response = await axios.get(
    `${URL}/isp/user/tariffs${monthly && `?monthly=${monthly}`}`,
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  // console.log(data);
  switch (status) {
    case 200: {
      dispatch(getProfileTariffsSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getProfileTariffsInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(getProfileTariffsFailure(data.message));
      break;
    }
    default: {
      dispatch(getProfileTariffsFailure(data.message));
    }
  }
};

export const fetchGetProfileTariffsIfNeeded = (
  monthly: ?string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetProfileTariffs(monthly, axios));
