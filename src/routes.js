import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Workloads from './components/Workloads';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Forgot from './components/Forgot';
import requireAuthentication from './components/auth/require-auth';
import ConfirmEmail from './components/auth/ConfirmEmail';
import CreateDeployment from './components/CreateDeployment';
import CreateService from './components/CreateService';
import Deployment from './components/Deployment';
import Service from './components/Service';
import Pod from './components/Pod';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import Support from './components/Support';

export const routes = (
    <Route>
        <Route path='/' component={ requireAuthentication(App) }>
            <Route path='/Namespaces/:idName' component={ Workloads } />
            <Route path='/Namespaces/:idName/Deployments/:idDep' component={ Deployment } />
            <Route path='/Namespaces/:idName/Services/:idService' component={ Service } />
            <Route path='/Namespaces/:idName/Deployments/:idDep/Pods/:idPod'  component={ Pod } />
            <Route path='/CreateNewDeployment' component={ CreateDeployment } />
            <Route path='/CreateNewService' component={ CreateService } />
            <Route path='/Profile' component={ Profile } />
            <Route path='/Support' component={ Support } />
        </Route>
        <Route path='/Login' component={ Login }>
            <Route path='/' component={ Workloads } />
        </Route>
        <Route path='/Forgot' component={ Forgot } />
        <Route path='/SignUp' component={ SignUp } />
        <Route path='/ConfirmEmail' component={ ConfirmEmail } />
        <Route path='*' component={NotFound} />
    </Route>
);
