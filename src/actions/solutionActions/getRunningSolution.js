/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_RUNNING_SOLUTION_REQUESTING,
  GET_RUNNING_SOLUTION_SUCCESS,
  GET_RUNNING_SOLUTION_FAILURE
} from '../../constants/solutionConstants/getRunningSolution';
// import isTokenExist from '../functions/isTokenExist';
import { webApi, routerLinks } from '../../config';

const getRunningSolutionRequest = () => ({
  type: GET_RUNNING_SOLUTION_REQUESTING,
  isFetching: true
});

const getRunningSolutionSuccess = (data, status, label) => ({
  type: GET_RUNNING_SOLUTION_SUCCESS,
  isFetching: false,
  data,
  status,
  label
});

const getRunningSolutionFailure = (err, status, label) => ({
  type: GET_RUNNING_SOLUTION_FAILURE,
  isFetching: false,
  err,
  status,
  label
});

const getRunningSolutionInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetRunningSolution = (
  label: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getRunningSolutionRequest());

  const response = await axios.get(`${URL}/solutions/${label}`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getRunningSolutionSuccess(data, status, label));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getRunningSolutionInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getRunningSolutionFailure(data.message, status, label));
      break;
    }
    default: {
      dispatch(getRunningSolutionFailure(data.message, status, label));
      dispatch(push(routerLinks.namespaces));
    }
  }
};

export const fetchGetRunningSolutionIfNeeded = (label: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetRunningSolution(label, axios));
