/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  ADD_GROUP_REQUESTING,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAILURE
} from '../../constants/globalMembershipConstants/addGroup';
import { webApi } from '../../config/index';

const addGroupRequest = () => ({
  type: ADD_GROUP_REQUESTING,
  isFetching: true
});

const addGroupSuccess = (data, status, method) => ({
  type: ADD_GROUP_SUCCESS,
  isFetching: false,
  data,
  status,
  method
});

const addGroupFailure = (err, status) => ({
  type: ADD_GROUP_FAILURE,
  isFetching: false,
  err,
  status
});

const addGroupInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchAddGroup = (
  label: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');
  dispatch(addGroupRequest());

  console.log(label);
  const response = await axios.post(
    `${URL}/groups`,
    { label: 'qwer@qweqr.qwer' },
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
    case 201: {
      dispatch(addGroupSuccess(data, status, config.method));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(addGroupInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(addGroupFailure(data.message));
      break;
    }
    // default: {
    //   dispatch(getNamespacesSuccess([]));
    //   dispatch(push('/login'));
    // }
    default: {
      dispatch(addGroupFailure(data.message, status));
      dispatch(push('/dashboard'));
    }
  }
};

export const fetchAddGroupIfNeeded = (label: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchAddGroup(label, axios));
