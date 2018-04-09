/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  CREATE_EXTERNAL_SERVICE_INVALID,
  CREATE_EXTERNAL_SERVICE_REQUESTING,
  CREATE_EXTERNAL_SERVICE_SUCCESS,
  CREATE_EXTERNAL_SERVICE_FAILURE
} from '../../constants/serviceConstants/createExternalService';
import { webApiLogin } from '../../config/index';

const createExternalServiceInvalid = () => ({
  type: CREATE_EXTERNAL_SERVICE_INVALID
});

const createExternalServiceRequest = () => ({
  type: CREATE_EXTERNAL_SERVICE_REQUESTING,
  isFetching: true
});

const createExternalServiceSuccess = (data, status, idSrv) => ({
  type: CREATE_EXTERNAL_SERVICE_SUCCESS,
  isFetching: false,
  data,
  status,
  idSrv
});

const createExternalServiceFailure = (err, status, idSrv) => ({
  type: CREATE_EXTERNAL_SERVICE_FAILURE,
  isFetching: false,
  err,
  status,
  idSrv
});

export const fetchCreateExternalService = (
  idName: string,
  dataSrv: Object,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(createExternalServiceRequest());

  let idSrv = idName;
  const intObj = {
    deploy: dataSrv.currentDeployment,
    name: dataSrv.externalSrvNameValue,
    ports: []
  };
  dataSrv.externalSrvObject.map(item => {
    intObj.ports.push({
      name: item.externalSrvName,
      target_port: parseInt(item.externalSrvTargetPort, 10),
      protocol: item.extServiceType
    });
    return null;
  });
  const response = await axios.post(
    `${URL}/namespace/${idName}/service`,
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
      idSrv = `External service ${dataSrv.externalSrvNameValue} for ${
        dataSrv.currentDeployment
      }`;
      dispatch(createExternalServiceSuccess(data, status, idSrv));
      break;
    }
    case 400: {
      dispatch(createExternalServiceFailure(data.message, status, idSrv));
      if (data.message === 'invalid token received') {
        dispatch(push('/login'));
      }
      break;
    }
    default: {
      dispatch(createExternalServiceFailure(data.message, status, idSrv));
    }
  }
  dispatch(createExternalServiceInvalid());
};

export const fetchCreateExternalServiceIfNeeded = (
  idName: string,
  data: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchCreateExternalService(idName, data, axios));
