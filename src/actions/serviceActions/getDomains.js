/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_DOMAINS_REQUESTING,
  GET_DOMAINS_SUCCESS,
  GET_DOMAINS_FAILURE
} from '../../constants/serviceConstants/getDomains';
import { webApi } from '../../config/index';

const getDomainsRequest = () => ({
  type: GET_DOMAINS_REQUESTING,
  isFetching: true
});

const getDomainsSuccess = data => ({
  type: GET_DOMAINS_SUCCESS,
  isFetching: false,
  data
});

const getDomainsFailure = err => ({
  type: GET_DOMAINS_FAILURE,
  isFetching: false,
  err
});

export const fetchGetDomains = (
  idName: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(getDomainsRequest());

  const response = await axios.get(`${URL}/namespaces/${idName}/ingresses`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  console.log(response);
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getDomainsSuccess(data));
      break;
    }
    case 401: {
      dispatch(getDomainsRequest());
      dispatch(push('/login'));
      break;
    }
    case 404: {
      dispatch(getDomainsSuccess([]));
      break;
    }
    default: {
      dispatch(getDomainsFailure(data.message));
    }
  }
};

export const fetchGetDomainsIfNeeded = (idName: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetDomains(idName, axios));
