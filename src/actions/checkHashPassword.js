/* @flow */

// import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../types';
import {
  CHECK_HASH_PASSWORD_REQUESTING,
  CHECK_HASH_PASSWORD_SUCCESS,
  CHECK_HASH_PASSWORD_FAILURE
} from '../constants/checkHashPasswordConstants';
import { webApi } from '../config';

const checkHashPasswordRequest = hashParam => ({
  type: CHECK_HASH_PASSWORD_REQUESTING,
  isFetching: true,
  hashParam
});

const checkHashPasswordSuccess = data => ({
  type: CHECK_HASH_PASSWORD_SUCCESS,
  isFetching: false,
  data
});

const checkHashPasswordFailure = err => ({
  type: CHECK_HASH_PASSWORD_FAILURE,
  isFetching: false,
  err
});

export const fetchCheckHashPassword = (
  hashParam: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch(checkHashPasswordRequest(hashParam));

  const response = await axios.get(
    `${URL}/api/reseted_password_change/${hashParam}`,
    {
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(checkHashPasswordSuccess(data));
      break;
    }
    default: {
      dispatch(checkHashPasswordFailure(response.data.message));
    }
  }
};

export const fetchCheckHashPasswordIfNeeded = (
  hashParam: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) => {
  dispatch(fetchCheckHashPassword(hashParam, axios));
};
