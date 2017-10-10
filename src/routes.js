import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Forgot from './components/Forgot';
import RecoveryPassword from './components/RecoveryPassword';
import ConfirmEmail from './components/auth/ConfirmEmail';
import ResetPassword from './components/ResetPassword';
import App from './components/App';
import requireAuthentication from './components/auth/require-auth';
import Workloads from './components/Workloads';
import Volumes from './components/Volumes';
import Namespace from './components/Namespace';
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
import NotFound from './components/NotFound';
import Billing from './components/Account/Billing';

import CreateNamespace from './components/CreateNamespace';
import CreateVolume from './components/CreateVolume';
// import CreateDeployment from './components/CreateDeployment';
// import CreateService from './components/CreateService';

export const routes = (
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
            <Route path="/CreateVolume" component={CreateVolume} />
            <Route path="/Support" component={Support} />
            <Route path="/Support/SuccessTicket" component={SuccessTicket} />
            {/*<Route path="/Namespaces/:idName/CreateNewDeployment" component={CreateDeployment} />*/}
            {/*/!*<Route path="/Namespaces/:idName/CreateNewService" component={CreateService} />*!/*/}
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
