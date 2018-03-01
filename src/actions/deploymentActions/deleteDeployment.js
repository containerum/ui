/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_DEPLOYMENT_REQUESTING,
  DELETE_DEPLOYMENT_SUCCESS,
  DELETE_DEPLOYMENT_FAILURE
} from '../../constants/deploymentConstants/deleteDeployment';
import { webApi } from '../../config';

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
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(deleteDeploymentRequest());

  const response = await axios.delete(
    `${URL}/api/namespaces/${idName}/deployments/${idDep}`,
    {
      headers: {
        Authorization: token,
        'User-Client': browser,
        'Content-Type': 'application/x-www-form-urlencode',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control':
          'no-cache, no-store, must-revalidate, max-age=-1, private'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { data, status, config } = response;
  switch (status) {
    case 202: {
      dispatch(deleteDeploymentSuccess(data, status, config.method, idDep));
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
