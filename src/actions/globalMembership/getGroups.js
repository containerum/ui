/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_GROUPS_REQUESTING,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAILURE
} from '../../constants/globalMembershipConstants/getGroups';
import { webApi, routerLinks } from '../../config';

const getGroupsRequest = () => ({
  type: GET_GROUPS_REQUESTING,
  isFetching: true
});

const getGroupsSuccess = data => ({
  type: GET_GROUPS_SUCCESS,
  isFetching: false,
  data
});

const getGroupsFailure = err => ({
  type: GET_GROUPS_FAILURE,
  isFetching: false,
  err
});

const getGroupsInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetGroups = (
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');
  dispatch(getGroupsRequest());

  const response = await axios.get(`${URL}/groups`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getGroupsSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getGroupsInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(getGroupsFailure(data.message));
      break;
    }
    // default: {
    //   dispatch(getNamespacesSuccess([]));
    //   dispatch(push('/login'));
    // }
    default: {
      dispatch(getGroupsFailure(data.message));
      dispatch(push(routerLinks.dashboard));
    }
  }
};

export const fetchGetGroupsIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetGroups(axios));
