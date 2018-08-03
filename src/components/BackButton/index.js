/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';

import { routerLinks } from '../../config';

type Props = {
  path: string
};

const BackButton = ({ path }: Props) => (
  <div
    style={{
      position: 'absolute',
      top: 30,
      left: 110,
      zIndex: 1000
    }}
  >
    <Link
      to={path || routerLinks.index}
      id="back"
      className="btn btn-outline-primary"
    >
      <i
        className="material-icons"
        style={{
          verticalAlign: 'text-top'
        }}
      >
        arrow_back_ios
      </i>
      Back
    </Link>
  </div>
);

export default BackButton;
