/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';

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
  return (
    <div className="row double">
      {data.map(namespace => {
        const {
          name,
          volume_size: volumeSize,
          volume_used: volumeUsed,
          memory,
          memory_limit: memoryLimit,
          cpu,
          cpu_limit: cpuLimit
        } = namespace;
        const id = name;
        return (
          <div className="col-md-4" id={id} key={id}>
            <div
              onClick={() => handleClickGetNamespace(name)}
              onKeyPress={() => handleClickGetNamespace(name)}
              className="content-block-container card-container hover-action"
              role="link"
              tabIndex={0}
            >
              <div className="content-block-header">
                <div className="content-block-header-label">
                  <div className="content-block-header-img">
                    <img src={deployment} alt="ns-icon" />
                  </div>
                  <div className="content-block-header-label__text content-block-header-label_main">
                    {name}
                  </div>
                </div>
                <div
                  className="content-block-header-extra-panel"
                  onClick={e => handleClose(e)}
                  onKeyPress={e => handleClose(e)}
                  role="menuitem"
                  tabIndex={0}
                >
                  <div className="content-block-header-extra-panel dropdown no-arrow">
                    <i
                      className="content-block-header__more ion-more dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    />
                    <ul
                      className="dropdown-menu dropdown-menu-right"
                      role="menu"
                    >
                      <NavLink
                        activeClassName="active"
                        className="dropdown-item"
                        to={routerLinks.resizeNamespaceLink(name)}
                      >
                        Resize
                      </NavLink>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => handleClickDeleteNamespace(name)}
                        onKeyPress={() => handleClickDeleteNamespace(name)}
                      >
                        Delete
                      </button>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="content-block-content card-block">
                <div className="content-block__info-item ">
                  <div className="content-block__info-name inline">
                    RAM ( Usage / Total ) :&nbsp;
                  </div>
                  <div className="content-block__info-text inline">
                    {memory} / {memoryLimit} MB
                  </div>
                </div>
                <div className="content-block__info-item">
                  <div className="content-block__info-name inline">
                    CPU ( Usage / Total ) :&nbsp;
                  </div>
                  <div className="content-block__info-text inline">
                    {cpu} / {cpuLimit} m
                  </div>
                </div>
                <div className="content-block__info-item">
                  <div className="content-block__info-name inline">
                    Volume ( Usage / Total ) :&nbsp;
                  </div>
                  <div className="content-block__info-text inline">
                    {volumeUsed || '-'} / {volumeSize || '-'}{' '}
                    {volumeSize ? 'GB' : ''}
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
          className="add-new-block content-block-content card-container hover-action"
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
