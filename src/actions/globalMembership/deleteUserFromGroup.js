import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_USER_FROM_GROUP_INVALID,
  DELETE_USER_FROM_GROUP_REQUESTING,
  DELETE_USER_FROM_GROUP_SUCCESS,
  DELETE_USER_FROM_GROUP_FAILURE
} from '../../constants/globalMembershipConstants/deleteUserFromGroup';
import { webApi } from '../../config/index';

const DeleteUserFromGroupInvalid = () => ({
  type: DELETE_USER_FROM_GROUP_INVALID
});

const DeleteUserFromGroupRequest = () => ({
  type: DELETE_USER_FROM_GROUP_REQUESTING,
  isFetching: true
});

const DeleteUserFromGroupSuccess = (data, status, method, username) => ({
  type: DELETE_USER_FROM_GROUP_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  username
});

const DeleteUserFromGroupFailure = (err, status, username) => ({
  type: DELETE_USER_FROM_GROUP_FAILURE,
  isFetching: false,
  err,
  status,
  username
});

const DeleteUserFromGroupInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeleteUserFromGroup = (
  idGroup: string,
  username: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(DeleteUserFromGroupRequest());
  const response = await axios.delete(
    `${URL}/groups/${idGroup}/members/${username}`,
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },

      validateStatus: status => status >= 200 && status <= 505
    }
  );

  const { status, data, config } = response;
  switch (status) {
    case 202: {
      dispatch(DeleteUserFromGroupSuccess(data, 202, config.method, username));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(DeleteUserFromGroupInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else
        dispatch(DeleteUserFromGroupFailure(data.message, status, username));
      break;
    }
    default: {
      dispatch(DeleteUserFromGroupFailure(data.message, status, username));
    }
  }
  dispatch(DeleteUserFromGroupInvalid());
};

export const fetchDeleteUserFromGroupIfNeeded = (
  idGroup: string,
  username: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeleteUserFromGroup(idGroup, username, axios));
