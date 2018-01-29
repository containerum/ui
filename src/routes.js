import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import requireAuthentication from './components/auth/require-auth';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Forgot from './components/Forgot';
import RecoveryPassword from './components/RecoveryPassword';
import ConfirmEmail from './components/auth/ConfirmEmail';
import ResetPassword from './components/ResetPassword';
import App from './components/App';
import Workloads from './components/Workloads';
import Namespace from './components/Namespace';
import Volumes from './components/Volumes';
import Deployments from './components/Deployments';
import Services from './components/Services';
import Deployment from './components/Deployment';
import Service from './components/Service';
import Ports from './components/Service/Ports';
import LinkedDeployment from './components/Service/LinkedDeployment';
import Pods from './components/Pods';
import Pod from './components/Pod';
import Support from './components/Support';
import SuccessTicket from './components/Support/SuccessTicket';
import Account from './components/Account';
import Billing from './components/Account/Billing';
import NotFound from './components/NotFound';
import CreateNamespace from './components/CreateNamespace';
import UpdateNamespace from './components/UpdateNamespace';
import CreateVolume from './components/CreateVolume';
import UpdateVolume from './components/UpdateVolume';
import CreateDeployment from './components/CreateDeployment';
import UpdateDeployment from './components/UpdateDeployment';
import CreateService from './components/CreateService';
import UpdateService from './components/UpdateService';

export default (
    <Route>
        <Route path="/" component={requireAuthentication(App)}>
            <IndexRedirect to="Namespaces" />
            <Route path="/Volumes" component={Volumes}/>
            <Route path="/Namespaces" component={Workloads} />
            <Route path="/Namespaces/:idName" component={Namespace}>
                <IndexRedirect to="Deployments" />
                <Route path="Deployments" component={Deployments} />
                <Route path="Services" component={Services} />
            </Route>
            <Route path="/Namespaces/:idName/Deployments/:idDep" component={Deployment}>
                <IndexRoute component={Pods}/>
            </Route>
            <Route path="/Namespaces/:idName/Services/:idService" component={Service}>
                <IndexRedirect to="Ports" />
                <Route path="Ports" component={Ports} />
                <Route path="Deployment" component={LinkedDeployment} />
            </Route>
            <Route path="/Namespaces/:idName/Deployments/:idDep/Pods/:idPod" component={Pod} />
            <Route path="/CreateNamespace" component={CreateNamespace} />
            <Route path="/Namespaces/:idName/Resize" component={UpdateNamespace} />
            <Route path="/Namespaces/:idName/CreateDeployment" component={CreateDeployment} />
            {/*<Route path="/Namespaces/:idName/UpdateDeployment" component={UpdateDeployment} />*/}
            <Route path="/CreateVolume" component={CreateVolume} />
            <Route path="/Volumes/:idVolume/Resize" component={UpdateVolume} />
		    <Route path="/Namespaces/:idName/CreateService" component={CreateService} />
		    {/*<Route path="/Namespaces/:idName/UpdateService" component={UpdateService} />*/}
            <Route path="/Support" component={Support} />
            <Route path="/Support/SuccessTicket" component={SuccessTicket} />
            <Route path="/Account" component={Account} />
            <Route path="/Billing" component={Billing} />
        </Route>
        <Route path="/Login" component={Login}>
            <Route path="/" component={Workloads} />
        </Route>
        <Route path="/login/callback" component={Login} />
        <Route path="/Forgot" component={Forgot} />
        <Route path="/RecoveryPassword" component={RecoveryPassword} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/ConfirmEmail" component={ConfirmEmail} />
        <Route path="/ResetPassword" component={ResetPassword} />
        <Route path="*" component={NotFound} />
    </Route>
);
