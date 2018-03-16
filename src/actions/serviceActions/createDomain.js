/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  CREATE_DOMAIN_REQUESTING,
  CREATE_DOMAIN_SUCCESS,
  CREATE_DOMAIN_FAILURE
} from '../../constants/serviceConstants/createDomain';
import { webApiLogin } from '../../config';

const createDomainRequest = () => ({
  type: CREATE_DOMAIN_REQUESTING,
  isFetching: true
});

const createDomainSuccess = (data, status, idSrv) => ({
  type: CREATE_DOMAIN_SUCCESS,
  isFetching: false,
  data,
  status,
  idSrv
});

const createDomainFailure = (err, status, idSrv) => ({
  type: CREATE_DOMAIN_FAILURE,
  isFetching: false,
  err,
  status,
  idSrv
});

export const fetchCreateDomain = (
  idName: string,
  dataSrv: Object,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(createDomainRequest());

  let idSrv = idName;
  const response = await axios.post(
    `${URL}/namespaces/${idName}/ingresses`,
    {
      name: 'myingress2',
      owner: '0efff9af-bd0c-4811-9ba5-56bc520ff41f',
      rules: [
        {
          host: 'my.containerum.io',
          tls_secret: 'mysecret',
          path: [
            {
              path: '/',
              service_name: 'solution-pg-svc-stjjq',
              service_port: 5432
            }
          ]
        }
      ]
    },
    {
      headers: {
        Authorization: token,
        'User-Client': browser,
        'Access-Control-Allow-Origin': '*'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  switch (status) {
    case 201: {
      console.log(data);
      // idSrv = `Domain ${data.name} for ${intObj.deployment_name}`;
      idSrv = 'Domain';
      dispatch(createDomainSuccess(data, status, idSrv));
      break;
    }
    case 401: {
      dispatch(createDomainFailure(data.message, status, idSrv));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(createDomainFailure(data.message, status, idSrv));
    }
  }
};

export const fetchCreateDomainIfNeeded = (
  idName: string,
  data: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchCreateDomain(idName, data, axios));
