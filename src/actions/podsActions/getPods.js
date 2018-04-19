/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_PODS_REQUESTING,
  GET_PODS_SUCCESS,
  GET_PODS_FAILURE
} from '../../constants/podsConstants/getPods';
import { webApiLogin } from '../../config/index';

const getPodsRequest = () => ({
  type: GET_PODS_REQUESTING,
  isFetching: true
});

const getPodsSuccess = (data, status, idName) => ({
  type: GET_PODS_SUCCESS,
  isFetching: false,
  data,
  status,
  idName
});

const getPodsFailure = (err, status, idName) => ({
  type: GET_PODS_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

const getPodsInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetPods = (
  idName: string,
  idDep: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(getPodsRequest());

  const response = await axios.get(`${URL}/namespaces/${idName}/pods`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      const filteredPods = response.data.pods.filter(
        item => item.deploy === idDep
      );
      dispatch(getPodsSuccess(filteredPods, status, idName));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getPodsInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(getPodsFailure(data.message, status, idName));
      break;
    }
    default: {
      dispatch(getPodsFailure(data.message, status, idName));
    }
  }
};

export const fetchGetPodsIfNeeded = (
  idName: string,
  idDep: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetPods(idName, idDep, axios));
