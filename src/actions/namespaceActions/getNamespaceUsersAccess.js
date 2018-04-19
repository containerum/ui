/* flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import {
  GET_NAMESPACE_USERS_ACCESS_REQUESTING,
  GET_NAMESPACE_USERS_ACCESS_SUCCESS,
  GET_NAMESPACE_USERS_ACCESS_FAILURE
} from '../../constants/namespaceConstants/getNamespaceUsersAccess';

import { webApiLogin } from '../../config/index';
import type { Dispatch, GetState, ThunkAction } from '../../types';

const getNamespaceUsersAccessRequest = () => ({
  type: GET_NAMESPACE_USERS_ACCESS_REQUESTING,
  isFetching: true
});

const getNamespaceUsersAccessSuccess = (data, status, idName) => ({
  type: GET_NAMESPACE_USERS_ACCESS_SUCCESS,
  isFetching: false,
  data,
  status,
  idName
});

const getNamespaceUsersAccessFailure = (err, status, idName) => ({
  type: GET_NAMESPACE_USERS_ACCESS_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

const getNamespaceUsersAccessInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetNamespaceUsersAccess = (
  idName: String,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(getNamespaceUsersAccessRequest());
  const response = await axios.get(`${URL}/namespace/${idName}/access`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getNamespaceUsersAccessSuccess(data, status, idName));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getNamespaceUsersAccessInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else
        dispatch(getNamespaceUsersAccessFailure(data.message, status, idName));
      break;
    }
    default: {
      dispatch(getNamespaceUsersAccessFailure(data.message, status, idName));
    }
  }
};

export const fetchGetNamespaceUsersAccessIfNeeded = (
  idName: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetNamespaceUsersAccess(idName, axios));
