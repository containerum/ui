/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from '../../containers/Namespaces/index.scss';

import { routerLinks } from '../../config';
import deployment from '../../images/deployment.png';

type Props = {
  data: Array<Object>,
  history: Object,
  handleDeleteNamespace: (idName: string) => void
};

const NamespacesList = ({ data, history, handleDeleteNamespace }: Props) => {
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
  const classNameContainer = styleNamespaces(
    'contentBlockContainer',
    'containerCard',
    'hoverAction'
  );
  const classNameContainerHeader = styleNamespaces(
    'contentBlockHeaderLabelText',
    'contentBlockHeaderLabelMain'
  );
  const classNameCardBlock = styleNamespaces(
    'contentBlockContent',
    'contentBlockContentCardBlock'
  );
  const addNewBlockClassName = styleNamespaces(
    'hoverAction',
    'contentBlockContent',
    'containerCard'
  );
  const ellipsisClassName = styleNamespaces('contentBlockHeaderEllipsis');
  return (
    <div className="row double">
      {data &&
        data.map(namespace => {
          const { label, access } = namespace;
          const { memory, cpu } = namespace.resources.used;
          const {
            memory: memoryLimit,
            cpu: cpuLimit
          } = namespace.resources.hard;
          const id = label;
          const accessStyleName = access[0].toUpperCase() + access.slice(1);
          const classNameBadge = styleNamespaces({
            [`namespaceInfoBadge${accessStyleName}`]: true
          });
          return (
            <div className="col-md-4" id={id} key={id}>
              <div
                onClick={() => handleClickGetNamespace(label)}
                onKeyPress={() => handleClickGetNamespace(label)}
                className={classNameContainer}
                role="link"
                tabIndex={0}
              >
                <div className={styles.contentBlockHeader}>
                  <div className={styles.contentBlockHeaderLabel}>
                    <div
                      style={{ display: 'inline-block' }}
                      className={styles.contentBlockHeaderImg}
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
                    className={styles.contentBlockHeaderExtraPanel}
                    onClick={e => handleClose(e)}
                    onKeyPress={e => handleClose(e)}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <div
                      className={`${
                        styles.contentBlockHeaderExtraPanel
                      } dropdown no-arrow`}
                    >
                      <i
                        className={`${ellipsisClassName} ion-more dropdown-toggle`}
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      />
                      <ul className="dropdown-menu" role="menu">
                        <NavLink
                          activeClassName="active"
                          className="dropdown-item"
                          to={routerLinks.resizeNamespaceLink(label)}
                        >
                          Resize
                        </NavLink>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleClickDeleteNamespace(label)}
                          onKeyPress={() => handleClickDeleteNamespace(label)}
                        >
                          Delete
                        </button>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={classNameCardBlock}>
                  <div className={styles.contentBlockInfoItem}>
                    <div className={`${styles.contentBlockInfoName} inline`}>
                      RAM ( Usage / Total ) :&nbsp;
                    </div>
                    <div className={`${styles.contentBlockInfoText} inline`}>
                      {memory} / {memoryLimit}
                    </div>
                  </div>
                  <div className={styles.contentBlockInfoItem}>
                    <div className={`${styles.contentBlockInfoName} inline`}>
                      CPU ( Usage / Total ) :&nbsp;
                    </div>
                    <div className={`${styles.contentBlockInfoText} inline`}>
                      {cpu} / {cpuLimit}
                    </div>
                  </div>
                  <div className={styles.contentBlockInfoItem}>
                    <div className={`${styles.contentBlockInfoName} inline`}>
                      Volume ( Usage / Total ) :&nbsp;
                    </div>
                    <div className={`${styles.contentBlockInfoText} inline`}>
                      - / -
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <div className="col-md-4 align-middle">
        <NavLink
          activeClassName="active"
          to={routerLinks.createNamespace}
          className={`${addNewBlockClassName} add-new-block`}
        >
          <div className="action">
            <i>+</i> Add a namespace
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default NamespacesList;
