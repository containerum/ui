/* @flow */

import React from 'react';
import { Route, Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import { routerLinks } from '../../config';
import styles from './styles.scss';

const NotFound = () => (
  <Route
    render={(props: Object) => {
      const { staticContext } = props;
      if (staticContext) {
        staticContext.status = '404';
      }
      return (
        <div>
          <Helmet title="Page not found" />
          <div className={styles.outer}>
            <div className={styles.inner}>
              <h1>404</h1>
              <p>Page not found</p>
              <p>
                We are sorry but the page you are looking for does not exist.{' '}
                <Link className="blue-btn depl-btn" to={routerLinks.dashboard}>
                  Go to Dashboard
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
    }}
  />
);

export default NotFound;
