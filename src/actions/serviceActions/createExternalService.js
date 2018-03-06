/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  CREATE_EXTERNAL_SERVICE_REQUESTING,
  CREATE_EXTERNAL_SERVICE_SUCCESS,
  CREATE_EXTERNAL_SERVICE_FAILURE
} from '../../constants/serviceConstants/createExternalService';
import { webApi } from '../../config/index';

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
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(createExternalServiceRequest());

  let idSrv = idName;
  const intObj = {
    deployment_name: dataSrv.currentDeployment,
    ports: [],
    external: 'true'
  };
  dataSrv.externalSrvObject.map(item => {
    intObj.ports.push({
      name: item.externalSrvName,
      targetPort: parseInt(item.externalSrvTargetPort, 10),
      protocol: item.extServiceType
    });
    return null;
  });
  const response = await axios.post(
    `${URL}/api/namespaces/${idName}/services`,
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
  const { status, data } = response;
  switch (status) {
    case 201: {
      idSrv = `External service ${data.name} for ${intObj.deployment_name}`;
      dispatch(createExternalServiceSuccess(data, status, idSrv));
      dispatch(push('/namespaces'));
      break;
    }
    case 401: {
      dispatch(createExternalServiceFailure(data.message, status, idSrv));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(createExternalServiceFailure(data.message, status, idSrv));
    }
  }
};

export const fetchCreateExternalServiceIfNeeded = (
  idName: string,
  data: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchCreateExternalService(idName, data, axios));
