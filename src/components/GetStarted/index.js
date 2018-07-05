/* @flow */

import React from 'react';
import Helmet from 'react-helmet';

import SideBarGetStartedContainer from '../../containers/SideBarGetStarted';

type Props = {
  match: Object
};

const GetStarted = ({ match }: Props) => (
  <div>
    <Helmet title="Get Started" />
    <SideBarGetStartedContainer match={match} />
  </div>
);

export default GetStarted;
