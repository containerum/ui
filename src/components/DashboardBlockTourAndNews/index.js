/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';

import { routerLinks } from '../../config';

import dashboardStyles from '../../containers/Dashboard/index.scss';

const dashboardClassName = className.bind(dashboardStyles);

const blockClassName = dashboardClassName('blockContainer', 'blockHTabs');

type Props = {
  linkToDeployment: string,
  linkToManageTeam: string
};

const DashboardBlockTourAndNews = ({
  linkToDeployment,
  linkToManageTeam
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
          <div className={dashboardStyles.tourWrapper}>
            <Link to="/billing">Top up your Balance or enter Promo code</Link>
            <Link to="/createNamespace">Create Namespace</Link>
          <div className="tour-wrapper">
            <Link
              className={balance !== 0 ? 'tour-link-disabled' : ''}
              to="/billing"
            >
              Top up your Balance or enter Promo code
            </Link>
            <Link
              className={namespaces.length ? 'tour-link-disabled' : ''}
              to="/createNamespace"
            >
              Create Namespace
            </Link>
            {/* <Link to="/createVolume">Create Volume</Link> */}
            <Link
              className={
                resources.deployments !== 0 ? 'tour-link-disabled' : ''
              }
              to={
                linkToDeployment
                  ? routerLinks.createDeploymentLink(linkToDeployment)
                  : '/createNamespace'
              }
            >
              Launch 1st Deployment
            </Link>
            <Link
              className={
                resources.external_services !== 0 ||
                resources.internal_services !== 0
                  ? 'tour-link-disabled'
                  : ''
              }
              to={
                linkToDeployment
                  ? routerLinks.createServiceLink(linkToDeployment)
                  : '/createNamespace'
              }
            >
              Launch 1st Service
            </Link>
            <Link to="/configmap">Launch 1st ConfigMap</Link>
            {/* <Link to="/account"> */}
            {/* Set up Web Hooks for Continuous Deployment */}
            {/* </Link> */}
            <Link
              to={
                linkToManageTeam
                  ? routerLinks.getMembershipLink(linkToManageTeam.label)
                  : '/'
              }
              style={
                linkToManageTeam
                  ? {}
                  : { color: '#cecece', cursor: 'not-allowed' }
              }
            >
              Share Namespace with your team
            </Link>
          </div>
        </div>
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
);

export default DashboardBlockTourAndNews;
