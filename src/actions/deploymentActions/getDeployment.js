/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_DEPLOYMENT_REQUESTING,
  GET_DEPLOYMENT_SUCCESS,
  GET_DEPLOYMENT_FAILURE
} from '../../constants/deploymentConstants/getDeployment';
// import isTokenExist from '../functions/isTokenExist';
import { webApiLogin } from '../../config/index';

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

export const fetchGetDeployment = (
  idName: string,
  idDep: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

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
      dispatch(getDeploymentFailure(data.message, status, idName, idDep));
      if (data.message === 'invalid token received') {
        dispatch(push('/login'));
      }
      break;
    }
    default: {
      dispatch(getDeploymentFailure(data.message, status, idName, idDep));
      dispatch(push('/namespaces'));
    }
  }
};

export const fetchGetDeploymentIfNeeded = (
  idName: string,
  idDep: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetDeployment(idName, idDep, axios));
