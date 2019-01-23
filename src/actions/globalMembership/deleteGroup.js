/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  DELETE_GROUP_REQUESTING,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE
} from '../../constants/globalMembershipConstants/deleteGroup';
import { webApi, routerLinks } from '../../config';

const deleteGroupRequest = () => ({
  type: DELETE_GROUP_REQUESTING,
  isFetching: true
});

const deleteGroupSuccess = (name, status) => ({
  type: DELETE_GROUP_SUCCESS,
  isFetching: false,
  name,
  status
});

const deleteGroupFailure = (err, status) => ({
  type: DELETE_GROUP_FAILURE,
  isFetching: false,
  status,
  err
});

const deleteGroupInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeleteGroup = (
  id: string,
  name: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');
  dispatch(deleteGroupRequest());

  const response = await axios.delete(`${URL}/groups/${name}`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 202: {
      dispatch(deleteGroupSuccess(name, status));
      dispatch(push(routerLinks.getGlobalGroups));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteGroupInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(deleteGroupFailure(data.message, status));
      break;
    }
    // default: {
    //   dispatch(getNamespacesSuccess([]));
    //   dispatch(push('/login'));
    // }
    default: {
      dispatch(deleteGroupFailure(data.message, status));
      dispatch(push(routerLinks.dashboard));
    }
  }
};

export const fetchDeleteGroupIfNeeded = (
  id: string,
  name: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeleteGroup(id, name, axios));
