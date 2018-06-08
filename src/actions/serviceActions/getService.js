/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_SERVICE_REQUESTING,
  GET_SERVICE_SUCCESS,
  GET_SERVICE_FAILURE
} from '../../constants/serviceConstants/getService';
import { webApi, routerLinks } from '../../config';

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
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

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
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getServiceFailure(data.message, status, idName, idSrv));
      break;
    }
    default: {
      dispatch(getServiceFailure(data.message, status, idName, idSrv));
      dispatch(push(routerLinks.namespaces));
    }
  }
};

export const fetchGetServiceIfNeeded = (
  idName: string,
  idSrv: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetService(idName, idSrv, axios));
