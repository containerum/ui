/* @flow */

import { push } from 'react-router-redux';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_SOLUTION_REQUESTING,
  GET_SOLUTION_SUCCESS,
  GET_SOLUTION_FAILURE
} from '../../constants/solutionConstants/getSolution';

const getSolutionRequest = () => ({
  type: GET_SOLUTION_REQUESTING,
  isFetching: true
});

const getSolutionSuccess = data => ({
  type: GET_SOLUTION_SUCCESS,
  isFetching: false,
  data
});

const getSolutionFailure = err => ({
  type: GET_SOLUTION_FAILURE,
  isFetching: false,
  err
});

export const fetchGetSolution = (
  idSol: string,
  axios: any
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch(getSolutionRequest());

  let dateNow = new Date();
  dateNow = Date.parse(dateNow);
  let githubText = null;
  const githubLinkName = `githubLink${idSol}`;
  if (
    typeof window !== 'undefined' &&
    typeof window.localStorage !== 'undefined'
  ) {
    githubText = localStorage.getItem(githubLinkName)
      ? localStorage.getItem(githubLinkName)
      : null;
  }
  if (githubText && JSON.parse(githubText).date + 18000000 >= dateNow) {
    dispatch(getSolutionSuccess(JSON.parse(githubText).data));
  } else {
    const response = await axios.get(
      `https://raw.githubusercontent.com/containerum/${idSol}/master/README.md`,
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
        dispatch(getSolutionSuccess(data));
        break;
      }
      case 404: {
        dispatch(getSolutionSuccess([]));
        break;
      }
      case 401: {
        dispatch(getSolutionRequest());
        dispatch(push('/login'));
        break;
      }
      default: {
        dispatch(getSolutionFailure(data.message));
      }
    }
  }
};

/* istanbul ignore next */
export const fetchGetSolutionIfNeeded = (idSol: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetSolution(idSol, axios));
