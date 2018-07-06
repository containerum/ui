/* @flow */

// import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  GET_RELEASES_REQUESTING,
  GET_RELEASES_SUCCESS,
  GET_RELEASES_FAILURE
} from '../../constants/getReleasesGithubConstants';

const getReleasesRequest = () => ({
  type: GET_RELEASES_REQUESTING,
  isFetching: true
});

const getReleasesSuccess = data => ({
  type: GET_RELEASES_SUCCESS,
  isFetching: false,
  data
});

const getReleasesFailure = err => ({
  type: GET_RELEASES_FAILURE,
  isFetching: false,
  err
});

export const fetchGetReleases = (axios: any): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch(getReleasesRequest());

  let dateNow = new Date();
  dateNow = Date.parse(dateNow);
  let github = null;
  if (
    typeof window !== 'undefined' &&
    typeof window.localStorage !== 'undefined'
  ) {
    github = localStorage.getItem('github')
      ? localStorage.getItem('github')
      : null;
  }

  if (github && JSON.parse(github).date + 18000000 >= dateNow) {
    dispatch(getReleasesSuccess(JSON.parse(github).data));
  } else {
    const response = await axios.get(
      'https://api.github.com/repos/containerum/chkit/releases/latest',
      {
        validateStatus: status => status >= 200 && status <= 505
      }
    );
    const { status, data } = response;
    switch (status) {
      case 200: {
        if (
          typeof window !== 'undefined' &&
          typeof window.localStorage !== 'undefined'
        ) {
          localStorage.setItem(
            'github',
            JSON.stringify({ data: response.data, date: dateNow })
          );
        }
        dispatch(getReleasesSuccess(data));
        break;
      }
      case 403: {
        dispatch(getReleasesSuccess(JSON.parse(github).data));
        break;
      }
      default: {
        dispatch(getReleasesFailure(data.message));
      }
    }
  }
};

export const fetchGetReleasesIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetReleases(axios));
