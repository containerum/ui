/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';

import { routerLinks } from '../../config';

import dashboardStyles from '../../containers/Dashboard/index.scss';

const dashboardClassName = className.bind(dashboardStyles);

const blockClassName = dashboardClassName('blockContainer', 'blockHTabs');

type Props = {
  resources: Object,
  configmaps: Object,
  linkToDeployment: string,
  role: string,
  namespacesReducerLength: number
};

const DashboardBlockTourAndNews = ({
  resources,
  configmaps,
  linkToDeployment,
  role,
  namespacesReducerLength
}: Props) => (
  <div className="col-md-3 pr-0">
    <div className={blockClassName}>
      <div className={`${dashboardStyles.topBlockHeader} pb-0`}>
        <ul
          className="nav nav-pills mb-0 "
          id="pills-tab"
          role="tablist"
          style={{ marginBottom: '10px' }}
        >
          <li className="nav-item">
            <div
              className={`nav-link ${dashboardStyles.customNavLink} active `}
              id="tour-tab"
              data-toggle="pill"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              TOUR
            </div>
          </li>
          {/* <li className="nav-item"> */}
          {/* <a */}
          {/* className="nav-link" */}
          {/* id="news-tab" */}
          {/* data-toggle="pill" */}
          {/* href="#news" */}
          {/* role="tab" */}
          {/* aria-controls="devops-profile" */}
          {/* aria-selected="false" */}
          {/* > */}
          {/* NEWS */}
          {/* </a> */}
          {/* </li> */}
        </ul>
      </div>

      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="tour"
          role="tabpanel"
          aria-labelledby="first-tab"
        >
          {!namespacesReducerLength && role === 'user' ? (
            <div className={dashboardStyles.tourWrapper}>
              You don`t have permission to projects
            </div>
          ) : (
            <div className={dashboardStyles.tourWrapper}>
              {role === 'admin' && (
                <Link
                  className={
                    linkToDeployment ? dashboardStyles.tourLinkDisabled : ''
                  }
                  to={routerLinks.createCustomNamespace}
                >
                  Create Project
                </Link>
              )}
              {/* <Link to="/createVolume">Create Volume</Link> */}
              <Link
                className={
                  resources.deployments !== 0
                    ? dashboardStyles.tourLinkDisabled
                    : ''
                }
                to={
                  linkToDeployment
                    ? routerLinks.createDeploymentLink(linkToDeployment)
                    : role === 'admin'
                      ? routerLinks.createCustomNamespace
                      : routerLinks.dashboard
                }
              >
                Launch 1st Deployment
              </Link>
              <Link
                className={
                  resources.external_services !== 0 ||
                  resources.internal_services !== 0
                    ? dashboardStyles.tourLinkDisabled
                    : ''
                }
                to={
                  linkToDeployment
                    ? routerLinks.createServiceLink(linkToDeployment)
                    : role === 'admin'
                      ? routerLinks.createCustomNamespace
                      : routerLinks.dashboard
                }
              >
                Launch 1st Service
              </Link>
              <Link
                className={
                  configmaps.data.length > 0
                    ? dashboardStyles.tourLinkDisabled
                    : ''
                }
                to={routerLinks.configmap}
              >
                Launch 1st ConfigMap
              </Link>
            </div>
          )}

          {/* <div */}
          {/* className="tab-pane fade" */}
          {/* id="news" */}
          {/* role="tabpanel" */}
          {/* aria-labelledby="second-tab" */}
          {/* > */}
          {/* <div className="news-wrapper"> */}
          {/* <div className="release"> */}
          {/* <span className="overflow-wrapper"> */}
          {/* New CLI tool v.2.14.62 ready to use. Downlad it from the{' '} */}
          {/* <a href="##">CLI Page to complete experience</a> test test */}
          {/* test */}
          {/* </span> */}
          {/* </div> */}
          {/* <div className="news"> */}
          {/* <span className="overflow-wrapper"> */}
          {/* New CLI tool v.2.14.62 ready to use. Downlad it from the{' '} */}
          {/* <a href="##">CLI</a> */}
          {/* </span> */}
          {/* </div> */}
          {/* <div className="news"> */}
          {/* <span className="overflow-wrapper">Happy New Year!</span> */}
          {/* </div> */}
          {/* <div className="release"> */}
          {/* <span className="overflow-wrapper"> */}
          {/* New CLI tool v.2.14.62 ready to use. Downlad it from the{' '} */}
          {/* <a href="##">CLI Page to complete experience</a> */}
          {/* </span> */}
          {/* </div> */}
          {/* <div className="release"> */}
          {/* <span className="overflow-wrapper"> */}
          {/* New CLI tool v.2.14.62 ready to use. Downlad it from the{' '} */}
          {/* <a href="##">CLI Page to complete experience</a> */}
          {/* </span> */}
          {/* </div> */}
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  </div>
);

export default DashboardBlockTourAndNews;
