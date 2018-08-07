/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  DELETE_SOLUTION_REQUESTING,
  DELETE_SOLUTION_SUCCESS,
  DELETE_SOLUTION_FAILURE
} from '../../constants/solutionConstants/deleteSolutionTemplate';
import { webApi, routerLinks } from '../../config';

const deleteSolutionTemplateRequest = () => ({
  type: DELETE_SOLUTION_REQUESTING,
  isFetching: true
});

const deleteSolutionTemplateSuccess = (data, status, method, template) => ({
  type: DELETE_SOLUTION_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  template
});

const deleteSolutionTemplateFailure = (err, status, template) => ({
  type: DELETE_SOLUTION_FAILURE,
  isFetching: false,
  err,
  status,
  template
});

const deleteSolutionTemplateInvalidToken = () => ({
  type: 'DELETE_INVALID_TOKEN'
});

export const fetchDeleteSolutionTemplate = (
  template: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(deleteSolutionTemplateRequest());

  const response = await axios.post(
    `${URL}/templates/${template}/deactivate`,
    {},
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
      dispatch(
        deleteSolutionTemplateSuccess(data, status, config.method, template)
      );
      dispatch(push(routerLinks.solutions));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteSolutionTemplateInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else
        dispatch(deleteSolutionTemplateFailure(data.message, status, template));
      break;
    }
    default:
      dispatch(deleteSolutionTemplateFailure(data.message, status, template));
  }
};

export const fetchDeleteSolutionTemplateIfNeeded = (
  template: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeleteSolutionTemplate(template, axios));
