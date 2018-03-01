/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_DEPLOYMENTS_REQUESTING,
  GET_DEPLOYMENTS_SUCCESS,
  GET_DEPLOYMENTS_FAILURE
} from '../../constants/deploymentsConstants/getDeployments';
import { webApi } from '../../config/index';

const getDeploymentsRequest = () => ({
  type: GET_DEPLOYMENTS_REQUESTING,
  isFetching: true
});

const getDeploymentsSuccess = (data, status, idName) => ({
  type: GET_DEPLOYMENTS_SUCCESS,
  isFetching: false,
  data,
  status,
  idName
});

const getDeploymentsFailure = (err, status, idName) => ({
  type: GET_DEPLOYMENTS_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

export const fetchGetDeployments = (
  idName: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  // console.log(token);

  dispatch(getDeploymentsRequest());

  const response = await axios.get(
    `${URL}/api/namespaces/${idName}/deployments`,
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
      dispatch(getDeploymentsSuccess(data, status, idName));
      break;
    }
    case 404: {
      dispatch(getDeploymentsSuccess([], status, idName));
      break;
    }
    case 400: {
      dispatch(getDeploymentsFailure(data.message));
      dispatch(push('/namespaces'));
      break;
    }
    case 401: {
      dispatch(getDeploymentsFailure(data.message));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(getDeploymentsFailure(data.message, status, idName));
    }
  }
};

export const fetchGetDeploymentsIfNeeded = (idName: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetDeployments(idName, axios));
