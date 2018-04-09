/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_SERVICE_REQUESTING,
  GET_SERVICE_SUCCESS,
  GET_SERVICE_FAILURE
} from '../../constants/serviceConstants/getService';
import { webApiLogin } from '../../config/index';

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
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(getServiceRequest());

  const response = await axios.get(
    `${URL}/namespaces/${idName}/services/${idSrv}`,
    {
      headers: {
        Authorization: token,
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  // console.log(data);
  switch (status) {
    case 200: {
      dispatch(getServiceSuccess(data, status, idName, idSrv));
      break;
    }
    case 401: {
      dispatch(getServiceFailure(data.message, status, idName, idSrv));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(getServiceFailure(data.message, status, idName, idSrv));
      dispatch(push('/namespaces'));
    }
  }
};

export const fetchGetServiceIfNeeded = (
  idName: string,
  idSrv: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetService(idName, idSrv, axios));
