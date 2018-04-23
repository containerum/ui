/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_PROFILE_REPORT_REQUESTING,
  GET_PROFILE_REPORT_SUCCESS,
  GET_PROFILE_REPORT_FAILURE
} from '../../constants/profileConstants/getProfileReport';
import { webApiLogin } from '../../config/index';

const getProfileReportRequest = () => ({
  type: GET_PROFILE_REPORT_REQUESTING,
  isFetching: true
});

const getProfileReportSuccess = data => ({
  type: GET_PROFILE_REPORT_SUCCESS,
  isFetching: false,
  data
});

const getProfileReportFailure = err => ({
  type: GET_PROFILE_REPORT_FAILURE,
  isFetching: false,
  err
});

const getProfileInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetProfileReport = (
  page: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getProfileReportRequest());

  const response = await axios.get(`${URL}/isp/user/report?page=${page}`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getProfileReportSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getProfileInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(getProfileReportFailure(data.message));
      break;
    }
    case 404: {
      dispatch(getProfileReportSuccess({ operations: [] }));
      break;
    }
    default: {
      dispatch(getProfileReportFailure(data.message));
    }
  }
};

export const fetchGetProfileReportIfNeeded = (page: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetProfileReport(page, axios));
