/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  UPDATE_INTERNAL_SERVICE_REQUESTING,
  UPDATE_INTERNAL_SERVICE_SUCCESS,
  UPDATE_INTERNAL_SERVICE_FAILURE
} from '../../constants/serviceConstants/updateInternalService';
import { webApiLogin } from '../../config/index';

const updateInternalServiceRequest = () => ({
  type: UPDATE_INTERNAL_SERVICE_REQUESTING,
  isFetching: true
});

const updateInternalServiceSuccess = (data, status, method, idSrv) => ({
  type: UPDATE_INTERNAL_SERVICE_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idSrv
});

const updateInternalServiceFailure = (err, status, idSrv) => ({
  type: UPDATE_INTERNAL_SERVICE_FAILURE,
  isFetching: false,
  err,
  status,
  idSrv
});

export const fetchUpdateInternalService = (
  idName: string,
  idSrv: string,
  dataSrv: Object,
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(updateInternalServiceRequest());

  const intObj = {
    deploy: dataSrv.currentDeployment,
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
  const response = await axios.put(
    `${URL}/namespace/${idName}/service/${idSrv}`,
    intObj,
    {
      headers: {
        Authorization: token,
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
        updateInternalServiceSuccess(
          data,
          202,
          config.method,
          `Internal service ${response.data.name}`
        )
      );
      dispatch(push('/namespaces'));
      break;
    }
    case 401: {
      dispatch(updateInternalServiceFailure(data.message, status, idSrv));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(updateInternalServiceFailure(data.message, status, idSrv));
    }
  }
};

export const fetchUpdateInternalServiceIfNeeded = (
  idName: string,
  idSrv: string,
  data: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchUpdateInternalService(idName, idSrv, data, axios));
