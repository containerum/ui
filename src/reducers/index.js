/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import signUpReducer from './signUpReducer';
import confirmSignUpReducer from './confirmSignUpReducer';
import forgotReducer from './forgotReducer';
import checkHashPasswordReducer from './checkHashPasswordReducer';
import recoveryPasswordReducer from './recoveryPasswordReducer';
import getNamespacesReducer from './namespacesReducers/getNamespaces';
import getUsageNamespacesReducer from './namespacesReducers/getUsageNamespaces';
import getNamespaceReducer from './namespaceReducers/getNamespace';
import deleteNamespaceReducer from './namespaceReducers/deleteNamespace';
import createNamespaceReducer from './namespaceReducers/createNamespace';
import createCustomNamespaceReducer from './namespaceReducers/createCustomNamespace';
import updateCustomNamespaceReducer from './namespaceReducers/updateCustomNamespace';
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
import createDomainReducer from './serviceReducers/createDomain';
import updateInternalServiceReducer from './serviceReducers/updateInternalService';
import updateExternalServiceReducer from './serviceReducers/updateExternalService';
import getReleasesGithubReducer from './getReleasesGithubReducer';
import getProfileReducer from './profileReducers/getProfile';
import getVolumesReducer from './volumesReducers/getVolumes';
import getVolumesByNSReducer from './volumesReducers/getVolumesByNS';
import deleteVolumeReducer from './volumeReducers/deleteVolume';
import getVolumeReducer from './volumeReducers/getVolume';
import changePasswordReducer from './profileReducers/changePassword';
import getProfileReportReducer from './profileReducers/getProfileReport';
import getImagesTokenReducer from './webHookReducers/getImagesToken';
import deleteImageTokenReducer from './webHookReducers/deleteImageToken';
import createImageTokenReducer from './webHookReducers/createImageToken';
import deleteAccountReducer from './profileReducers/deleteAccount';
import changeProfileInfoReducer from './profileReducers/changeProfileInfo';
import getResourcesReducer from './statisticsReducers/getResources';
import getSolutionsReducer from './solutionsReducers/getSolutions';
import getSolutionReducer from './solutionReducers/getSolution';
import addSolutionReducer from './solutionReducers/addSolution';
import runSolutionReducer from './solutionReducers/runSolution';
import getDomainsGlobalReducer from './servicesReducers/getDomainsGlobal';
import getIngressesReducer from './servicesReducers/getDomains';
import deleteIngressReducer from './serviceReducers/deleteIngress';
import getConfigMapsReducer from './configMapReducers/getConfigMaps';
import getConfigMapReducer from './configMapReducers/getConfigMap';
import createConfigMapReducer from './configMapReducers/createConfigMap';
import deleteConfigMapReducer from './configMapReducers/deleteConfigMap';
import getNamespaceUsersAccessReducer from './namespaceReducers/getNamespaceUsersAccess';
import addNamespaceUserAccessReducer from './namespaceReducers/addNamespaceUserAccess';
import deleteNamespaceUserAccessReducer from './namespaceReducers/deleteNamespaceUserAccess';
import getUserListReducer from './globalMembership/getUserList';
import getGroupsReducer from './globalMembership/getGroups';
import addGroupReducer from './globalMembership/addGroup';
import deleteGroupReducer from './globalMembership/deleteGroup';
import adminDeleteUserReducer from './globalMembership/adminDeleteUser';
import addUserReducer from './globalMembership/addUser';
import getGroupReducer from './globalMembership/getGroup';
import addUserInGroupReducer from './globalMembership/addUserInGroup';
import updateUserInGroupReducer from './globalMembership/updateUserInGroup';
import deleteUserFromGroupReducer from './globalMembership/deleteUserFromGroup';
import getRunningSolutionsReducer from './solutionsReducers/getRunningSolutions';
import deleteRunningSolutionReducer from './solutionReducers/deleteRunningSolution';
import getDeploymentsRunningSolutionReducer from './solutionsReducers/getDeploymentsRunningSolution';
import getServicesRunningSolutionReducer from './solutionsReducers/getServicesRunningSolution';
import getRunningSolutionReducer from './solutionReducers/getRunningSolution';
import getEnvsSolutionReducer from './solutionReducers/getEnvsSolution';
import getConfigMapsByNSReducer from './configMapReducers/getConfigMapsByNS';
import getStartedReducer from './getStarted';
import activateUserReducer from './userManagement/activateUser';
import getUserProfileByEmailReducer from './profileReducers/getUserProfileByEmail';
import setUserAsAdminReducer from './userManagement/setUserAsAdmin';
import unSetUserAsAdminReducer from './userManagement/unSetUserAsAdmin';
import resetPasswordOfUserReducer from './userManagement/resetPasswordOfUser';
import getCpuStatisticReducer from './statisticsReducers/getCpuStatistic';
import getCpuHistoryStatisticReducer from './statisticsReducers/getCpuHistoryStatistic';
import getCpuHistoryPerNodesStatisticReducer from './statisticsReducers/getCpuHistoryPerNodesStatistic';
import getMemoryStatisticReducer from './statisticsReducers/getMemoryStatistic';
import getMemoryHistoryStatisticReducer from './statisticsReducers/getMemoryHistoryStatistic';
import getMemoryHistoryPerNodesStatisticReducer from './statisticsReducers/getMemoryHistoryPerNodesStatistic';
import getStorageStatisticReducer from './statisticsReducers/getStorageStatistic';
import getDomainsReducer from './domainsReducers/getDomains';
import deleteDomainReducer from './domainReducers/deleteDomain';
import addDomainReducer from './domainReducers/addDomain';
import createCustomVolumeReducer from './volumeReducers/createCustomVolume';
import updateCustomVolumeReducer from './volumeReducers/updateCustomVolume';
import getStoragesReducer from './storagesReducers/getStorages';
import addStorageReducer from './storageReducers/addStorage';
import deleteStorageReducer from './storageReducers/deleteStorage';
import deleteSolutionTemplateReducer from './solutionReducers/deleteSolutionTemplate';
import getSecretsReducer from './secretsReducers/getSecrets';
import createSecretReducer from './secretReducers/createSecret';
import deleteSecretReducer from './secretReducers/deleteSecret';
import getSecretReducer from './secretReducers/getSecret';

const reducers = {
  loginReducer,
  logoutReducer,
  signUpReducer,
  confirmSignUpReducer,
  forgotReducer,
  checkHashPasswordReducer,
  recoveryPasswordReducer,
  getNamespacesReducer,
  getUsageNamespacesReducer,
  getNamespaceReducer,
  deleteNamespaceReducer,
  createNamespaceReducer,
  createCustomNamespaceReducer,
  updateCustomNamespaceReducer,
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
  getProfileReportReducer,
  getVolumesReducer,
  getVolumesByNSReducer,
  deleteVolumeReducer,
  getVolumeReducer,
  changePasswordReducer,
  getImagesTokenReducer,
  deleteImageTokenReducer,
  createImageTokenReducer,
  deleteAccountReducer,
  createInternalServiceReducer,
  createExternalServiceReducer,
  createDomainReducer,
  updateInternalServiceReducer,
  updateExternalServiceReducer,
  getResourcesReducer,
  getSolutionsReducer,
  getSolutionReducer,
  addSolutionReducer,
  runSolutionReducer,
  getDomainsGlobalReducer,
  deleteIngressReducer,
  getConfigMapsReducer,
  getConfigMapReducer,
  createConfigMapReducer,
  deleteConfigMapReducer,
  getNamespaceUsersAccessReducer,
  deleteNamespaceUserAccessReducer,
  addNamespaceUserAccessReducer,
  getUserListReducer,
  getGroupsReducer,
  addGroupReducer,
  deleteGroupReducer,
  adminDeleteUserReducer,
  addUserReducer,
  addUserInGroupReducer,
  updateUserInGroupReducer,
  getGroupReducer,
  getIngressesReducer,
  deleteUserFromGroupReducer,
  getRunningSolutionsReducer,
  deleteRunningSolutionReducer,
  getDeploymentsRunningSolutionReducer,
  getServicesRunningSolutionReducer,
  getRunningSolutionReducer,
  getEnvsSolutionReducer,
  getConfigMapsByNSReducer,
  getStartedReducer,
  activateUserReducer,
  getUserProfileByEmailReducer,
  unSetUserAsAdminReducer,
  setUserAsAdminReducer,
  resetPasswordOfUserReducer,
  getDomainsReducer,
  deleteDomainReducer,
  addDomainReducer,
  createCustomVolumeReducer,
  updateCustomVolumeReducer,
  getStoragesReducer,
  addStorageReducer,
  deleteStorageReducer,
  getCpuStatisticReducer,
  getCpuHistoryStatisticReducer,
  getCpuHistoryPerNodesStatisticReducer,
  getMemoryStatisticReducer,
  getMemoryHistoryStatisticReducer,
  getMemoryHistoryPerNodesStatisticReducer,
  getStorageStatisticReducer,
  deleteSolutionTemplateReducer,
  getSecretsReducer,
  createSecretReducer,
  deleteSecretReducer,
  getSecretReducer,
  router,
  loadingBar: loadingBarReducer
};

export type Reducers = typeof reducers;
export default combineReducers(reducers);
