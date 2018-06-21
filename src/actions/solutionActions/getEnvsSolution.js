/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_ENVS_SOLUTION_REQUESTING,
  GET_ENVS_SOLUTION_SUCCESS,
  GET_ENVS_SOLUTION_FAILURE
} from '../../constants/solutionConstants/getEnvsSolution';
import { webApi, routerLinks } from '../../config';

const getEnvsSolutionRequest = () => ({
  type: GET_ENVS_SOLUTION_REQUESTING,
  isFetching: true
});

const getEnvsSolutionSuccess = (data, status) => ({
  type: GET_ENVS_SOLUTION_SUCCESS,
  isFetching: false,
  data,
  status
});

const getEnvsSolutionFailure = (err, status) => ({
  type: GET_ENVS_SOLUTION_FAILURE,
  isFetching: false,
  err,
  status
});

const getEnvsSolutionInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetEnvsSolution = (
  label: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getEnvsSolutionRequest());

  const response = await axios.get(`${URL}/templates/${label}/env`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getEnvsSolutionSuccess(data.env, status));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getEnvsSolutionInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getEnvsSolutionFailure(data.message, status));
      break;
    }
    default: {
      dispatch(getEnvsSolutionFailure(data.message, status));
      dispatch(push(routerLinks.namespaces));
    }
  }
};

export const fetchGetEnvsSolutionIfNeeded = (label: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetEnvsSolution(label, axios));
