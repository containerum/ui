/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from '../../containers/Namespaces/index.scss';
import globalStyles from '../../theme/global.scss';

import { routerLinks, sourceType } from '../../config';
import deployment from '../../images/deployment.png';

type Props = {
  data: Array<Object>,
  role: string,
  history: Object,
  handleDeleteNamespace: (idName: string) => void
};

const NamespacesList = ({
  data,
  role,
  history,
  handleDeleteNamespace
}: Props) => {
  const handleClickGetNamespace = name => {
    history.push(routerLinks.namespaceLink(name));
  };
  const handleClickDeleteNamespace = name => {
    handleDeleteNamespace(name);
  };
  const handleClose = e => {
    e.stopPropagation();
  };
  const styleNamespaces = classNames.bind(styles);
  const globalStyleNamespaces = classNames.bind(globalStyles);
  const classNameContainer = globalStyleNamespaces(
    'contentBlockContainer',
    'containerCard',
    'hoverAction'
  );
  const classNameContainerHeader = globalStyleNamespaces(
    'contentBlockHeaderLabelText',
    'contentBlockHeaderLabelMain'
  );
  const classNameCardBlock = globalStyleNamespaces(
    'contentBlockContent',
    'contentBlockContentCardBlock'
  );
  const addNewBlockClassName = globalStyleNamespaces(
    'hoverAction',
    'contentBlockContent',
    'containerCard'
  );
  const isOnline = sourceType === 'ONLINE';
  // console.log('data', data);
  return (
    <div className="row double">
      {data &&
        data.map(namespace => {
          const { label, id, access, resources } = namespace;
          const { memory, cpu } = resources.used;
          const { memory: memoryLimit, cpu: cpuLimit } = resources.hard;
          const accessStyleName = access[0].toUpperCase() + access.slice(1);
          const classNameBadge = styleNamespaces({
            [`namespaceInfoBadge${accessStyleName}`]: true
          });
          return (
            <div className="col-md-4" id={id} key={id}>
              <div
                onClick={() => handleClickGetNamespace(id)}
                onKeyPress={() => handleClickGetNamespace(id)}
                className={classNameContainer}
                role="link"
                tabIndex={0}
              >
                <div className={globalStyles.contentBlockHeader}>
                  <div className={globalStyles.contentBlockHeaderLabel}>
                    <div
                      style={{ display: 'inline-block' }}
                      className={globalStyles.contentBlockHeaderImg}
                    >
                      <img src={deployment} alt="ns-icon" />
                    </div>
                    <div
                      style={{ display: 'inline-block', maxWidth: 70 }}
                      className={`badge ${
                        styles.namespaceInfoBadge
                      } ${classNameBadge}`}
                    >
                      {access}
                    </div>
                    <div
                      style={{ display: 'block' }}
                      className={classNameContainerHeader}
                    >
                      {label}
                    </div>
                  </div>
                  <div
                    className={globalStyles.contentBlockHeaderExtraPanel}
                    onClick={e => handleClose(e)}
                    onKeyPress={e => handleClose(e)}
                    role="menuitem"
                    tabIndex={0}
                  >
                    {(role === 'admin' || access === 'owner') && (
                      <div
                        className={`${
                          globalStyles.contentBlockHeaderExtraPanel
                        } dropdown no-arrow`}
                      >
                        <i
                          className={`${
                            globalStyles.contentBlockHeaderEllipsis
                          } ${globalStyles.dropdownToggle}
                          ${globalStyles.ellipsisRoleMore} ion-more `}
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
                          {isOnline &&
                            role === 'user' && (
                              <NavLink
                                activeClassName="active"
                                className={`dropdown-item ${
                                  globalStyles.dropdownItem
                                }`}
                                to={routerLinks.resizeNamespaceLink(id)}
                              >
                                Resize
                              </NavLink>
                            )}
                          {role === 'admin' && (
                            <NavLink
                              activeClassName="active"
                              className={`dropdown-item ${
                                globalStyles.dropdownItem
                              }`}
                              to={routerLinks.resizeCustomNamespaceLink(id)}
                            >
                              Resize
                            </NavLink>
                          )}
                          <button
                            className={`dropdown-item ${
                              globalStyles.dropdownItem
                            } text-danger`}
                            onClick={() => handleClickDeleteNamespace(id)}
                            onKeyPress={() => handleClickDeleteNamespace(id)}
                          >
                            Delete
                          </button>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className={classNameCardBlock}>
                  <div className={globalStyles.contentBlockInfoItem}>
                    <div
                      className={`${globalStyles.contentBlockInfoName} inline`}
                    >
                      RAM ( Usage / Total ) :&nbsp;
                    </div>
                    <div
                      className={`${globalStyles.contentBlockInfoText} inline`}
                    >
                      {memory} / {memoryLimit}
                    </div>
                  </div>
                  <div className={globalStyles.contentBlockInfoItem}>
                    <div
                      className={`${globalStyles.contentBlockInfoName} inline`}
                    >
                      CPU ( Usage / Total ) :&nbsp;
                    </div>
                    <div
                      className={`${globalStyles.contentBlockInfoText} inline`}
                    >
                      {cpu} / {cpuLimit}
                    </div>
                  </div>
                  <div className={globalStyles.contentBlockInfoItem}>
                    <div
                      className={`${globalStyles.contentBlockInfoName} inline`}
                    >
                      Volume ( Usage / Total ) :&nbsp;
                    </div>
                    <div
                      className={`${globalStyles.contentBlockInfoText} inline`}
                    >
                      - / -
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {isOnline &&
        role === 'user' && (
          <div className="col-md-4 align-middle">
            <NavLink
              activeClassName="active"
              to={routerLinks.createNamespace}
              className={`${addNewBlockClassName} ${styles.addNewBlock}`}
            >
              <div className={styles.action}>
                <i>+</i> Add a namespace
              </div>
            </NavLink>
          </div>
        )}
      {role === 'admin' && (
        <div className="col-md-4 align-middle">
          <NavLink
            activeClassName="active"
            to={routerLinks.createCustomNamespace}
            className={`${addNewBlockClassName} ${styles.addNewBlock}`}
          >
            <div className={styles.action}>
              <i>+</i> Add a namespace
            </div>
          </NavLink>
        </div>
      )}
      {!isOnline &&
        !data.length &&
        role === 'user' && (
          <div className="col-md-4 align-middle">
            <div className="content-block-container card-container hover-action">
              You don`t have permission to namespaces. Contact the administrator
              to obtain permission.
            </div>
          </div>
        )}
    </div>
  );
};

export default NamespacesList;
