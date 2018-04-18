import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  ADD_NAMESPACE_USER_ACCESS_INVALID,
  ADD_NAMESPACE_USER_ACCESS_REQUESTING,
  ADD_NAMESPACE_USER_ACCESS_SUCCESS,
  ADD_NAMESPACE_USER_ACCESS_FAILURE
} from '../../constants/namespaceConstants/addNamespaceAccess';
import { webApiLogin } from '../../config/index';

const addNamespaceUserAccessInvalid = () => ({
  type: ADD_NAMESPACE_USER_ACCESS_INVALID
});

const addNamespaceUserAccessRequest = () => ({
  type: ADD_NAMESPACE_USER_ACCESS_REQUESTING,
  isFetching: true
});

const addNamespaceUserAccessSuccess = (data, status, idName) => ({
  type: ADD_NAMESPACE_USER_ACCESS_SUCCESS,
  isFetching: false,
  data,
  status,
  idName
});

const addNamespaceUserAccessFailure = (err, status, idName) => ({
  type: ADD_NAMESPACE_USER_ACCESS_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

export const fetchAddNamespaceUserAccess = (
  idName: string,
  data: Object,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(addNamespaceUserAccessRequest());
  console.log('username', data.username);
  const userNeedAdd = {
    username: data.username,
    access: data.access
  };

  const response = await axios.put(
    `${URL}/namespace/${idName}/access`,
    userNeedAdd,
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data: dataR } = response;
  console.log('dataR', dataR);
  switch (status) {
    case 201: {
      dispatch(addNamespaceUserAccessSuccess(dataR, status));
      break;
    }
    case 400: {
      dispatch(addNamespaceUserAccessFailure(dataR.message, status));
      if (data.message === 'invalid token received') {
        dispatch(push('/login'));
      }
      break;
    }
    default: {
      dispatch(addNamespaceUserAccessFailure(dataR.message, status));
    }
  }
  dispatch(addNamespaceUserAccessInvalid());
};

export const fetchAddNamespaceUserAccessIfNeeded = (
  idName: string,
  data: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchAddNamespaceUserAccess(idName, data, axios));
