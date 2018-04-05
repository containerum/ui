/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_SERVICE_REQUESTING,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAILURE
} from '../../constants/serviceConstants/deleteService';
import { webApiLogin } from '../../config';

const deleteServiceRequest = () => ({
  type: DELETE_SERVICE_REQUESTING,
  isFetching: true
});

const deleteServiceSuccess = (data, status, method, idSrv) => ({
  type: DELETE_SERVICE_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idSrv
});

const deleteServiceFailure = (err, status, idSrv) => ({
  type: DELETE_SERVICE_FAILURE,
  isFetching: false,
  err,
  status,
  idSrv
});

export const fetchDeleteService = (
  idName: string,
  idSrv: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(deleteServiceRequest());

  const response = await axios.delete(
    `${URL}/namespace/${idName}/service/${idSrv}`,
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
      dispatch(deleteServiceSuccess(data, 202, config.method, idSrv));
      break;
    }
    case 401: {
      dispatch(deleteServiceFailure(data.message, status, idSrv));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(deleteServiceFailure(data.message, status, idSrv));
    }
  }
};

export const fetchDeleteServiceIfNeeded = (
  idName: string,
  idSrv: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeleteService(idName, idSrv, axios));
