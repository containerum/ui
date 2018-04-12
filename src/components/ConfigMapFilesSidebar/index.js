/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash/fp';

import { routerLinks } from '../../config';

type Props = {
  configMapsFileData: Array,
  currentNamespace: string,
  idCnf: string,
  currentConfigMapName: string
};

const ConfigMapFilesSidebar = ({
  configMapsFileData,
  currentNamespace,
  idCnf,
  currentConfigMapName
}: Props) => (
  <ul className="account-menu nav nav-list">
    <li>
      <div className="nav-root-item">{idCnf}</div>
      <ul
        style={{
          padding: '27px 0px 0px 20px',
          listStyleType: 'none'
        }}
      >
        {Object.keys(configMapsFileData).map(file => (
          <Link
            key={_.uniqueId()}
            to={routerLinks.viewConfigMapFilesLink(
              currentNamespace,
              currentConfigMapName,
              file
            )}
          >
            <li style={{ paddingBottom: '15px' }}>
              <div className="configmapView__list-item">{file}</div>
            </li>
          </Link>
        ))}
      </ul>
    </li>
  </ul>
);

export default ConfigMapFilesSidebar;
