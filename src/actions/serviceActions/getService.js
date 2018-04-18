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

const getServiceInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetService = (
  idName: string,
  idSrv: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(getServiceRequest());

  const response = await axios.get(
    `${URL}/namespaces/${idName}/services/${idSrv}`,
    {
      headers: {
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
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getServiceInvalidToken());
      } else dispatch(getServiceFailure(data.message, status, idName, idSrv));
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
