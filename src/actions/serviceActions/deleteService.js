/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_SERVICE_REQUESTING,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAILURE
} from '../../constants/serviceConstants/deleteService';
import { webApi } from '../../config';

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
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(deleteServiceRequest());

  const response = await axios.delete(
    `${URL}/api/namespaces/${idName}/services/${idSrv}`,
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
      dispatch(deleteServiceSuccess(data, status, config.method, idSrv));
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
