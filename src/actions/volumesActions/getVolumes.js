/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type {
  Dispatch,
  GetState,
  ThunkAction
  // ReduxState
} from '../../types/index';
import {
  GET_VOLUMES_REQUESTING,
  GET_VOLUMES_SUCCESS,
  GET_VOLUMES_FAILURE
} from '../../constants/volumesConstants/getVolumes';
import { webApi } from '../../config/index';

const getVolumesRequest = () => ({
  type: GET_VOLUMES_REQUESTING,
  isFetching: true
});

const getVolumesSuccess = data => ({
  type: GET_VOLUMES_SUCCESS,
  isFetching: false,
  data
});

const getVolumesFailure = err => ({
  type: GET_VOLUMES_FAILURE,
  isFetching: false,
  err
});

const getVolumesInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetVolumes = (
  id: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getVolumesRequest());

  const response = await axios.get(`${URL}/namespaces/${id}/volumes`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getVolumesSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getVolumesInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(getVolumesFailure(data.message));
      break;
    }
    default: {
      dispatch(getVolumesFailure(data.message));
    }
  }
};

export const fetchGetVolumesIfNeeded = (id: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetVolumes(id, axios));
