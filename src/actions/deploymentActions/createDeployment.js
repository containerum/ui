/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';
import cloneDeep from 'clone-deep';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  CREATE_DEPLOYMENT_REQUESTING,
  CREATE_DEPLOYMENT_SUCCESS,
  CREATE_DEPLOYMENT_FAILURE
} from '../../constants/deploymentConstants/createDeployment';
import { webApi } from '../../config';

const createDeploymentRequest = () => ({
  type: CREATE_DEPLOYMENT_REQUESTING,
  isFetching: true
});

const createDeploymentSuccess = (data, status, method, idDep) => ({
  type: CREATE_DEPLOYMENT_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idDep
});

const createDeploymentFailure = (err, status, idDep) => ({
  type: CREATE_DEPLOYMENT_FAILURE,
  isFetching: false,
  err,
  status,
  idDep
});

const createDeploymentInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchCreateDeployment = (
  idName: string,
  dataObj: Object,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(createDeploymentRequest());

  const splitContainers = cloneDeep(dataObj.containers);
  splitContainers.map(item => {
    delete item.id;
    // item.limits.requests = Object.assign({}, item.limits);
    // delete item.limits.cpu;
    // delete item.limits.memory;
    if (item.ports[0].containerPort) {
      item.ports.map(includePorts => {
        delete includePorts.id;
        delete includePorts.index;
        return null;
      });
    } else {
      item.ports = [];
    }
    if (item.env[0].value) {
      item.env.map(includeEnvs => {
        delete includeEnvs.id;
        delete includeEnvs.index;
        return null;
      });
    } else {
      item.env = [];
    }

    if (item.volumeMounts.length) {
      item.volumeMounts.map(volumeMountsEnvs => {
        if (!volumeMountsEnvs.subPath) {
          delete volumeMountsEnvs.subPath;
        }
        delete volumeMountsEnvs.id;
        delete volumeMountsEnvs.index;
        return null;
      });
    } else {
      item.volumeMounts = [];
    }
    if (!item.command.length) {
      delete item.command;
    }
    return null;
  });

  let labels = {};
  dataObj.labels.map(item => {
    const { key, label } = item;
    if (key && label) {
      labels = {
        ...labels,
        [key]: label
      };
    }
    return null;
  });

  let idSrv = dataObj.name;
  const response = await axios.post(
    `${URL}/namespace/${idName}/deployment`,
    {
      name: dataObj.name,
      labels,
      replicas: dataObj.replicas,
      containers: splitContainers
    },
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
        // 'Content-Type': 'application/json'
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { data, status, config } = response;
  switch (status) {
    case 200: {
      idSrv = `Deployment ${dataObj.name} for ${idName}`;
      dispatch(createDeploymentSuccess(data, 201, config.method, idSrv));
      dispatch(push('/namespaces'));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(createDeploymentInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(createDeploymentFailure(data.message, status, data));
      break;
    }
    default: {
      dispatch(createDeploymentFailure(data.message, status, data));
    }
  }
};

export const fetchCreateDeploymentIfNeeded = (
  idName: string,
  data: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchCreateDeployment(idName, data, axios));
