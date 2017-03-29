import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { browserHistory } from 'react-router';
import App from './containers/App';
import Workloads from './components/Workloads';
import Deployments from './components/Deployments';
import ReplicaSets from './components/ReplicaSets';
import Pods from './components/Pods';
import Services from './components/Services';
import Storage from './components/Storage';
import Volume from './components/Volume';
import Config from './components/Config';
import Secrets from './components/Secrets';
import Tokens from './components/Tokens';
import Profile from './components/Profile';
import Billing from './components/Profile/Billing';
import Referrals from './components/Profile/Referrals';
import Logout from './components/auth/Login/app';
import Signup from './components/auth/SignUp/app';
import Forgot from './components/Forgot';
import Deployments_1 from './components/Deployments/investedDeployments';
import ReplicaSets_1 from './components/ReplicaSets/investedReplicaSets';
import Pods_1 from './components/Pods/investedPods';
import Services_1 from './components/Services/investedServices';
import Volume_1 from './components/Volume/volume_1';
import Secrets_1 from './components/Secrets/investedSecrets';
import Tokens_1 from './components/Tokens/tokens_1';

export const routes = (
  <div>
    <Route path='/' component={App}>
      <IndexRoute component={Workloads} />
      <Route path='/Deployments/:deployments_1' component={Deployments_1} />
      <Route path='/ReplicaSets/:replicasets_1' component={ReplicaSets_1} />
      <Route path='/Pods/:pods_1' component={Pods_1} />
      <Route path='/Services/:services_1' component={Services_1} />
      <Route path='/Volume/:volume_1' component={Volume_1} />
      <Route path='/Secrets/:secrets_1' component={Secrets_1} />
      <Route path='/Tokens/:tokens_1' component={Tokens_1} />
      <Route path='/Deployments' component={Deployments} />
      <Route path='/ReplicaSets' component={ReplicaSets} />
      <Route path='/Pods' component={Pods} />
      <Route path='/Services' component={Services} />
      <Route path='/Storage' component={Storage} />
      <Route path='/Volume' component={Volume} />
      <Route path='/Config' component={Config} />
      <Route path='/Secrets' component={Secrets} />
      <Route path='/Tokens' component={Tokens} />
      <Route path='/Profile' component={Profile} />
      <Route path='/Billing' component={Billing} />
      <Route path='/Referrals' component={Referrals} />
    </Route>
    <Route path='/Login' component={Logout}>
      <Route path='/' path={browserHistory.push('/')} component={Workloads} />
     </Route>
     <Route path='/Forgot' component={Forgot}/>
     <Route path='/Signup' component={Signup}/>
  </div>
);
