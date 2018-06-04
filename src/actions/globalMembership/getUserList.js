/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_USERLIST_REQUESTING,
  GET_USERLIST_SUCCESS,
  GET_USERLIST_FAILURE
} from '../../constants/globalMembership/getUserList';
import { webApi } from '../../config/index';

const getUserListRequest = () => ({
  type: GET_USERLIST_REQUESTING,
  isFetching: true
});

const getUserListSuccess = data => ({
  type: GET_USERLIST_SUCCESS,
  isFetching: false,
  data
});

const getUserListFailure = err => ({
  type: GET_USERLIST_FAILURE,
  isFetching: false,
  err
});

const getUserListInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetUserList = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');
  dispatch(getUserListRequest());

  const response = await axios.get(`${URL}/user/list`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getUserListSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getUserListInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(getUserListFailure(data.message));
      break;
    }
    // default: {
    //   dispatch(getNamespacesSuccess([]));
    //   dispatch(push('/login'));
    // }
    default: {
      dispatch(getUserListFailure(data.message));
      dispatch(push('/dashboard'));
    }
  }
};

export const fetchGetUserListIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetUserList(axios));
