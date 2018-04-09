/* @flow */

// import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, ThunkAction } from '../types';
import {
  LOGOUT_REQUESTING,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../constants/logoutConstants';

const logoutRequest = () => ({
  type: LOGOUT_REQUESTING,
  isFetching: true
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
  isFetching: false
});

const logoutFailure = err => ({
  type: LOGOUT_FAILURE,
  isFetching: false,
  err
});

export const fetchLogout = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch(logoutRequest());
  try {
    cookie.remove('accessToken', { path: '/' });
    cookie.remove('refreshToken', { path: '/' });
    cookie.remove('lastTimeToRefresh', { path: '/' });
    dispatch(logoutSuccess());
  } catch (e) {
    dispatch(logoutFailure(e));
  }
};

export const fetchLogoutIfNeeded = (): ThunkAction => (dispatch: Dispatch) => {
  dispatch(fetchLogout());
};
