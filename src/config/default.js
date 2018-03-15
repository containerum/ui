module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  webApi: process.env.WEB_API || 'https://web.api.containerum.io:5000',
  // webApi: process.env.WEB_API || 'http://192.168.88.200:5000',
  webApiLoginGroup:
    process.env.WEB_API_OTHER || 'https://web.api.containerum.io:5000',
  // webApiLoginGroup: process.env.WEB_API_OTHER || 'http://192.168.88.200:5000',
  webApiLogin: process.env.WEB_API_LOGIN || 'https://api.containerum.io:8082',
  // webApiLogin: process.env.WEB_API_LOGIN || 'https://192.168.88.200:8082',
  // webApiLogin: process.env.WEB_API_LOGIN || 'https://192.168.88.59:8082',
  wsApi: process.env.WS_API || 'wss://api.containerum.io:8082',
  // wsApi: process.env.WS_API || 'wss://192.168.88.200:8082',
  // wsApi: process.env.WS_API || 'wss://192.168.88.59:8082',
  appRecaptcha:
    process.env.RECAPTCHA || '6LejdSMUAAAAADNv4yBEqxz4TAyXEIYCbwphVSDS',
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
    login: '/login',
    signUp: '/signUp',
    confirmEmail: '/confirmEmail',
    forgot: '/forgot',
    checkEmail: '/checkEmail',
    recoveryPassword: '/recoveryPassword',
    namespaces: '/namespaces',
    namespace: '/namespaces/:idName',
    namespaceLink: (idName: string) => `/namespaces/${idName}/deployments`,
    createNamespace: '/createNamespace',
    resizeNamespace: '/namespace/:idName/resize',
    resizeNamespaceLink: (idName: string) => `/namespace/${idName}/resize`,
    volumes: '/volumes',
    createVolume: '/createVolume',
    resizeVolume: '/volume/:idVol/resize',
    resizeVolumeLink: (idVol: string) => `/volume/${idVol}/resize`,
    getDeployments: '/namespaces/:idName/deployments',
    getDeploymentsLink: (idName: string) => `/namespaces/${idName}/deployments`,
    getDeployment: '/namespace/:idName/deployments/:idDep',
    getDeploymentLink: (idName: string, idDep: string) =>
      `/namespace/${idName}/deployments/${idDep}/pods`,
    createDeployment: '/namespace/:idName/createDeployment',
    createDeploymentLink: (idName: string) =>
      `/namespace/${idName}/createDeployment`,
    getPods: '/namespace/:idName/deployments/:idDep/pods',
    getPod: '/namespace/:idName/deployment/:idDep/pods/:idPod',
    getPodLink: (idName: string, idDep: string, idPod: string) =>
      `/namespace/${idName}/deployment/${idDep}/pods/${idPod}`,
    getPodLogs: '/namespace/:idName/deployment/:idDep/pod/:idPod/logs',
    getPodLogsLink: (idName: string, idDep: string, idPod: string) =>
      `/namespace/${idName}/deployment/${idDep}/pod/${idPod}/logs`,
    getServices: '/namespaces/:idName/services',
    getServicesLink: (idName: string) => `/namespaces/${idName}/services`,
    createService: '/namespace/:idName/createService',
    createServiceLink: (idName: string) => `/namespace/${idName}/createService`,
    getService: '/namespace/:idName/services/:idSrv',
    getServiceLink: (idName: string, idSrv: string) =>
      `/namespace/${idName}/services/${idSrv}/ports`,
    getDepInServiceLink: (idName: string, idSrv: string) =>
      `/namespace/${idName}/services/${idSrv}/deployment`,
    resizeDeployment: `/namespace/:idName/updateDeployment/:idDep`,
    resizeDeploymentLink: (idName: string, idDep: string) =>
      `/namespace/${idName}/updateDeployment/${idDep}`,
    resizeService: `/namespace/:idName/updateService/:idSrv`,
    resizeServiceLink: (idName: string, idSrv: string) =>
      `/namespace/${idName}/updateService/${idSrv}`,
    support: '/support',
    successTicket: '/successTicket',
    account: '/account',
    billing: '/billing',
    settings: '/settings'
  },
  externalLinks: {
    documentation: 'https://containerum.com/docs/about',
    fastDeploy: 'https://containerum.com/docs/about',
    helloWorld: 'https://containerum.com/docs/about',
    solutions: 'https://github.com/containerum',
    blog: 'https://blog.containerum.com/',
    startGuide: 'https://containerum.com/docs/start-guide',
    releasesChkit: 'https://github.com/containerum/chkit/releases/latest',
    termsOfService: 'https://containerum.com',
    privacyPolicy: 'https://containerum.com'
  }
};
