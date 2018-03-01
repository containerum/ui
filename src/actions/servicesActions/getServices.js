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

export const fetchGetServices = (
  idName: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  // console.log(token);

  dispatch(getServicesRequest());

  const response = await axios.get(`${URL}/api/namespaces/${idName}/services`, {
    headers: {
      Authorization: token,
      'User-Client': browser,
      'Content-Type': 'application/x-www-form-urlencode',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control':
        'no-cache, no-store, must-revalidate, max-age=-1, private'
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  // console.log('data', data);
  switch (status) {
    case 200: {
      dispatch(getServicesSuccess(data, status, idName));
      break;
    }
    case 404: {
      dispatch(getServicesSuccess([], status, idName));
      break;
    }
    case 400: {
      dispatch(getServicesFailure(data.message));
      dispatch(push('/namespaces'));
      break;
    }
    case 401: {
      dispatch(getServicesFailure(data.message));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(getServicesFailure(data.message, status, idName));
    }
  }
};

export const fetchGetServicesIfNeeded = (idName: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetServices(idName, axios));
