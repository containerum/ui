/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';

import { routerLinks } from '../../config';

type Props = {
  linkToDeployment: string
};

const DashboardBlockTourAndNews = ({ linkToDeployment }: Props) => (
  <div className="col-md-3 pr-0">
    <div className="block-container block-h-tabs">
      <div className="top-block-header pb-0">
        <ul
          className="nav nav-pills"
          id="pills-tab"
          role="tablist"
          style={{ marginBottom: '10px' }}
        >
          <li className="nav-item">
            <div
              className="nav-link active"
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
          <div className="tour-wrapper">
            <Link to="/billing">Top up your Balance or enter Promo code</Link>
            <Link to="/createNamespace">Create Namespace</Link>
            <Link to="/createVolume">Create Volume</Link>
            <Link
              to={
                linkToDeployment
                  ? routerLinks.createDeploymentLink(linkToDeployment)
                  : 'createNamespace'
              }
            >
              Launch 1st Deployment
            </Link>
            {/* <Link to="/">Launch 1st Service with DNS</Link> */}
            <Link to="/account">
              Set up Web Hooks for Continuous Deployment
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
