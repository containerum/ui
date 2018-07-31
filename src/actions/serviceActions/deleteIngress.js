/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  DELETE_INGRESS_REQUESTING,
  DELETE_INGRESS_SUCCESS,
  DELETE_INGRESS_FAILURE
} from '../../constants/serviceConstants/deleteIngress';
import { webApi, routerLinks } from '../../config';

const deleteIngressRequest = () => ({
  type: DELETE_INGRESS_REQUESTING,
  isFetching: true
});

const deleteIngressSuccess = (data, status, method, label) => ({
  type: DELETE_INGRESS_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  label
});

const deleteIngressFailure = (err, status, label) => ({
  type: DELETE_INGRESS_FAILURE,
  isFetching: false,
  err,
  status,
  label
});

const deleteIngressInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeleteIngress = (
  idName: string,
  label: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const accessToken = cookie.load('accessToken');
  const browser = cookie.load('browser');

  dispatch(deleteIngressRequest());

  const response = await axios.delete(
    `${URL}/namespaces/${idName}/ingresses/${label}`,
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
      dispatch(deleteIngressSuccess(data, 202, config.method, label));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteIngressInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(deleteIngressFailure(data.message, status, label));
      break;
    }
    default: {
      dispatch(deleteIngressFailure(data.message, status, label));
    }
  }
};

export const fetchDeleteIngressIfNeeded = (
  idName: string,
  label: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeleteIngress(idName, label, axios));
