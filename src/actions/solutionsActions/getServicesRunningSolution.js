/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_SERVICES_RUNNING_SOLUTION_REQUESTING,
  GET_SERVICES_RUNNING_SOLUTION_SUCCESS,
  GET_SERVICES_RUNNING_SOLUTION_FAILURE
} from '../../constants/solutionsConstants/getServicesRunningSolution';
import { webApi, routerLinks } from '../../config';

const getServicesRunningSolutionRequest = () => ({
  type: GET_SERVICES_RUNNING_SOLUTION_REQUESTING,
  isFetching: true
});

const getServicesRunningSolutionSuccess = (data, status, label) => ({
  type: GET_SERVICES_RUNNING_SOLUTION_SUCCESS,
  isFetching: false,
  data,
  status,
  label
});

const getServicesRunningSolutionFailure = (err, status, label) => ({
  type: GET_SERVICES_RUNNING_SOLUTION_FAILURE,
  isFetching: false,
  err,
  status,
  label
});

const getServicesRunningSolutionInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetServicesRunningSolution = (
  idName: string,
  label: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getServicesRunningSolutionRequest());

  const response = await axios.get(
    `${URL}/namespaces/${idName}/solutions/${label}/services`,
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getServicesRunningSolutionSuccess(data.services, status, label));
      break;
    }
    case 404: {
      dispatch(getServicesRunningSolutionSuccess([], status, label));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getServicesRunningSolutionInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getServicesRunningSolutionFailure(data.message));
      break;
    }
    default: {
      dispatch(getServicesRunningSolutionFailure(data.message, status, label));
      dispatch(push(routerLinks.namespaces));
    }
  }
};

export const fetchGetServicesRunningSolutionIfNeeded = (
  idName: string,
  label: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetServicesRunningSolution(idName, label, axios));
