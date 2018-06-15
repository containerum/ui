/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_DEPLOYMENTS_RUNNING_SOLUTION_REQUESTING,
  GET_DEPLOYMENTS_RUNNING_SOLUTION_SUCCESS,
  GET_DEPLOYMENTS_RUNNING_SOLUTION_FAILURE
} from '../../constants/solutionsConstants/getDeploymentsRunningSolution';
import { webApi, routerLinks } from '../../config';

const getDeploymentsRunningSolutionRequest = () => ({
  type: GET_DEPLOYMENTS_RUNNING_SOLUTION_REQUESTING,
  isFetching: true
});

const getDeploymentsRunningSolutionSuccess = (data, status, label) => ({
  type: GET_DEPLOYMENTS_RUNNING_SOLUTION_SUCCESS,
  isFetching: false,
  data,
  status,
  label
});

const getDeploymentsRunningSolutionFailure = (err, status, label) => ({
  type: GET_DEPLOYMENTS_RUNNING_SOLUTION_FAILURE,
  isFetching: false,
  err,
  status,
  label
});

const getDeploymentsRunningSolutionInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetDeploymentsRunningSolution = (
  label: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getDeploymentsRunningSolutionRequest());

  const response = await axios.get(`${URL}/solutions/${label}/deployments`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(
        getDeploymentsRunningSolutionSuccess(data.deployments, status, label)
      );
      break;
    }
    case 404: {
      dispatch(getDeploymentsRunningSolutionSuccess([], status, label));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getDeploymentsRunningSolutionInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getDeploymentsRunningSolutionFailure(data.message));
      break;
    }
    default: {
      dispatch(
        getDeploymentsRunningSolutionFailure(data.message, status, label)
      );
      dispatch(push(routerLinks.namespaces));
    }
  }
};

export const fetchGetDeploymentsRunningSolutionIfNeeded = (
  label: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetDeploymentsRunningSolution(label, axios));
