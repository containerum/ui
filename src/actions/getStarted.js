/* @flow */

import { push } from 'react-router-redux';

import { routerLinks } from '../config';
import type { Dispatch, GetState, ThunkAction } from '../types';
import {
  GET_STARTED_REQUESTING,
  GET_STARTED_SUCCESS,
  GET_STARTED_FAILURE
} from '../constants/getStarted';

const getStartedRequest = () => ({
  type: GET_STARTED_REQUESTING,
  isFetching: true
});

const getStartedSuccess = data => ({
  type: GET_STARTED_SUCCESS,
  isFetching: false,
  data
});

const getStartedFailure = err => ({
  type: GET_STARTED_FAILURE,
  isFetching: false,
  err
});

export const fetchGetStarted = (
  axios: any,
  role: string
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch(getStartedRequest());

  let dateNow = new Date();
  dateNow = Date.parse(dateNow);
  let githubText = null;
  const githubLinkName = 'githubLinkGetStarted';
  if (
    typeof window !== 'undefined' &&
    typeof window.localStorage !== 'undefined'
  ) {
    githubText = localStorage.getItem(githubLinkName)
      ? localStorage.getItem(githubLinkName)
      : null;
  }
  if (githubText && JSON.parse(githubText).date + 18000000 >= dateNow) {
    dispatch(getStartedSuccess(JSON.parse(githubText).data));
  } else {
    const response = await axios.get(
      `https://raw.githubusercontent.com/containerum/containerum-docs/master/content/getting-started/${role}.md`,
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
            githubLinkName,
            JSON.stringify({ data, date: dateNow })
          );
        }
        dispatch(getStartedSuccess(data));
        break;
      }
      case 404: {
        dispatch(getStartedSuccess([]));
        break;
      }
      case 400: {
        dispatch(getStartedRequest());
        if (data.message === 'invalid token received') {
          dispatch(push(routerLinks.login));
        }
        break;
      }
      default: {
        dispatch(getStartedFailure(data.message));
      }
    }
  }
};

export const fetchGetStartedIfNeeded = (role: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetStarted(axios, role));
