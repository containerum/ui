/* @flow */

import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';

import { routerLinks } from '../../config';

const Home = () => (
  <div>
    <Helmet title="Containerum" />
    <Switch>
      <Redirect from="/" to={routerLinks.dashboard} />
    </Switch>
  </div>
);

export default Home;
