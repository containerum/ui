/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_USER_LIST_REQUESTING,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE
} from '../../constants/globalMembershipConstants/getUserList';
import { webApi, routerLinks } from '../../config';

const getUserListRequest = () => ({
  type: GET_USER_LIST_REQUESTING,
  isFetching: true
});

const getUserListSuccess = data => ({
  type: GET_USER_LIST_SUCCESS,
  isFetching: false,
  data
});

const getUserListFailure = err => ({
  type: GET_USER_LIST_FAILURE,
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

  // ?page=1&per_page=10
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
        dispatch(push(routerLinks.login));
      } else dispatch(getUserListFailure(data.message));
      break;
    }
    // default: {
    //   dispatch(getNamespacesSuccess([]));
    //   dispatch(push('/login'));
    // }
    default: {
      dispatch(getUserListFailure(data.message));
      dispatch(push(routerLinks.dashboard));
    }
  }
};

export const fetchGetUserListIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetUserList(axios));
