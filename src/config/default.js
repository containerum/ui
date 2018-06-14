const apiHost = process.env.API_HOST || 'api.containerum.io';
const apiProtocol = process.env.API_PROTOCOL_TYPE === 'ssl' ? 'https' : 'http';
const apiWSProtocol = process.env.API_PROTOCOL_TYPE === 'ssl' ? 'wss' : 'ws';
const apiPort = process.env.API_PORT;
const api = `${apiProtocol}://${apiHost}${apiPort ? `:${apiPort}` : ''}`;
const apiWS = `${apiWSProtocol}://${apiHost}${apiPort ? `:${apiPort}` : ''}`;

module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  webApi: api,
  wsApi: apiWS,
  // webApi: 'http://192.168.88.210:8082',
  // wsApi: 'wss://192.168.88.210:8082',
  // webApi: 'https://api.containerum.io:8082',
  // wsApi: 'wss://api.containerum.io:8082',
  appRecaptcha: process.env.RECAPTCHA || null,
  sourceType: process.env.SOURCE_TYPE || 'OFFLINE',
  defaultCountry: process.env.COUNTRY || 'US',
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Cloud Docker Hosting for Fast Deploy',
    titleTemplate: '%s | Containerum',
    meta: [
      {
        name: 'description',
        content: 'Cloud Docker Hosting for Fast Deploy'
      }
    ]
  },
  routerLinks: {
    index: '/',
    dashboard: '/dashboard',
    solutions: '/solutions',
    solution: '/solution/:idSol',
    solutionLink: (idSol: string) => `/solution/${idSol}`,
    login: '/login',
    tools: '/tools',
    domains: '/domains',
    webhook: '/webhook',
    configmap: '/configmap',
    signUp: '/signUp',
    confirmEmail: '/confirmEmail',
    forgot: '/forgot',
    checkEmail: '/checkEmail',
    recoveryPassword: '/recoveryPassword',
    namespaces: '/projects',
    namespace: '/projects/:idName',
    namespaceLink: (idName: string) => `/projects/${idName}/deployments`,
    namespaceDomains: '/projects/:idName/ingresses',
    namespaceDomainsLink: (idName: string) => `/projects/${idName}/ingresses`,
    createNamespace: '/createProject',
    createCustomNamespace: '/createCustomProject',
    resizeCustomNamespace: '/resizeCustomProject/:idName',
    resizeCustomNamespaceLink: (idName: string) =>
      `/resizeCustomProject/${idName}`,
    resizeNamespace: '/project/:idName/resize',
    resizeNamespaceLink: (idName: string) => `/project/${idName}/resize`,
    getVolumes: '/projects/:idName/volumes',
    getVolumesLink: (idName: string) => `/projects/${idName}/volumes`,
    createVolume: '/project/:idName/createVolume',
    createVolumeLink: (idName: string) => `/project/${idName}/createVolume`,
    resizeVolume: '/project/:idName/resizeVolume/:idVol',
    resizeVolumeLink: (idName: string, idVol: string) =>
      `/project/${idName}/resizeVolume/${idVol}`,
    getDeployments: '/projects/:idName/deployments',
    getDeploymentsLink: (idName: string) => `/projects/${idName}/deployments`,
    getDeployment: '/project/:idName/deployments/:idDep',
    getDeploymentLink: (idName: string, idDep: string) =>
      `/project/${idName}/deployments/${idDep}/pods`,
    getMembership: '/project/:idName/membership',
    getMembershipLink: (idName: string) => `/project/${idName}/membership`,
    // getGroups: '/project/:idName/groups',
    // getGroupsLink: (idName: string) => `/project/${idName}/groups`,
    getGlobalMembership: '/membership/users',
    getGlobalGroups: '/membership/groups',
    getGroup: '/membership/group/:idGroup',
    getGroupLink: (idGroup: string) => `/membership/group/${idGroup}`,
    createDeployment: '/project/:idName/createDeployment',
    createDeploymentLink: (idName: string) =>
      `/project/${idName}/createDeployment`,
    getPods: '/project/:idName/deployments/:idDep/pods',
    getPod: '/project/:idName/deployment/:idDep/pods/:idPod',
    getPodLink: (idName: string, idDep: string, idPod: string) =>
      `/project/${idName}/deployment/${idDep}/pods/${idPod}`,
    getPodLogs: '/project/:idName/deployment/:idDep/pod/:idPod/logs',
    getPodLogsLink: (idName: string, idDep: string, idPod: string) =>
      `/project/${idName}/deployment/${idDep}/pod/${idPod}/logs`,
    getServices: '/projects/:idName/services',
    getServicesLink: (idName: string) => `/projects/${idName}/services`,
    createService: '/project/:idName/createService',
    getConfigMaps: '/projects/:idName/configMaps',
    getConfigMapsLink: (idName: string) => `/projects/${idName}/configMaps`,
    createConfigMap: '/project/:idName/createConfigMap',
    createConfigMapLink: (idName: string) =>
      `/project/${idName}/createConfigMap`,
    viewConfigMapFiles: '/project/:idName/configmaps/:idCnf/file/:idFile',
    viewConfigMapFilesLink: (idName: string, idCnf: string, idFile: string) =>
      `/project/${idName}/configMaps/${idCnf}/file/${idFile}`,
    createDomain: '/project/:idName/service/:idSrv/createDomain',
    createDomainLink: (idName: string, idSrv: string) =>
      `/project/${idName}/service/${idSrv}/createDomain`,
    createServiceLink: (idName: string) => `/project/${idName}/createService`,
    createdExternalServiceSuccessful: '/project/:idName/createdService/:idSrv',
    createdExternalServiceSuccessfulLink: (idName: string, idSrv: string) =>
      `/project/${idName}/createdService/${idSrv}`,
    getService: '/project/:idName/services/:idSrv',
    getServiceLink: (idName: string, idSrv: string) =>
      `/project/${idName}/services/${idSrv}/ports`,
    getDepInServiceLink: (idName: string, idSrv: string) =>
      `/project/${idName}/services/${idSrv}/deployment`,
    resizeDeployment: `/project/:idName/updateDeployment/:idDep`,
    resizeDeploymentLink: (idName: string, idDep: string) =>
      `/project/${idName}/updateDeployment/${idDep}`,
    resizeService: `/project/:idName/updateService/:idSrv`,
    resizeServiceLink: (idName: string, idSrv: string) =>
      `/project/${idName}/updateService/${idSrv}`,
    support: '/support',
    successTicket: '/successTicket',
    account: '/account',
    billing: '/billing',
    settings: '/settings'
  },
  externalLinks: {
    exonLV: 'http://exon.lv',
    documentation: 'https://docs.containerum.com/docs/about',
    fastDeploy: 'https://docs.containerum.com/how-to',
    helloWorld:
      'https://docs.containerum.com/how-to/?_ga=2.48830502.1413750744.1528358625-1916900540.1524062321',
    solutions: 'https://github.com/containerum',
    blog: 'https://medium.com/@containerum',
    startGuide: 'https://docs.containerum.com/docs/start-guide',
    releasesChkit: 'https://github.com/containerum/chkit/releases/latest',
    termsOfService: 'https://containerum.com/terms',
    privacyPolicy: 'https://containerum.com/policy'
  }
};
