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
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(getVolumesRequest());

  const response = await axios.get(`${URL}/api/volumes`, {
    headers: {
      'User-Client': browser,
      'Content-Type': 'application/x-www-form-urlencode',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control':
        'no-cache, no-store, must-revalidate, max-age=-1, private'
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

export const fetchGetVolumesIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetVolumes(axios));
