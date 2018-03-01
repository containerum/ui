/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  CREATE_INTERNAL_SERVICE_REQUESTING,
  CREATE_INTERNAL_SERVICE_SUCCESS,
  CREATE_INTERNAL_SERVICE_FAILURE
} from '../../constants/serviceConstants/createInternalService';
import { webApi } from '../../config/index';

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

export const fetchCreateInternalService = (
  idName: string,
  dataSrv: Object,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;

  dispatch(createInternalServiceRequest());

  let idSrv = idName;
  const intObj = {
    deployment_name: dataSrv.currentDeployment,
    ports: [],
    external: 'false'
  };
  dataSrv.internalSrvObject.map(item => {
    intObj.ports.push({
      name: item.internalSrvName,
      port: parseInt(item.internalSrvPort, 10),
      targetPort: parseInt(item.internalSrvTargetPort, 10),
      protocol: item.intServiceType
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
      idSrv = `Internal service ${data.name} for ${intObj.deployment_name}`;
      dispatch(createInternalServiceSuccess(data, status, idSrv));
      dispatch(push('/namespaces'));
      break;
    }
    case 401: {
      dispatch(createInternalServiceFailure(data.message, status, idSrv));
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(createInternalServiceFailure(data.message, status, idSrv));
    }
  }
};

export const fetchCreateInternalServiceIfNeeded = (
  idName: string,
  data: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchCreateInternalService(idName, data, axios));
