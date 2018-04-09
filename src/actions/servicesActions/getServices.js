/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_SERVICES_REQUESTING,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILURE
} from '../../constants/servicesConstants/getServices';
import { webApiLogin } from '../../config/index';

const getServicesRequest = () => ({
  type: GET_SERVICES_REQUESTING,
  isFetching: true
});

const getServicesSuccess = (data, status, idName) => ({
  type: GET_SERVICES_SUCCESS,
  isFetching: false,
  data,
  status,
  idName
});

const getServicesFailure = (err, status, idName) => ({
  type: GET_SERVICES_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

export const fetchGetServices = (
  idName: string,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(getServicesRequest());

  const response = await axios.get(`${URL}/namespaces/${idName}/services`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  // console.log('getServicesRequest', data);
  switch (status) {
    case 200: {
      dispatch(getServicesSuccess(data.services, status, idName));
      break;
    }
    case 400: {
      dispatch(getServicesFailure(data.message, status, idName));
      if (data.message === 'invalid token received') {
        dispatch(push('/login'));
      }
      break;
    }
    // case 401: {
    //   dispatch(getServicesRequest());
    //   dispatch(push('/login'));
    //   break;
    // }
    default: {
      dispatch(getServicesFailure(data.message, status, idName));
      dispatch(push('/namespaces'));
    }
  }
};

export const fetchGetServicesIfNeeded = (idName: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetServices(idName, axios));
