/* @flow */

import type { Dispatch } from './types';
import { routerLinks } from './config';
import { fetchGetProfileIfNeeded } from './actions/profileActions/getProfile';
import { fetchGetNamespacesIfNeeded } from './actions/namespacesActions/getNamespaces';
// import { fetchGetVolumesIfNeeded } from './actions/volumesActions/getVolumes';
import { fetchGetNamespaceIfNeeded } from './actions/namespaceActions/getNamespace';
import { fetchGetDeploymentsIfNeeded } from './actions/deploymentsActions/getDeployments';
import { fetchGetDeploymentIfNeeded } from './actions/deploymentActions/getDeployment';
import { fetchGetPodsIfNeeded } from './actions/podsActions/getPods';
import { fetchGetPodIfNeeded } from './actions/podActions/getPod';
import { fetchGetServicesIfNeeded } from './actions/servicesActions/getServices';
import { fetchGetServiceIfNeeded } from './actions/serviceActions/getService';
import { fetchGetNamespacesTariffsIfNeeded } from './actions/namespacesActions/getNamespacesTariffs';
// import { fetchGetVolumesTariffsIfNeeded } from './actions/volumesActions/getVolumesTariffs';
import { fetchGetSupportGroupsIfNeeded } from './actions/supportActions/getSupportGroups';
import { fetchGetResourcesIfNeeded } from './actions/statisticsActions/getResources';
import { fetchGetSolutionsIfNeeded } from './actions/solutionsActions/getSolutions';
import { fetchGetSolutionIfNeeded } from './actions/solutionActions/getSolution';
import Main from './containers/Main';
import DashboardPage from './containers/Dashboard';
import SolutionsPage from './containers/Solutions';
import SolutionPage from './containers/Solution';
import NamespacesPage from './containers/Namespaces';
// import VolumesPage from './containers/Volumes';
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
import CreateDomainPage from './containers/CreateDomain';
import CreatedExternalServiceSuccessfulPage from './containers/CreatedExternalServiceSuccessful';
import UpdateServicePage from './containers/UpdateService';
import DeploymentPage from './containers/Deployment';
import CreateDeploymentPage from './containers/CreateDeployment';
import UpdateDeploymentPage from './containers/UpdateDeployment';
// import CreateVolumePage from './containers/CreateVolume';
// import ResizeVolumePage from './containers/ResizeVolume';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import ConfirmEmail from './containers/ConfirmEmail';
import RecoveryPassword from './containers/RecoveryPassword';
import Forgot from './containers/Forgot';
import CheckEmail from './containers/CheckEmail';
import SupportPage from './containers/Support';
import SuccessTicket from './containers/SuccessTicket';
import AccountPage from './containers/Account';
import BillingPage from './containers/Billing';
import NotFoundPage from './containers/NotFound';
import Tools from './components/Tools';
// import WebHookInfo from './containers/Webhook';
import DomainsInfo from './containers/Domains';
import ConfigMapInfo from './containers/ConfigMaps';
import ViewConfigMapsFilesInfo from './containers/ViewConfigMapsFiles';

export default [
  {
    path: routerLinks.index,
    exact: true,
    component: Main,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetProfileIfNeeded())])
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
        dispatch(fetchGetResourcesIfNeeded()),
        dispatch(fetchGetProfileIfNeeded())
      ])
  },
  {
    path: routerLinks.solutions,
    exact: true,
    component: SolutionsPage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([
        dispatch(fetchGetSolutionsIfNeeded()),
        dispatch(fetchGetProfileIfNeeded())
      ])
  },
  {
    path: routerLinks.solution,
    exact: true,
    component: SolutionPage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([
        dispatch(fetchGetSolutionIfNeeded()),
        dispatch(fetchGetProfileIfNeeded())
      ])
  },
  {
    path: routerLinks.namespaces,
    exact: true,
    component: NamespacesPage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([
        dispatch(fetchGetNamespacesIfNeeded()),
        dispatch(fetchGetProfileIfNeeded())
      ])
  },
  // {
  //   path: routerLinks.volumes,
  //   exact: true,
  //   component: VolumesPage,
  //   loadData: (dispatch: Dispatch) =>
  //     Promise.all([
  //       dispatch(fetchGetVolumesIfNeeded()),
  //       dispatch(fetchGetProfileIfNeeded())
  //     ])
  // },
  {
    path: routerLinks.namespace,
    component: NamespacePage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([
        dispatch(fetchGetNamespaceIfNeeded(params.idName)),
        dispatch(fetchGetProfileIfNeeded())
      ])
  },
  {
    path: routerLinks.getDeployments,
    exact: true,
    component: DeploymentsPage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([
        dispatch(fetchGetDeploymentsIfNeeded(params.idName)),
        dispatch(fetchGetProfileIfNeeded())
      ])
  },
  {
    path: routerLinks.getDeployment,
    // exact: true,
    component: DeploymentPage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([
        dispatch(fetchGetDeploymentIfNeeded(params.idName, params.idDep)),
        dispatch(fetchGetProfileIfNeeded())
      ])
  },
  {
    path: routerLinks.createDeployment,
    component: CreateDeploymentPage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetProfileIfNeeded())])
  },
  {
    path: routerLinks.resizeDeployment,
    component: UpdateDeploymentPage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetProfileIfNeeded())])
  },
  {
    path: routerLinks.getPods,
    component: PodsPage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([
        dispatch(fetchGetPodsIfNeeded(params.idName, params.idDep)),
        dispatch(fetchGetProfileIfNeeded())
      ])
  },
  {
    path: routerLinks.getPod,
    component: PodPage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([
        dispatch(fetchGetPodIfNeeded(params.idName, params.idDep)),
        dispatch(fetchGetProfileIfNeeded())
      ])
  },
  {
    path: routerLinks.getPodLogs,
    component: PodLogsPage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetProfileIfNeeded())])
  },
  {
    path: routerLinks.getServices,
    exact: true,
    component: ServicesPage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([
        dispatch(fetchGetServicesIfNeeded(params.idName)),
        dispatch(fetchGetProfileIfNeeded())
      ])
  },
  {
    path: routerLinks.getService,
    // exact: true,
    component: ServicePage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([
        dispatch(fetchGetServiceIfNeeded(params.idName, params.idSrv)),
        dispatch(fetchGetProfileIfNeeded())
      ])
  },
  {
    path: routerLinks.createService,
    component: CreateServicePage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetProfileIfNeeded())])
  },
  {
    path: routerLinks.createdExternalServiceSuccessful,
    component: CreatedExternalServiceSuccessfulPage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetProfileIfNeeded())])
  },
  {
    path: routerLinks.createDomain,
    component: CreateDomainPage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetProfileIfNeeded())])
  },
  {
    path: routerLinks.resizeService,
    component: UpdateServicePage,
    include: true,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([
        dispatch(fetchGetServiceIfNeeded(params.idName, params.idSrv)),
        dispatch(fetchGetProfileIfNeeded())
      ])
  },
  {
    path: routerLinks.createNamespace,
    exact: true,
    component: CreateNamespacePage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([
        dispatch(fetchGetNamespacesTariffsIfNeeded()),
        dispatch(fetchGetProfileIfNeeded())
      ])
  },
  {
    path: routerLinks.resizeNamespace,
    // exact: true,
    component: ResizeNamespacePage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([
        dispatch(fetchGetNamespacesTariffsIfNeeded()),
        dispatch(fetchGetProfileIfNeeded())
      ])
  },
  // {
  //   path: routerLinks.createVolume,
  //   exact: true,
  //   component: CreateVolumePage,
  //   include: true,
  //   loadData: (dispatch: Dispatch) =>
  //     Promise.all([
  //       dispatch(fetchGetVolumesTariffsIfNeeded()),
  //       dispatch(fetchGetProfileIfNeeded())
  //     ])
  // },
  // {
  //   path: routerLinks.resizeVolume,
  //   exact: true,
  //   component: ResizeVolumePage,
  //   include: true,
  //   loadData: (dispatch: Dispatch) =>
  //     Promise.all([
  //       dispatch(fetchGetVolumesTariffsIfNeeded()),
  //       dispatch(fetchGetProfileIfNeeded())
  //     ])
  // },
  {
    path: routerLinks.account,
    exact: true,
    component: AccountPage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetProfileIfNeeded())])
  },
  {
    path: routerLinks.billing,
    exact: true,
    component: BillingPage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetProfileIfNeeded())])
  },
  {
    path: routerLinks.support,
    exact: true,
    component: SupportPage,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([
        dispatch(fetchGetSupportGroupsIfNeeded()),
        dispatch(fetchGetProfileIfNeeded())
      ])
  },
  {
    path: routerLinks.successTicket,
    exact: true,
    component: SuccessTicket,
    include: true,
    loadData: (dispatch: Dispatch) =>
      Promise.all([dispatch(fetchGetProfileIfNeeded())])
  },
  {
    path: routerLinks.tools,
    exact: true,
    component: Tools,
    include: true
  },
  // {
  //   path: routerLinks.webhook,
  //   component: WebHookInfo
  // },
  {
    path: routerLinks.domains,
    include: true,
    component: DomainsInfo
  },
  {
    path: routerLinks.configmap,
    include: true,
    component: ConfigMapInfo
  },
  {
    path: routerLinks.getConfigMaps,
    include: true,
    component: ConfigMapInfo
  },
  {
    path: routerLinks.getConfigMaps,
    include: true,
    component: ConfigMapInfo
  },
  {
    path: routerLinks.createConfigMap,
    include: true,
    component: ConfigMapInfo
  },
  {
    path: routerLinks.viewConfigMapFiles,
    include: true,
    component: ViewConfigMapsFilesInfo
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
