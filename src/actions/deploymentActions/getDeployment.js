/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_DEPLOYMENT_REQUESTING,
  GET_DEPLOYMENT_SUCCESS,
  GET_DEPLOYMENT_FAILURE
} from '../../constants/deploymentConstants/getDeployment';
// import isTokenExist from '../functions/isTokenExist';
import { webApi, routerLinks } from '../../config';

const getDeploymentRequest = () => ({
  type: GET_DEPLOYMENT_REQUESTING,
  isFetching: true
});

const getDeploymentSuccess = (data, status, idName, idDep) => ({
  type: GET_DEPLOYMENT_SUCCESS,
  isFetching: false,
  data,
  status,
  idName,
  idDep
});

const getDeploymentFailure = (err, status, idName, idDep) => ({
  type: GET_DEPLOYMENT_FAILURE,
  isFetching: false,
  err,
  status,
  idName,
  idDep
});

const getDeploymentInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetDeployment = (
  idName: string,
  idDep: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getDeploymentRequest());

  const response = await axios.get(
    `${URL}/namespaces/${idName}/deployments/${idDep}`,
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
      dispatch(getDeploymentSuccess(data, status, idName, idDep));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getDeploymentInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else
        dispatch(getDeploymentFailure(data.message, status, idName, idDep));
      break;
    }
    default: {
      dispatch(getDeploymentFailure(data.message, status, idName, idDep));
      dispatch(push(routerLinks.namespaces));
    }
  }
};

export const fetchGetDeploymentIfNeeded = (
  idName: string,
  idDep: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetDeployment(idName, idDep, axios));
