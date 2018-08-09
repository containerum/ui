/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';
// import cloneDeep from 'clone-deep';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  CREATE_SECRET_REQUESTING,
  CREATE_SECRET_SUCCESS,
  CREATE_SECRET_FAILURE
} from '../../constants/secretConstants/createSecret';
import { webApi, routerLinks } from '../../config';

const createSecretRequest = () => ({
  type: CREATE_SECRET_REQUESTING,
  isFetching: true
});

const createSecretSuccess = (data, status, method, secretName) => ({
  type: CREATE_SECRET_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  secretName
});

const createSecretFailure = (err, status, secretName) => ({
  type: CREATE_SECRET_FAILURE,
  isFetching: false,
  err,
  status,
  secretName
});

const createSecretInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchCreateSecret = (
  idName: string,
  dataObj: Object,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(createSecretRequest());

  const nextDataObj = {};
  dataObj.records.map(record => {
    nextDataObj[record.key] = record.value;
    return null;
  });
  const dockerconfigjson = JSON.stringify({
    auths: {
      [dataObj.url]: nextDataObj
    }
  });
  const response = await axios.post(
    `${URL}/namespaces/${idName}/secrets/docker`,
    {
      name: dataObj.label,
      data: {
        '.dockerconfigjson': dockerconfigjson
      }
    },
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { data, status, config } = response;
  switch (status) {
    case 201: {
      dispatch(createSecretSuccess(data, 201, config.method, dataObj.name));
      dispatch(push(routerLinks.getSecretsLink(idName)));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(createSecretInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push(routerLinks.login));
      } else dispatch(createSecretFailure(data.message, status));
      break;
    }
    default: {
      dispatch(createSecretFailure(data.message, status));
    }
  }
};

export const fetchCreateSecretIfNeeded = (
  idName: string,
  data: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchCreateSecret(idName, data, axios));
