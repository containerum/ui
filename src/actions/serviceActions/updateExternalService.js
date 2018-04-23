/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  UPDATE_EXTERNAL_SERVICE_REQUESTING,
  UPDATE_EXTERNAL_SERVICE_SUCCESS,
  UPDATE_EXTERNAL_SERVICE_FAILURE
} from '../../constants/serviceConstants/updateExternalService';
import { webApiLogin } from '../../config/index';

const updateExternalServiceRequest = () => ({
  type: UPDATE_EXTERNAL_SERVICE_REQUESTING,
  isFetching: true
});

const updateExternalServiceSuccess = (data, status, method, idSrv) => ({
  type: UPDATE_EXTERNAL_SERVICE_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idSrv
});

const updateExternalServiceFailure = (err, status, idSrv) => ({
  type: UPDATE_EXTERNAL_SERVICE_FAILURE,
  isFetching: false,
  err,
  status,
  idSrv
});

const updateExternalInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchUpdateExternalService = (
  idName: string,
  idSrv: string,
  dataSrv: Object,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(updateExternalServiceRequest());

  const extObj = {
    deploy: dataSrv.currentDeployment,
    ports: []
  };
  dataSrv.externalSrvObject.map(item => {
    extObj.ports.push({
      name: item.externalSrvName,
      target_port: parseInt(item.externalSrvTargetPort, 10),
      protocol: item.extServiceType
    });
    return null;
  });
  // console.log(extObj);
  const response = await axios.put(
    `${URL}/namespace/${idName}/service/${idSrv}`,
    extObj,
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data, config } = response;
  // console.log(data);
  switch (status) {
    case 200: {
      dispatch(
        updateExternalServiceSuccess(
          data,
          202,
          config.method,
          `External service ${response.data.name}`
        )
      );
      dispatch(push('/namespaces'));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(updateExternalInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else
        dispatch(updateExternalServiceFailure(data.message, status, idSrv));
      break;
    }
    default: {
      dispatch(updateExternalServiceFailure(data.message, status, idSrv));
    }
  }
};

export const fetchUpdateExternalServiceIfNeeded = (
  idName: string,
  idSrv: string,
  data: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchUpdateExternalService(idName, idSrv, data, axios));
