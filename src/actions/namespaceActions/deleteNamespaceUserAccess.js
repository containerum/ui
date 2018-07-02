import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  DELETE_NAMESPACE_USER_ACCESS_INVALID,
  DELETE_NAMESPACE_USER_ACCESS_REQUESTING,
  DELETE_NAMESPACE_USER_ACCESS_SUCCESS,
  DELETE_NAMESPACE_USER_ACCESS_FAILURE
} from '../../constants/namespaceConstants/deleteNamespaceUserAccess';
import { webApi, routerLinks } from '../../config';

const deleteNamespaceUserAccessInvalid = () => ({
  type: DELETE_NAMESPACE_USER_ACCESS_INVALID
});

const deleteNamespaceUserAccessRequest = () => ({
  type: DELETE_NAMESPACE_USER_ACCESS_REQUESTING,
  isFetching: true
});

const deleteNamespaceUserAccessSuccess = (data, status, method, idName) => ({
  type: DELETE_NAMESPACE_USER_ACCESS_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idName
});

const deleteNamespaceUserAccessFailure = (err, status, idName) => ({
  type: DELETE_NAMESPACE_USER_ACCESS_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

const deleteNamespaceUserAccessInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeleteNamespaceUserAccess = (
  idName: string,
  username: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(deleteNamespaceUserAccessRequest());
  const response = await axios.delete(`${URL}/namespaces/${idName}/accesses`, {
    data: { username },
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });

  const { status, data, config } = response;
  switch (status) {
    case 200: {
      dispatch(
        deleteNamespaceUserAccessSuccess(data, 202, config.method, username)
      );
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteNamespaceUserAccessInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else
        dispatch(
          deleteNamespaceUserAccessFailure(data.message, status, username)
        );
      break;
    }
    default: {
      dispatch(
        deleteNamespaceUserAccessFailure(data.message, status, username)
      );
    }
  }
  dispatch(deleteNamespaceUserAccessInvalid());
};

export const fetchDeleteNamespaceUserAccessIfNeeded = (
  idName: string,
  username: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeleteNamespaceUserAccess(idName, username, axios));
