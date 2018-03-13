/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import home from './home';
import userInfo from './userInfo';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import signUpReducer from './signUpReducer';
import confirmSignUpReducer from './confirmSignUpReducer';
import forgotReducer from './forgotReducer';
import checkHashPasswordReducer from './checkHashPasswordReducer';
import recoveryPasswordReducer from './recoveryPasswordReducer';
import getNamespacesReducer from './namespacesReducers/getNamespaces';
import getNamespaceReducer from './namespaceReducers/getNamespace';
import deleteNamespaceReducer from './namespaceReducers/deleteNamespace';
import getNamespacesTariffsReducer from './namespacesReducers/getNamespacesTariffs';
import createNamespaceReducer from './namespaceReducers/createNamespace';
import resizeNamespaceReducer from './namespaceReducers/resizeNamespace';
import getDeploymentsReducer from './deploymentsReducers/getDeployments';
import deleteDeploymentReducer from './deploymentReducers/deleteDeployment';
import createDeploymentReducer from './deploymentReducers/createDeployment';
import updateDeploymentReducer from './deploymentReducers/updateDeployment';
import getDeploymentReducer from './deploymentReducers/getDeployment';
import getPodsReducer from './podsReducers/getPods';
import getPodReducer from './podReducers/getPod';
import deletePodReducer from './podReducers/deletePod';
import getServicesReducer from './servicesReducers/getServices';
import getServiceReducer from './serviceReducers/getService';
import deleteServiceReducer from './serviceReducers/deleteService';
import createInternalServiceReducer from './serviceReducers/createInternalService';
import createExternalServiceReducer from './serviceReducers/createExternalService';
import updateInternalServiceReducer from './serviceReducers/updateInternalService';
import updateExternalServiceReducer from './serviceReducers/updateExternalService';
import getReleasesGithubReducer from './getReleasesGithubReducer';
import getProfileReducer from './profileReducers/getProfile';
import getBalanceReducer from './billingReducers/getBalance';
import payForReducer from './billingReducers/payFor';
import couponPayReducer from './billingReducers/couponPay';
import getVolumesReducer from './volumesReducers/getVolumes';
import getVolumesByNSReducer from './volumesReducers/getVolumesByNS';
import getVolumesTariffsReducer from './volumesReducers/getVolumesTariffs';
import deleteVolumeReducer from './volumeReducers/deleteVolume';
import createVolumeReducer from './volumeReducers/createVolume';
import resizeVolumeReducer from './volumeReducers/resizeVolume';
import getVolumeReducer from './volumeReducers/getVolume';
import getSupportGroupsReducer from './supportReducers/getSupportGroups';
import sendSupportTicketReducer from './supportReducers/sendSupportTicket';
import changePasswordReducer from './profileReducers/changePassword';
import getProfileTariffsReducer from './profileReducers/getProfileTariffs';
import getProfileReportReducer from './profileReducers/getProfileReport';
import getImagesTokenReducer from './webHookReducers/getImagesToken';
import deleteImageTokenReducer from './webHookReducers/deleteImageToken';
import createImageTokenReducer from './webHookReducers/createImageToken';
import deleteAccountReducer from './profileReducers/deleteAccount';
import changeProfileInfoReducer from './profileReducers/changeProfileInfo';
import getCountDeploymentsReducer from './statisticsReducers/getCountDeployments';
import getCountServicesReducer from './statisticsReducers/getCountServices';
import getCountPodsReducer from './statisticsReducers/getCountPods';
import getSolutionsReducer from './solutionsReducers/getSolutions';

const reducers = {
  home,
  userInfo,
  loginReducer,
  logoutReducer,
  signUpReducer,
  confirmSignUpReducer,
  forgotReducer,
  checkHashPasswordReducer,
  recoveryPasswordReducer,
  getNamespacesReducer,
  getNamespaceReducer,
  deleteNamespaceReducer,
  getNamespacesTariffsReducer,
  createNamespaceReducer,
  resizeNamespaceReducer,
  getDeploymentsReducer,
  deleteDeploymentReducer,
  createDeploymentReducer,
  updateDeploymentReducer,
  getDeploymentReducer,
  getPodsReducer,
  getPodReducer,
  deletePodReducer,
  getServicesReducer,
  getServiceReducer,
  deleteServiceReducer,
  getReleasesGithubReducer,
  getProfileReducer,
  changeProfileInfoReducer,
  getProfileTariffsReducer,
  getProfileReportReducer,
  getBalanceReducer,
  payForReducer,
  couponPayReducer,
  getVolumesReducer,
  getVolumesByNSReducer,
  getVolumesTariffsReducer,
  deleteVolumeReducer,
  createVolumeReducer,
  resizeVolumeReducer,
  getVolumeReducer,
  getSupportGroupsReducer,
  sendSupportTicketReducer,
  changePasswordReducer,
  getImagesTokenReducer,
  deleteImageTokenReducer,
  createImageTokenReducer,
  deleteAccountReducer,
  createInternalServiceReducer,
  createExternalServiceReducer,
  updateInternalServiceReducer,
  updateExternalServiceReducer,
  getCountDeploymentsReducer,
  getCountServicesReducer,
  getCountPodsReducer,
  getSolutionsReducer,
  router,
  loadingBar: loadingBarReducer
};

export type Reducers = typeof reducers;
export default combineReducers(reducers);
