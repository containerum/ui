/* @flow */

import React from 'react';
import { Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';
// import _ from 'lodash/fp';
import cookie from 'react-cookies';

import config from '../../config';
import RouteWithSubRoutes from '../../components/RouteWithSubRoutes';
import routes from '../../routes';
// Import your global styles here
import '../../theme/normalize.css';
import '../../theme/style.css';
import '../../theme/style-custom.css';
import '../../theme/custom.css';
import '../../theme/individual.css';

const App = () => {
  if (
    typeof window !== 'undefined' &&
    typeof window.navigator !== 'undefined'
  ) {
    const options = {
      excludeScreenResolution: true,
      excludeAvailableScreenResolution: true,
      excludeCanvas: true,
      excludeWebGL: true,
      excludeWebGLVendorAndRenderer: true
    };
    const Fingerprint2 = require('fingerprintjs2');
    new Fingerprint2(options).get(print => {
      // console.log(print, JSON.stringify(obj), obj);
      cookie.save('browser', print, { path: '/' });
    });
  }

  return (
    <div>
      <Helmet {...config.app} />
      <div className="wrapper">
        <Switch>{routes.map(route => RouteWithSubRoutes(route))}</Switch>
      </div>
    </div>
  );
};

export default hot(module)(App);
