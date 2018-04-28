/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_SERVICES_REQUESTING,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILURE
} from '../../constants/servicesConstants/getServices';
import { webApi } from '../../config/index';

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

const getServicesInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetServices = (
  idName: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

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
      if (data.message === 'invalid token received') {
        dispatch(getServicesInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(getServicesFailure(data.message, status, idName));
      break;
    }
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
