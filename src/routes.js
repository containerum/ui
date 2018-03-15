/* @flow */

import type { Dispatch } from './types';
import { routerLinks } from './config';
import { fetchGetNamespacesIfNeeded } from './actions/namespacesActions/getNamespaces';
import { fetchGetVolumesIfNeeded } from './actions/volumesActions/getVolumes';
import { fetchGetNamespaceIfNeeded } from './actions/namespaceActions/getNamespace';
import { fetchGetDeploymentsIfNeeded } from './actions/deploymentsActions/getDeployments';
import { fetchGetDeploymentIfNeeded } from './actions/deploymentActions/getDeployment';
import { fetchGetPodsIfNeeded } from './actions/podsActions/getPods';
import { fetchGetPodIfNeeded } from './actions/podActions/getPod';
import { fetchGetServicesIfNeeded } from './actions/servicesActions/getServices';
import { fetchGetServiceIfNeeded } from './actions/serviceActions/getService';
import { fetchGetNamespacesTariffsIfNeeded } from './actions/namespacesActions/getNamespacesTariffs';
import { fetchGetVolumesTariffsIfNeeded } from './actions/volumesActions/getVolumesTariffs';
import { fetchGetSupportGroupsIfNeeded } from './actions/supportActions/getSupportGroups';
import { fetchGetCountDeploymentsIfNeeded } from './actions/statisticsActions/getCountDeployments';
import { fetchGetCountServicesIfNeeded } from './actions/statisticsActions/getCountServices';
import { fetchGetCountPodsIfNeeded } from './actions/statisticsActions/getCountPods';
import { fetchGetSolutionsIfNeeded } from './actions/solutionsActions/getSolutions';
import Main from './containers/Main';
import DashboardPage from './containers/Dashboard';
import NamespacesPage from './containers/Namespaces';
import VolumesPage from './containers/Volumes';
import NamespacePage from './containers/Namespace';
import ResizeNamespacePage from './containers/ResizeNamespace';
import CreateNamespacePage from './containers/CreateNamespace';
import DeploymentsPage from './containers/Deployments';
import PodsPage from './containers/Pods';
import PodPage from './containers/Pod';
import PodLogsPage from './containers/Pod/PodLogs';
import ServicesPage from './containers/Services';
import ServicePage from './containers/Service';
import CreateServicePage from './containers/CreateService';
import UpdateServicePage from './containers/UpdateService';
import DeploymentPage from './containers/Deployment';
import CreateDeploymentPage from './containers/CreateDeployment';
import UpdateDeploymentPage from './containers/UpdateDeployment';
import CreateVolumePage from './containers/CreateVolume';
import ResizeVolumePage from './containers/ResizeVolume';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import ConfirmEmail from './containers/ConfirmEmail';
import RecoveryPassword from './containers/RecoveryPassword';
import Forgot from './containers/Forgot';
import CheckEmail from './containers/CheckEmail';
import SupportPage from './containers/Support';
import SuccessTicket from './containers/SuccessTicket';
import AccountPage from './containers/Account';
import SettingsPage from './containers/Settings';
import BillingPage from './containers/Billing';
import NotFoundPage from './containers/NotFound';

export default [
  {
    path: routerLinks.index,
    exact: true,
    component: Main,
    include: true
  },
  {
    path: routerLinks.dashboard,
    exact: true,
    component: DashboardPage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([
        dispatch(fetchGetNamespacesIfNeeded()),
        dispatch(fetchGetSolutionsIfNeeded()),
        dispatch(fetchGetCountDeploymentsIfNeeded()),
        dispatch(fetchGetCountServicesIfNeeded()),
        dispatch(fetchGetCountPodsIfNeeded())
      ])
  },
  {
    path: routerLinks.namespaces,
    exact: true,
    component: NamespacesPage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetNamespacesIfNeeded())])
  },
  {
    path: routerLinks.volumes,
    exact: true,
    component: VolumesPage,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetVolumesIfNeeded())])
  },
  {
    path: routerLinks.namespace,
    component: NamespacePage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([dispatch(fetchGetNamespaceIfNeeded(params.idName))])
  },
  {
    path: routerLinks.getDeployments,
    exact: true,
    component: DeploymentsPage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([dispatch(fetchGetDeploymentsIfNeeded(params.idName))])
  },
  {
    path: routerLinks.getDeployment,
    // exact: true,
    component: DeploymentPage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([
        dispatch(fetchGetDeploymentIfNeeded(params.idName, params.idDep))
      ])
  },
  {
    path: routerLinks.createDeployment,
    component: CreateDeploymentPage,
    include: true
  },
  {
    path: routerLinks.resizeDeployment,
    component: UpdateDeploymentPage,
    include: true
  },
  {
    path: routerLinks.getPods,
    component: PodsPage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([dispatch(fetchGetPodsIfNeeded(params.idName, params.idDep))])
  },
  {
    path: routerLinks.getPod,
    component: PodPage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([dispatch(fetchGetPodIfNeeded(params.idName, params.idDep))])
  },
  {
    path: routerLinks.getPodLogs,
    component: PodLogsPage,
    include: true
  },
  {
    path: routerLinks.getServices,
    exact: true,
    component: ServicesPage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([dispatch(fetchGetServicesIfNeeded(params.idName))])
  },
  {
    path: routerLinks.getService,
    // exact: true,
    component: ServicePage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([
        dispatch(fetchGetServiceIfNeeded(params.idName, params.idSrv))
      ])
  },
  {
    path: routerLinks.createService,
    component: CreateServicePage,
    include: true
  },
  {
    path: routerLinks.resizeService,
    component: UpdateServicePage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([
        dispatch(fetchGetServiceIfNeeded(params.idName, params.idSrv))
      ])
  },
  {
    path: routerLinks.createNamespace,
    exact: true,
    component: CreateNamespacePage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetNamespacesTariffsIfNeeded())])
  },
  {
    path: routerLinks.resizeNamespace,
    // exact: true,
    component: ResizeNamespacePage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetNamespacesTariffsIfNeeded())])
  },
  {
    path: routerLinks.createVolume,
    exact: true,
    component: CreateVolumePage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetVolumesTariffsIfNeeded())])
  },
  {
    path: routerLinks.resizeVolume,
    exact: true,
    component: ResizeVolumePage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetVolumesTariffsIfNeeded())])
  },
  {
    path: routerLinks.account,
    exact: true,
    component: AccountPage,
    include: true
    // loadData: (dispatch: Dispatch) =>
    //   Promise.all([dispatch(fetchGetSupportGroupsIfNeeded())])
  },
  {
    path: routerLinks.settings,
    exact: true,
    component: SettingsPage,
    include: true
  },
  {
    path: routerLinks.billing,
    exact: true,
    component: BillingPage,
    include: true
    // loadData: (dispatch: Dispatch) =>
    //   Promise.all([dispatch(fetchGetSupportGroupsIfNeeded())])
  },
  {
    path: routerLinks.support,
    exact: true,
    component: SupportPage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetSupportGroupsIfNeeded())])
  },
  {
    path: routerLinks.successTicket,
    exact: true,
    component: SuccessTicket,
    include: true
  },
  {
    path: routerLinks.login,
    component: Login
  },
  {
    path: routerLinks.signUp,
    component: SignUp
  },
  {
    path: routerLinks.recoveryPassword,
    component: RecoveryPassword
  },
  {
    path: routerLinks.confirmEmail,
    component: ConfirmEmail
  },
  {
    path: routerLinks.forgot,
    component: Forgot
  },
  {
    path: routerLinks.checkEmail,
    component: CheckEmail
  },
  {
    path: '*',
    component: NotFoundPage
  }
];
