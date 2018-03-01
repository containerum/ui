/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_SERVICE_REQUESTING,
  GET_SERVICE_SUCCESS,
  GET_SERVICE_FAILURE
} from '../../constants/serviceConstants/getService';
// import isTokenExist from '../functions/isTokenExist';
import { webApi } from '../../config/index';

const getServiceRequest = () => ({
  type: GET_SERVICE_REQUESTING,
  isFetching: true
});

const getServiceSuccess = (data, status, idName, idSrv) => ({
  type: GET_SERVICE_SUCCESS,
  isFetching: false,
  data,
  status,
  idName,
  idSrv
});

const getServiceFailure = (err, status, idName, idSrv) => ({
  type: GET_SERVICE_FAILURE,
  isFetching: false,
  err,
  status,
  idName,
  idSrv
});

export const fetchGetService = (
  idName: string,
  idSrv: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  // console.log(token);

  dispatch(getServiceRequest());

  const response = await axios.get(
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
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getServiceSuccess(data, status, idName, idSrv));
      break;
    }
    case 400: {
      dispatch(getServiceFailure(data.message, status, idName, idSrv));
      dispatch(push('/namespaces'));
      break;
    }
    case 401: {
      dispatch(getServiceFailure(data.message, status, idName, idSrv));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(getServiceFailure(data.message, status, idName, idSrv));
    }
  }
};

export const fetchGetServiceIfNeeded = (
  idName: string,
  idSrv: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetService(idName, idSrv, axios));
