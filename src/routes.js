import React from 'react';
import { Route, IndexRoute } from 'react-router';
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
import Pod from './components/Pod';
import NotFound from './components/NotFound';

export const routes = (
    <Route>
        <Route path='/' component={ requireAuthentication(App) }>
            <IndexRoute component={ Workloads } />
            <Route path='/CreateNewDeployment' component={ CreateDeployment } />
            <Route path='/CreateNewService' component={ CreateService } />
            <Route path='/Deployments/:idDep' component={ Deployment } />
            <Route path={'/Deployments/:idDep/Pods/:idPod'}  component={ Pod }/>
        </Route>
        <Route path='/Login(/:hashParam)' component={ Login }>
            <Route path='/' component={ Workloads } />
        </Route>
        <Route path='/Forgot' component={ Forgot } />
        <Route path='/SignUp' component={ SignUp } />
        <Route path='/ConfirmEmail' component={ ConfirmEmail } />
        <Route path='*' component={NotFound} />
    </Route>
);
