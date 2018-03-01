/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  UPDATE_EXTERNAL_SERVICE_REQUESTING,
  UPDATE_EXTERNAL_SERVICE_SUCCESS,
  UPDATE_EXTERNAL_SERVICE_FAILURE
} from '../../constants/serviceConstants/updateExternalService';
import { webApi } from '../../config/index';

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

export const fetchUpdateExternalService = (
  idName: string,
  idSrv: string,
  dataSrv: Object,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(updateExternalServiceRequest());

  const intObj = {
    deployment_name: dataSrv.currentDeployment,
    ports: [],
    external: 'true'
  };
  dataSrv.externalSrvObject.map(item => {
    intObj.ports.push({
      name: item.externalSrvName,
      targetPort: parseInt(item.externalSrvTargetPort, 10),
      protocol: item.intServiceType
    });
    return null;
  });
  const response = await axios.put(
    `${URL}/api/namespaces/${idName}/services/${idSrv}`,
    intObj,
    {
      headers: {
        Authorization: token,
        'User-Client': browser,
        'Access-Control-Allow-Origin': '*'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data, config } = response;
  switch (status) {
    case 202: {
      dispatch(
        updateExternalServiceSuccess(
          data,
          status,
          config.method,
          `External service ${response.data.name}`
        )
      );
      dispatch(push('/namespaces'));
      break;
    }
    case 401: {
      dispatch(updateExternalServiceFailure(data.message, status, idSrv));
      dispatch(push('/login'));
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
