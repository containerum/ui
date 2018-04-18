/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_DEPLOYMENTS_REQUESTING,
  GET_DEPLOYMENTS_SUCCESS,
  GET_DEPLOYMENTS_FAILURE
} from '../../constants/deploymentsConstants/getDeployments';
import { webApiLogin } from '../../config/index';

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

const getDeploymentsInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetDeployments = (
  idName: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(getDeploymentsRequest());

  const response = await axios.get(`${URL}/namespaces/${idName}/deployments`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getDeploymentsSuccess(data.deployments, status, idName));
      break;
    }
    case 404: {
      dispatch(getDeploymentsSuccess([], status, idName));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getDeploymentsInvalidToken());
      } else dispatch(getDeploymentsFailure(data.message));
      break;
    }
    default: {
      dispatch(getDeploymentsFailure(data.message, status, idName));
      dispatch(push('/namespaces'));
    }
  }
};

export const fetchGetDeploymentsIfNeeded = (idName: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetDeployments(idName, axios));
