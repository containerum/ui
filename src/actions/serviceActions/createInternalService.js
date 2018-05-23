/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  CREATE_INTERNAL_SERVICE_INVALID,
  CREATE_INTERNAL_SERVICE_REQUESTING,
  CREATE_INTERNAL_SERVICE_SUCCESS,
  CREATE_INTERNAL_SERVICE_FAILURE
} from '../../constants/serviceConstants/createInternalService';
import { webApi } from '../../config/index';

const createInternalServiceInvalid = () => ({
  type: CREATE_INTERNAL_SERVICE_INVALID
});

const createInternalServiceRequest = () => ({
  type: CREATE_INTERNAL_SERVICE_REQUESTING,
  isFetching: true
});

const createInternalServiceSuccess = (data, status, idSrv) => ({
  type: CREATE_INTERNAL_SERVICE_SUCCESS,
  isFetching: false,
  data,
  status,
  idSrv
});

const createInternalServiceFailure = (err, status, idSrv) => ({
  type: CREATE_INTERNAL_SERVICE_FAILURE,
  isFetching: false,
  err,
  status,
  idSrv
});

const createInternalInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchCreateInternalService = (
  idName: string,
  dataSrv: Object,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(createInternalServiceRequest());

  let idSrv = idName;
  const intObj = {
    deploy: dataSrv.currentDeployment,
    name: dataSrv.internalSrvNameValue,
    ports: []
  };
  dataSrv.internalSrvObject.map(item => {
    intObj.ports.push({
      name: item.internalSrvName,
      port: parseInt(item.internalSrvPort, 10),
      target_port: parseInt(item.internalSrvTargetPort, 10),
      protocol: item.intServiceType
    });
    return null;
  });
  const response = await axios.post(
    `${URL}/namespaces/${idName}/services`,
    intObj,
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
    case 201: {
      idSrv = `Internal service ${dataSrv.internalSrvNameValue} for ${
        dataSrv.currentDeployment
      }`;
      dispatch(createInternalServiceSuccess(data, status, idSrv));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(createInternalInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else
        dispatch(createInternalServiceFailure(data.message, status, idSrv));
      break;
    }
    default: {
      dispatch(createInternalServiceFailure(data.message, status, idSrv));
    }
  }
  dispatch(createInternalServiceInvalid());
};

export const fetchCreateInternalServiceIfNeeded = (
  idName: string,
  data: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchCreateInternalService(idName, data, axios));
