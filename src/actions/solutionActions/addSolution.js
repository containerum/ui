/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  ADD_SOLUTION_REQUESTING,
  ADD_SOLUTION_SUCCESS,
  ADD_SOLUTION_FAILURE
} from '../../constants/solutionConstants/addSolution';
import { webApi, routerLinks } from '../../config';

const addSolutionRequest = () => ({
  type: ADD_SOLUTION_REQUESTING,
  isFetching: true
});

const addSolutionSuccess = (data, status, method, label) => ({
  type: ADD_SOLUTION_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  label
});

const addSolutionFailure = (err, status, label) => ({
  type: ADD_SOLUTION_FAILURE,
  isFetching: false,
  err,
  status,
  label
});

const addSolutionInvalidToken = () => ({
  type: 'ADD_INVALID_TOKEN'
});

export const fetchAddSolution = (
  dataObj: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(addSolutionRequest());

  const { label, cpu, memory, url } = dataObj;
  const response = await axios.post(
    `${URL}/templates`,
    {
      name: label,
      limits: {
        cpu,
        ram: memory
      },
      url
    },
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data, config } = response;
  switch (status) {
    case 201: {
      dispatch(addSolutionSuccess(data, status, config.method, label));
      dispatch(push(routerLinks.solutions));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(addSolutionInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(addSolutionFailure(data.message, status, label));
      break;
    }
    default:
      dispatch(addSolutionFailure(data.message, status, label));
  }
};

export const fetchAddSolutionIfNeeded = (dataObj: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchAddSolution(dataObj, axios));
