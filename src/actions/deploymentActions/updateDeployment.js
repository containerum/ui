/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';
import cloneDeep from 'clone-deep';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  UPDATE_DEPLOYMENT_REQUESTING,
  UPDATE_DEPLOYMENT_SUCCESS,
  UPDATE_DEPLOYMENT_FAILURE
} from '../../constants/deploymentConstants/updateDeployment';
import { webApi } from '../../config';

const updateDeploymentRequest = () => ({
  type: UPDATE_DEPLOYMENT_REQUESTING,
  isFetching: true
});

const updateDeploymentSuccess = (data, status, method, idDep) => ({
  type: UPDATE_DEPLOYMENT_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idDep
});

const updateDeploymentFailure = (err, status, idDep) => ({
  type: UPDATE_DEPLOYMENT_FAILURE,
  isFetching: false,
  err,
  status,
  idDep
});

const updateDeploymentInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchUpdateDeployment = (
  idName: string,
  idDep: string,
  dataObj: Object,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(updateDeploymentRequest());
  const splitContainers = cloneDeep(dataObj.containers);
  splitContainers.map(item => {
    delete item.id;
    // item.resources.requests = Object.assign({}, item.resources);
    // delete item.resources.cpu;
    // delete item.resources.memory;
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
  const response = await axios.put(
    `${URL}/namespaces/${idName}/deployments/${idDep}`,
    {
      name: idDep,
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
    case 202: {
      idSrv = `Deployment ${dataObj.name} for ${idName}`;
      dispatch(updateDeploymentSuccess(data, status, config.method, idSrv));
      dispatch(push('/namespaces'));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(updateDeploymentInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(updateDeploymentFailure(data.message, status, data));
      break;
    }
    default: {
      dispatch(updateDeploymentFailure(data.message, status, data));
    }
  }
};

export const fetchUpdateDeploymentIfNeeded = (
  idName: string,
  idDep: string,
  data: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchUpdateDeployment(idName, idDep, data, axios));
