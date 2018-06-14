/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_RUNNING_SOLUTIONS_REQUESTING,
  GET_RUNNING_SOLUTIONS_SUCCESS,
  GET_RUNNING_SOLUTIONS_FAILURE
} from '../../constants/solutionsConstants/getRunningSolutions';
import { webApi, routerLinks } from '../../config';

const getRunningSolutionsRequest = () => ({
  type: GET_RUNNING_SOLUTIONS_REQUESTING,
  isFetching: true
});

const getRunningSolutionsSuccess = (data, status, idName) => ({
  type: GET_RUNNING_SOLUTIONS_SUCCESS,
  isFetching: false,
  data,
  status,
  idName
});

const getRunningSolutionsFailure = (err, status, idName) => ({
  type: GET_RUNNING_SOLUTIONS_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

const getRunningSolutionsInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetRunningSolutions = (
  idName: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getRunningSolutionsRequest());

  const response = await axios.get(`${URL}/solutions`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getRunningSolutionsSuccess(data.solutions, status, idName));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getRunningSolutionsInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getRunningSolutionsFailure(data.message, status, idName));
      break;
    }
    default: {
      dispatch(getRunningSolutionsFailure(data.message, status, idName));
      dispatch(push(routerLinks.namespaces));
    }
  }
};

export const fetchGetRunningSolutionsIfNeeded = (
  idName: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetRunningSolutions(idName, axios));
