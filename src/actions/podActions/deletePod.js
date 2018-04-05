/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_POD_REQUESTING,
  DELETE_POD_SUCCESS,
  DELETE_POD_FAILURE
} from '../../constants/podConstants/deletePod';
import { webApiLogin } from '../../config';

const deletePodRequest = () => ({
  type: DELETE_POD_REQUESTING,
  isFetching: true
});

const deletePodSuccess = (data, status, method, idPod, idName) => ({
  type: DELETE_POD_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idName,
  idPod
});

const deletePodFailure = (err, status, idPod, idName) => ({
  type: DELETE_POD_FAILURE,
  isFetching: false,
  err,
  status,
  idName,
  idPod
});

export const fetchDeletePod = (
  idName: string,
  idPod: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(deletePodRequest());

  const response = await axios.delete(
    `${URL}/namespaces/${idName}/pods/${idPod}`,
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
    case 202: {
      dispatch(deletePodSuccess(data, status, config.method, idPod));
      break;
    }
    case 401: {
      dispatch(deletePodFailure(data.message, status, idPod, idName));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(deletePodFailure(data.message, status, idPod, idName));
    }
  }
};

export const fetchDeletePodIfNeeded = (
  idName: string,
  idPod: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeletePod(idName, idPod, axios));
