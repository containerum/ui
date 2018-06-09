import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  ADD_GLOBAL_USER_IN_GROUP_INVALID,
  ADD_GLOBAL_USER_IN_GROUP_REQUESTING,
  ADD_GLOBAL_USER_IN_GROUP_SUCCESS,
  ADD_GLOBAL_USER_IN_GROUP_FAILURE
} from '../../constants/globalMembershipConstants/addGlobalUserInGroup';
import { webApi } from '../../config/index';

const addGlobalUserInvalid = () => ({
  type: ADD_GLOBAL_USER_IN_GROUP_INVALID
});

const addGlobalUserRequest = () => ({
  type: ADD_GLOBAL_USER_IN_GROUP_REQUESTING,
  isFetching: true
});

const addGlobalUserSuccess = (members, status, method, labelGroup) => ({
  type: ADD_GLOBAL_USER_IN_GROUP_SUCCESS,
  isFetching: false,
  members,
  status,
  method,
  labelGroup
});

const addGlobalUserFailure = (err, status, members, labelGroup) => ({
  type: ADD_GLOBAL_USER_IN_GROUP_FAILURE,
  isFetching: false,
  err,
  status,
  members,
  labelGroup
});

const addGlobalUserInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchAddGlobalUser = (
  idGroup: string,
  members: Array<Object>,
  labelGroup: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');
  dispatch(addGlobalUserRequest());

  const response = await axios.post(
    `${URL}/groups/${idGroup}/members `,
    {
      members
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
      dispatch(addGlobalUserSuccess(members, status, 'put', labelGroup));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(addGlobalUserInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(addGlobalUserFailure(data.message, status));
      break;
    }
    default: {
      dispatch(addGlobalUserFailure(data.message, status, members, labelGroup));
    }
  }
  dispatch(addGlobalUserInvalid());
};

export const fetchAddGlobalUserIfNeeded = (
  idGroup: string,
  members: Array<Object>,
  labelGroup: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchAddGlobalUser(idGroup, members, labelGroup, axios));
