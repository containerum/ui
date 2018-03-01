/* @flow */

import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';

const Home = () => (
  <div>
    <Helmet title="Containerum" />
    <Switch>
      <Redirect from="/" to="/namespaces" />
    </Switch>
  </div>
);

export default Home;
