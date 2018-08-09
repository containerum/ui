/* @flow */

import React from 'react';
import className from 'classnames/bind';

import globalStyles from '../../theme/global.scss';

const globalClass = className.bind(globalStyles);
const containerClassName = globalClass(
  'contentBlockStatistic',
  'contentBlockContainer'
);
const textLabelClassName = globalClass(
  'contentBlockHeaderLabelText',
  'contentBlockHeaderLabelMain'
);
const headerLabelClassName = globalClass(
  'contentBlockHeaderLabel',
  'contentBlockHeaderLabelSecretInfo'
);

type Props = {
  dataSecret: Object,
  idSecret: string,
  handleDeleteSecret: (idSecret: string) => void
};

const SecretInfo = ({ dataSecret, idSecret, handleDeleteSecret }: Props) => {
  const { data, name } = dataSecret;
  const { auths } = JSON.parse(data['.dockerconfigjson']);
  const url = Object.keys(auths)[0];
  return (
    <div className={`${containerClassName} container`}>
      <div className={globalStyles.contentBlockHeader}>
        <div className={headerLabelClassName}>
          <div className={textLabelClassName}>{name}</div>
          <div className={globalStyles.contentBlockHeaderLabelDescript}>
            {url}
          </div>
        </div>
        <div className={globalStyles.contentBlockHeaderExtraPanel}>
          <div
            className={`${
              globalStyles.contentBlockHeaderExtraPanel
            } dropdown no-arrow`}
          >
            <i
              className={`${globalStyles.contentBlockHeaderEllipsis} ${
                globalStyles.dropdownToggle
              } ${globalStyles.ellipsisRoleMore} ion-more `}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
            <ul
              className={` dropdown-menu dropdown-menu-right ${
                globalStyles.dropdownMenu
              }`}
              role="menu"
            >
              <button
                className={`dropdown-item ${
                  globalStyles.dropdownItem
                } text-danger`}
                onClick={() => handleDeleteSecret(idSecret)}
              >
                Delete
              </button>
            </ul>
          </div>
        </div>
      </div>
      {Object.keys(auths[url]).map(auth => (
        <div>
          <span>{auth}</span>&nbsp;
          <span>{auths[url][auth]}</span>
        </div>
      ))}
    </div>
  );
};

export default SecretInfo;
