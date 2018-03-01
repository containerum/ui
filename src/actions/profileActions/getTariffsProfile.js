/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_PROFILE_TARIFFS_REQUESTING,
  GET_PROFILE_TARIFFS_SUCCESS,
  GET_PROFILE_TARIFFS_FAILURE
} from '../../constants/profileConstants/getProfileTariffs';
import { webApi } from '../../config/index';

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

export const fetchGetProfileTariffs = (
  monthly: ?string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(getProfileTariffsRequest());

  const response = await axios.get(
    `${URL}/api/profile/tariffs${monthly && `?monthly=${monthly}`}`,
    {
      headers: {
        Authorization: token,
        'User-Client': browser,
        'Content-Type': 'application/x-www-form-urlencode',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control':
          'no-cache, no-store, must-revalidate, max-age=-1, private'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getProfileTariffsSuccess(data));
      break;
    }
    case 401: {
      dispatch(getProfileTariffsFailure(data.message));
      dispatch(push('/login'));
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
