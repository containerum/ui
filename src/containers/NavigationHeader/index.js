/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import _ from 'lodash/fp';
import className from 'classnames/bind';

import imageLogo from '../../images/profilePlace.svg';
import downloadLogs from '../../images/downloadLogs.svg';
import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';
import {
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_SUCCESS
} from '../../constants/namespacesConstants/getNamespaces';
import type {
  Namespaces as NamespacesType,
  Dispatch,
  ReduxState
} from '../../types';

import headerStyles from '../../containers/Header/index.scss';
import globalStyles from '../../theme/global.scss';

type Props = {
  getNamespacesReducer: NamespacesType,
  fetchGetNamespacesIfNeeded: () => void,
  handleDownloadLogs: () => void,
  idName: ?string,
  idDep: ?string,
  idPod: ?string,
  idService: ?string,
  IdCreate: ?string,
  IdUpdate: ?string,
  typeOfUpdateService: ?string
};

const globalClass = className.bind(globalStyles);

const breadcumbsClassName = globalClass('breadcrumbsLi', 'breadcrumbsLiSpacer');

// Export this for unit testing more easily
export class NavigationHeader extends PureComponent<Props> {
  componentDidMount() {
    const { getNamespacesReducer } = this.props;
    if (getNamespacesReducer.readyStatus !== GET_NAMESPACES_SUCCESS) {
      this.props.fetchGetNamespacesIfNeeded();
    }
  }

  renderNamespacesList = () => {
    const {
      getNamespacesReducer,
      idName,
      idDep,
      idPod,
      idService,
      IdCreate,
      IdUpdate,
      typeOfUpdateService
    } = this.props;
    const currentNs =
      idName !== 'new'
        ? getNamespacesReducer.data.find(ns => ns.id === idName)
        : getNamespacesReducer.data[0];

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING
    ) {
      return (
        <div className={headerStyles.headerBottom}>
          <div
            className={`${headerStyles.headerBottomContainer} ${
              globalStyles.container
            } container`}
          >
            <ul className="breadcrumbs nav">
              <li className={`${globalStyles.breadcrumbsLi} nav-item dropdown`}>
                <div style={{ marginBottom: '-5px' }}>
                  <img src={imageLogo} alt="namespaces" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    if (getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE) {
      return <p>Oops, Failed to load data of Namespace!</p>;
    }

    let mainContent = '';
    {
      let isIdName = '';
      let isIdOutName = '';
      if (idName) {
        isIdName = (
          <li className={`${globalStyles.breadcrumbsLi} nav-item dropdown`}>
            <div
              style={{ cursor: 'pointer' }}
              className={`${globalStyles.dropdownToggle} dropdown-toggle`}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {currentNs ? currentNs.label : ''}
            </div>
            <ul
              className={`${globalStyles.dropdownMenu} dropdown-menu`}
              role="menu"
            >
              {getNamespacesReducer.data.map(item => (
                <NavLink
                  key={_.uniqueId()}
                  className="dropdown-item"
                  to={`/namespaces/${item.id}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </ul>
          </li>
        );
        isIdOutName = (
          <li className={`${globalStyles.breadcrumbsLi} nav-item dropdown`}>
            <NavLink to={`/namespaces/${currentNs.id}`}>
              {currentNs ? currentNs.label : ''}
            </NavLink>
          </li>
        );
      }
      let isIdService = '';
      if (idService) {
        isIdService = (
          <div style={{ display: 'flex' }}>
            <li className={`${breadcumbsClassName} nav-item`}>/</li>
            <li className={`${globalStyles.breadcrumbsLi} nav-item `}>
              <NavLink to={`/namespace/${currentNs.id}/services/${idService}`}>
                {idService}
              </NavLink>
            </li>
          </div>
        );
      }
      let isIdDep = '';
      if (idDep && !idPod) {
        isIdDep = (
          <div style={{ display: 'flex' }}>
            <li className={`${breadcumbsClassName} nav-item`}>/</li>
            <li className={`${globalStyles.breadcrumbsLi} nav-item`}>
              <NavLink to={`/namespace/${currentNs.id}/deployments/${idDep}`}>
                {idDep}
              </NavLink>
            </li>
          </div>
        );
      }
      let idPodContent = '';
      if (idPod) {
        idPodContent = (
          <div style={{ display: 'flex' }}>
            <li className={`${breadcumbsClassName} nav-item`}>/</li>
            <li className={`${globalStyles.breadcrumbsLi} nav-item`}>
              <NavLink to={`/namespace/${currentNs.id}/deployments/${idDep}`}>
                {idDep}
              </NavLink>
            </li>
            <li className={`${breadcumbsClassName} nav-item`}>/</li>
            <li className={`${globalStyles.breadcrumbsLi} nav-item`}>
              <NavLink
                to={`/namespace/${
                  currentNs.id
                }/deployment/${idDep}/pods/${idPod}`}
              >
                {idPod}
              </NavLink>
            </li>
          </div>
        );
      }
      let IdCreateContent = '';
      if (IdCreate === 'service') {
        IdCreateContent = (
          <div style={{ display: 'flex' }}>
            <li className={`${breadcumbsClassName} nav-item`}>/</li>
            <li className={`${globalStyles.breadcrumbsLi} nav-item `}>
              <div>Create Service</div>
            </li>
          </div>
        );
      } else if (IdCreate === 'deployment') {
        IdCreateContent = (
          <div style={{ display: 'flex' }}>
            <li className={`${breadcumbsClassName} nav-item`}>/</li>
            <li className={`${globalStyles.breadcrumbsLi} nav-item `}>
              <div>Create Deployment</div>
            </li>
          </div>
        );
      } else if (IdCreate === 'namespace') {
        IdCreateContent = (
          <div style={{ display: 'flex' }}>
            <li className={`${breadcumbsClassName} nav-item`}>/</li>
            <li className={`${globalStyles.breadcrumbsLi} nav-item `}>
              <div>Create Namespace</div>
            </li>
          </div>
        );
      }
      let IdUpdateContent = '';
      if (IdUpdate === 'service') {
        IdUpdateContent = (
          <div style={{ display: 'flex' }}>
            <li className={`${breadcumbsClassName} nav-item`}>/</li>
            <li className={`${globalStyles.breadcrumbsLi} nav-item`}>
              <div>Update {typeOfUpdateService} Service</div>
            </li>
          </div>
        );
      } else if (IdUpdate === 'deployment') {
        IdUpdateContent = (
          <div style={{ display: 'flex' }}>
            <li className={`${breadcumbsClassName} nav-item`}>/</li>
            <li className={`${globalStyles.breadcrumbsLi} nav-item`}>
              <div>Update Deployment</div>
            </li>
          </div>
        );
      } else if (IdUpdate === 'namespace') {
        IdUpdateContent = (
          <div style={{ display: 'flex' }}>
            <li className={`${breadcumbsClassName} nav-item`}>/</li>
            <li className={`${globalStyles.breadcrumbsLi} nav-item`}>
              <div>Update Namespace</div>
            </li>
          </div>
        );
      }
      if (idPod || idDep || idService || IdCreate === 'domain') {
        mainContent = (
          <div className={headerStyles.headerBottom}>
            <div
              className={`${headerStyles.headerBottomContainer} ${
                globalStyles.container
              } container`}
            >
              <ul className="breadcrumbs nav">
                {isIdOutName}
                {isIdService}
                {IdCreate === 'domain' && (
                  <div style={{ display: 'flex' }}>
                    <li className={`${breadcumbsClassName} nav-item`}>/</li>
                    <li className={`${globalStyles.breadcrumbsLi} nav-item`}>
                      <div>Create Domain</div>
                    </li>
                  </div>
                )}
                {isIdDep}
                {idPodContent}
                {this.props.handleDownloadLogs && (
                  <img
                    src={downloadLogs}
                    style={{
                      position: 'absolute',
                      right: 0,
                      cursor: 'pointer'
                    }}
                    alt="download logs"
                    onClick={this.props.handleDownloadLogs}
                    onKeyPress={this.props.handleDownloadLogs}
                    role="presentation"
                  />
                )}
              </ul>
            </div>
          </div>
        );
      } else {
        mainContent = (
          <div className={headerStyles.headerBottom}>
            <div
              className={`${headerStyles.headerBottomContainer} ${
                globalStyles.container
              } container`}
            >
              <ul className="breadcrumbs nav">
                {isIdName}
                {isIdService}
                {isIdDep}
                {idPodContent}
                {IdCreateContent}
                {IdUpdateContent}
              </ul>
            </div>
          </div>
        );
      }
    }
    return <div>{mainContent}</div>;
  };

  render() {
    return <div>{this.renderNamespacesList()}</div>;
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getNamespacesReducer }: ReduxState) => ({
    getNamespacesReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespacesIfNeeded: () =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded())
  })
);

export default connector(NavigationHeader);
