/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_GROUP_REQUESTING,
  GET_GROUP_SUCCESS,
  GET_GROUP_FAILURE
} from '../../constants/globalMembershipConstants/getGroup';
import { webApi } from '../../config/index';

const getGroupRequest = () => ({
  type: GET_GROUP_REQUESTING,
  isFetching: true
});

const getGroupSuccess = data => ({
  type: GET_GROUP_SUCCESS,
  isFetching: false,
  data
});

const getGroupFailure = err => ({
  type: GET_GROUP_FAILURE,
  isFetching: false,
  err
});

const getGroupInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetGroup = (
  idGroup: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');
  dispatch(getGroupRequest());

  const response = await axios.get(`${URL}/groups/${idGroup}`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getGroupSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getGroupInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(getGroupFailure(data.message));
      break;
    }
    // default: {
    //   dispatch(getNamespacesSuccess([]));
    //   dispatch(push('/login'));
    // }
    default: {
      dispatch(getGroupFailure(data.message));
      dispatch(push('/dashboard'));
    }
  }
};

export const fetchGetGroupIfNeeded = (idGroup: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetGroup(idGroup, axios));
