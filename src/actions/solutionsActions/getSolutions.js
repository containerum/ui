/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_SOLUTIONS_REQUESTING,
  GET_SOLUTIONS_SUCCESS,
  GET_SOLUTIONS_FAILURE
} from '../../constants/solutionsConstants/getSolutions';
import { webApi, routerLinks } from '../../config';

const getSolutionsRequest = () => ({
  type: GET_SOLUTIONS_REQUESTING,
  isFetching: true
});

const getSolutionsSuccess = (data, status) => ({
  type: GET_SOLUTIONS_SUCCESS,
  isFetching: false,
  data,
  status
});

const getSolutionsFailure = (err, status) => ({
  type: GET_SOLUTIONS_FAILURE,
  isFetching: false,
  err,
  status
});

const getSolutionsInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetSolutions = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getSolutionsRequest());

  const response = await axios.get(`${URL}/templates`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getSolutionsSuccess(data.solutions, status));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getSolutionsInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getSolutionsFailure(data.message, status));
      break;
    }
    default: {
      dispatch(getSolutionsFailure(data.message, status));
      dispatch(push(routerLinks.namespaces));
    }
  }
};

export const fetchGetSolutionsIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetSolutions(axios));
