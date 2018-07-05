/* @flow */

import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';

type Props = {
  location: Object
};

const accessToken = cookie.load('accessToken');
const Home = ({ location }: Props) => (
  <div>
    <Helmet title="Containerum" />
    {accessToken ? (
      <Switch>
        <Redirect from={location.pathname} to={routerLinks.dashboard} />
      </Switch>
    ) : (
      <Switch>
        <Redirect from={location.pathname} to={routerLinks.login} />
      </Switch>
    )}
  </div>
);

export default Home;
