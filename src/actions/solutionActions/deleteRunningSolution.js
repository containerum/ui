/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  DELETE_RUNNING_SOLUTION_REQUESTING,
  DELETE_RUNNING_SOLUTION_SUCCESS,
  DELETE_RUNNING_SOLUTION_FAILURE
} from '../../constants/solutionConstants/deleteRunningSolution';
import { webApi, routerLinks } from '../../config';

const deleteRunningSolutionRequest = () => ({
  type: DELETE_RUNNING_SOLUTION_REQUESTING,
  isFetching: true
});

const deleteRunningSolutionSuccess = (data, status, method, idSol) => ({
  type: DELETE_RUNNING_SOLUTION_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idSol
});

const deleteRunningSolutionFailure = (err, status, idSol) => ({
  type: DELETE_RUNNING_SOLUTION_FAILURE,
  isFetching: false,
  err,
  status,
  idSol
});

const deleteRunningSolutionInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeleteRunningSolution = (
  idName: string,
  idSol: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(deleteRunningSolutionRequest());

  const response = await axios.delete(
    `${URL}/namespaces/${idName}/solutions/${idSol}`,
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
    case 202: {
      dispatch(
        deleteRunningSolutionSuccess(data, status, config.method, idSol)
      );
      dispatch(push(routerLinks.getRunningSolutionsLink(idName)));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteRunningSolutionInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else
        dispatch(deleteRunningSolutionFailure(data.message, status, idSol));
      break;
    }
    default: {
      dispatch(deleteRunningSolutionFailure(data.message, status, idSol));
    }
  }
};

export const fetchDeleteRunningSolutionIfNeeded = (
  idName: string,
  idSol: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeleteRunningSolution(idName, idSol, axios));
