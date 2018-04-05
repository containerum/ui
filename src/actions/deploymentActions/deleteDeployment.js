/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_DEPLOYMENT_REQUESTING,
  DELETE_DEPLOYMENT_SUCCESS,
  DELETE_DEPLOYMENT_FAILURE
} from '../../constants/deploymentConstants/deleteDeployment';
import { webApiLogin } from '../../config';

const deleteDeploymentRequest = () => ({
  type: DELETE_DEPLOYMENT_REQUESTING,
  isFetching: true
});

const deleteDeploymentSuccess = (data, status, method, idDep) => ({
  type: DELETE_DEPLOYMENT_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idDep
});

const deleteDeploymentFailure = (err, status, idDep) => ({
  type: DELETE_DEPLOYMENT_FAILURE,
  isFetching: false,
  err,
  status,
  idDep
});

export const fetchDeleteDeployment = (
  idName: string,
  idDep: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(deleteDeploymentRequest());

  const response = await axios.delete(
    `${URL}/namespace/${idName}/deployment/${idDep}`,
    {
      headers: {
        Authorization: token,
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { data, status, config } = response;
  switch (status) {
    case 200: {
      dispatch(deleteDeploymentSuccess(data, 202, config.method, idDep));
      break;
    }
    case 401: {
      dispatch(deleteDeploymentFailure(data.message, status, idDep));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(deleteDeploymentFailure(data.message, status, idDep));
    }
  }
};

export const fetchDeleteDeploymentIfNeeded = (
  idName: string,
  idDep: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeleteDeployment(idName, idDep, axios));
