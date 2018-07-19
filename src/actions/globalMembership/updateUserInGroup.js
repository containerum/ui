import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  UPDATE_GLOBAL_USER_IN_GROUP_INVALID,
  UPDATE_GLOBAL_USER_IN_GROUP_REQUESTING,
  UPDATE_GLOBAL_USER_IN_GROUP_SUCCESS,
  UPDATE_GLOBAL_USER_IN_GROUP_FAILURE
} from '../../constants/globalMembershipConstants/updateGlobalUserInGroup';
import { webApi } from '../../config/index';

const updateGlobalUserInvalid = () => ({
  type: UPDATE_GLOBAL_USER_IN_GROUP_INVALID
});

const updateGlobalUserRequest = () => ({
  type: UPDATE_GLOBAL_USER_IN_GROUP_REQUESTING,
  isFetching: true
});

const updateGlobalUserSuccess = (members, status, method, labelGroup) => ({
  type: UPDATE_GLOBAL_USER_IN_GROUP_SUCCESS,
  isFetching: false,
  members,
  status,
  method,
  labelGroup
});

const updateGlobalUserFailure = (err, status, members, labelGroup) => ({
  type: UPDATE_GLOBAL_USER_IN_GROUP_FAILURE,
  isFetching: false,
  err,
  status,
  members,
  labelGroup
});

const updateGlobalUserInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchUpdateGlobalUser = (
  idGroup: string,
  userName: string,
  access: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');
  dispatch(updateGlobalUserRequest());

  const response = await axios.put(
    `${URL}/groups/${idGroup}/members/${userName}`,
    {
      access
    },
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
    case 202: {
      dispatch(updateGlobalUserSuccess(userName, status, 'put'));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(updateGlobalUserInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(updateGlobalUserFailure(data.message, status));
      break;
    }
    default: {
      dispatch(updateGlobalUserFailure(data.message, status, userName));
    }
  }
  dispatch(updateGlobalUserInvalid());
};

export const fetchUpdateGlobalUserIfNeeded = (
  idGroup: string,
  userName: string,
  access: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchUpdateGlobalUser(idGroup, userName, access, axios));
