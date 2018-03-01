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
import { webApi } from '../../config/index';

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
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  // console.log(token);

  dispatch(getDeploymentRequest());

  const response = await axios.get(
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
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getDeploymentSuccess(data, status, idName, idDep));
      break;
    }
    case 400: {
      dispatch(getDeploymentFailure(data.message, status, idName, idDep));
      dispatch(push('/namespaces'));
      break;
    }
    case 401: {
      dispatch(getDeploymentFailure(data.message, status, idName, idDep));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(getDeploymentFailure(data.message, status, idName, idDep));
    }
  }
};

export const fetchGetDeploymentIfNeeded = (
  idName: string,
  idDep: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetDeployment(idName, idDep, axios));
