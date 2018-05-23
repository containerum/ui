import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  ADD_NAMESPACE_USER_ACCESS_INVALID,
  ADD_NAMESPACE_USER_ACCESS_REQUESTING,
  ADD_NAMESPACE_USER_ACCESS_SUCCESS,
  ADD_NAMESPACE_USER_ACCESS_FAILURE
} from '../../constants/namespaceConstants/addNamespaceUserAccess';
import { webApi } from '../../config/index';

const addNamespaceUserAccessInvalid = () => ({
  type: ADD_NAMESPACE_USER_ACCESS_INVALID
});

const addNamespaceUserAccessRequest = () => ({
  type: ADD_NAMESPACE_USER_ACCESS_REQUESTING,
  isFetching: true
});

const addNamespaceUserAccessSuccess = (data, status, method, idName) => ({
  type: ADD_NAMESPACE_USER_ACCESS_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idName
});

const addNamespaceUserAccessFailure = (err, status, idName) => ({
  type: ADD_NAMESPACE_USER_ACCESS_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

const addNamespaceUserAccessInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchAddNamespaceUserAccess = (
  idName: string,
  dataObj: Object,
  access: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(addNamespaceUserAccessRequest());
  const userNeedAdd = {
    username: dataObj.username,
    access: dataObj.access
  };

  const response = await axios.put(
    `${URL}/namespaces/${idName}/access`,
    userNeedAdd,
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(
        addNamespaceUserAccessSuccess(
          data,
          access === 'change' ? 202 : 201,
          access === 'change' ? 'put' : 'delete',
          dataObj.username
        )
      );
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(addNamespaceUserAccessInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(addNamespaceUserAccessFailure(data.message, status));
      break;
    }
    default: {
      dispatch(
        addNamespaceUserAccessFailure(data.message, status, dataObj.username)
      );
    }
  }
  dispatch(addNamespaceUserAccessInvalid());
};

export const fetchAddNamespaceUserAccessIfNeeded = (
  idName: string,
  dataObj: Object,
  access: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchAddNamespaceUserAccess(idName, dataObj, access, axios));
