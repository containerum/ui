/* @flow */

import React from 'react';

import { Route } from 'react-router-dom';
import _ from 'lodash/fp';
import LoadingBar from 'react-redux-loading-bar';

import HeaderPage from '../../containers/Header';
import FooterPage from '../../containers/Footer';

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route): Element<typeof Route> => (
  <Route
    key={_.uniqueId()}
    exact={route.exact || false}
    path={route.path}
    render={props => (
      // Pass the sub-routes down to keep nesting
      <div>
        {route.include && (
          <LoadingBar
            style={{
              backgroundColor: '#29abe2',
              height: '2px',
              zIndex: '10000'
            }}
          />
        )}
        {route.include && <HeaderPage />}
        <route.component {...props} routes={route.routes || null} />
        {route.include && <FooterPage />}
      </div>
    )}
  />
);

export default RouteWithSubRoutes;
