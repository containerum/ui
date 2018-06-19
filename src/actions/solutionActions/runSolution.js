/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  RUN_SOLUTION_REQUESTING,
  RUN_SOLUTION_SUCCESS,
  RUN_SOLUTION_FAILURE
} from '../../constants/solutionConstants/runSolution';
import { webApi, routerLinks } from '../../config';

const runSolutionRequest = () => ({
  type: RUN_SOLUTION_REQUESTING,
  isFetching: true
});

const runSolutionSuccess = (data, status, idSol) => ({
  type: RUN_SOLUTION_SUCCESS,
  isFetching: false,
  data,
  status,
  idSol
});

const runSolutionFailure = (err, status, idSol) => ({
  type: RUN_SOLUTION_FAILURE,
  isFetching: false,
  err,
  status,
  idSol
});

const runSolutionInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchRunSolution = (
  idName: string,
  dataObj: Object,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const accessToken = cookie.load('accessToken');
  const browser = cookie.load('browser');

  dispatch(runSolutionRequest());

  const response = await axios.post(
    `${URL}/namespaces/${idName}/solutions`,
    dataObj,
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  switch (status) {
    case 202: {
      dispatch(runSolutionSuccess(data, status, dataObj.template));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(runSolutionInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else
        dispatch(runSolutionFailure(data.message, status, dataObj.template));
      break;
    }
    default: {
      dispatch(runSolutionFailure(data.message, status, dataObj.template));
    }
  }
};

export const fetchRunSolutionIfNeeded = (
  idName: string,
  dataObj: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchRunSolution(idName, dataObj, axios));
