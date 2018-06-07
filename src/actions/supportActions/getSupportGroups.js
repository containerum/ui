/* @flow */

import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_SUPPORT_GROUPS_REQUESTING,
  GET_SUPPORT_GROUPS_SUCCESS,
  GET_SUPPORT_GROUPS_FAILURE
} from '../../constants/supportConstants/getSupportGroupsConstants';

const getSupportGroupsRequest = () => ({
  type: GET_SUPPORT_GROUPS_REQUESTING,
  isFetching: true
});

const getSupportGroupsSuccess = data => ({
  type: GET_SUPPORT_GROUPS_SUCCESS,
  isFetching: false,
  data
});

const getSupportGroupsFailure = err => ({
  type: GET_SUPPORT_GROUPS_FAILURE,
  isFetching: false,
  err
});

export const fetchGetSupportGroups = (
  axios: any,
  URL: string = 'https://web.containerum.io'
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');
  dispatch(getSupportGroupsRequest());

  const response = await axios.get(`${URL}/group_omnidesk`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken,
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getSupportGroupsSuccess(data));
      break;
    }
    default: {
      dispatch(getSupportGroupsFailure(data.message));
    }
  }
};

export const fetchGetSupportGroupsIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetSupportGroups(axios));
