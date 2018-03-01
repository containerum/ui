/* @flow */

import { push } from 'react-router-redux';

import type { Dispatch, GetState, ThunkAction } from '../types';
import {
  RECOVERY_PASSWORD_REQUESTING,
  RECOVERY_PASSWORD_SUCCESS,
  RECOVERY_PASSWORD_FAILURE
} from '../constants/recoveryPasswordConstants';
import { webApi } from '../config';

const recoveryPasswordRequest = (hashParam, password) => ({
  type: RECOVERY_PASSWORD_REQUESTING,
  isFetching: true,
  hashParam,
  password
});

const recoveryPasswordSuccess = data => ({
  type: RECOVERY_PASSWORD_SUCCESS,
  isFetching: false,
  data
});

const recoveryPasswordFailure = err => ({
  type: RECOVERY_PASSWORD_FAILURE,
  isFetching: false,
  err
});

export const fetchRecoveryPassword = (
  hashParam: string,
  password: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch(recoveryPasswordRequest(hashParam, password));

  const response = await axios.post(
    `${URL}/api/reseted_password_change/${hashParam}`,
    { password },
    {
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  switch (status) {
    case 202: {
      dispatch(recoveryPasswordSuccess(data));
      dispatch(push(`/login`));
      break;
    }
    default: {
      dispatch(recoveryPasswordFailure(response.data.message));
    }
  }
};

export const fetchRecoveryPasswordIfNeeded = (
  hashParam: string,
  password: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) => {
  dispatch(fetchRecoveryPassword(hashParam, password, axios));
};
