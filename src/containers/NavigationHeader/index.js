/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import _ from 'lodash/fp';

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

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING
    ) {
      return (
        <div className="header-bottom">
          <div className="header-bottom-container container">
            <ul className="breadcrumbs nav">
              <li className="breadcrumbs__li nav-item dropdown">
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
          <li className="breadcrumbs__li nav-item dropdown">
            <div
              style={{ cursor: 'pointer' }}
              className="breadcrumbs__link dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {idName}
            </div>
            <ul className="dropdown-menu dropdown-menu-left" role="menu">
              {getNamespacesReducer.data.map(item => (
                <NavLink
                  key={_.uniqueId()}
                  className="dropdown-item"
                  to={`/namespaces/${item.name}`}
                >
                  {item.name}
                </NavLink>
              ))}
            </ul>
          </li>
        );
        isIdOutName = (
          <li className="breadcrumbs__li nav-item dropdown">
            <NavLink to={`/namespaces/${idName}`} className="breadcrumbs__link">
              {idName}
            </NavLink>
          </li>
        );
      }
      let isIdService = '';
      if (idService) {
        isIdService = (
          <div className="d-flex">
            <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">
              /
            </li>
            <li className="breadcrumbs__li nav-item">
              <NavLink
                to={`/namespace/${idName}/services/${idService}`}
                className="breadcrumbs__link"
              >
                {idService}
              </NavLink>
            </li>
          </div>
        );
      }
      let isIdDep = '';
      if (idDep && !idPod) {
        isIdDep = (
          <div className="d-flex">
            <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">
              /
            </li>
            <li className="breadcrumbs__li nav-item">
              <NavLink
                to={`/namespace/${idName}/deployments/${idDep}`}
                className="breadcrumbs__link"
              >
                {idDep}
              </NavLink>
            </li>
          </div>
        );
      }
      let idPodContent = '';
      if (idPod) {
        idPodContent = (
          <div className="d-flex">
            <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">
              /
            </li>
            <li className="breadcrumbs__li nav-item">
              <NavLink
                to={`/namespace/${idName}/deployments/${idDep}`}
                className="breadcrumbs__link"
              >
                {idDep}
              </NavLink>
            </li>
            <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">
              /
            </li>
            <li className="breadcrumbs__li nav-item">
              <NavLink
                to={`/namespace/${idName}/deployment/${idDep}/pods/${idPod}`}
                className="breadcrumbs__link"
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
          <div className="d-flex">
            <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">
              /
            </li>
            <li className="breadcrumbs__li nav-item">
              <div className="breadcrumbs__link">Create Service</div>
            </li>
          </div>
        );
      } else if (IdCreate === 'deployment') {
        IdCreateContent = (
          <div className="d-flex">
            <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">
              /
            </li>
            <li className="breadcrumbs__li nav-item">
              <div className="breadcrumbs__link">Create Deployment</div>
            </li>
          </div>
        );
      }
      let IdUpdateContent = '';
      if (IdUpdate === 'service') {
        IdUpdateContent = (
          <div className="d-flex">
            <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">
              /
            </li>
            <li className="breadcrumbs__li nav-item">
              <div className="breadcrumbs__link">
                Update {typeOfUpdateService} Service
              </div>
            </li>
          </div>
        );
      } else if (IdUpdate === 'deployment') {
        IdUpdateContent = (
          <div className="d-flex">
            <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">
              /
            </li>
            <li className="breadcrumbs__li nav-item">
              <div className="breadcrumbs__link">Update Deployment</div>
            </li>
          </div>
        );
      }
      if (idPod || idDep || idService || IdCreate === 'domain') {
        mainContent = (
          <div className="header-bottom">
            <div className="header-bottom-container container">
              <ul className="breadcrumbs nav">
                {isIdOutName}
                {isIdService}
                {IdCreate === 'domain' && (
                  <div className="d-flex">
                    <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">
                      /
                    </li>
                    <li className="breadcrumbs__li nav-item">
                      <div className="breadcrumbs__link">Create Domain</div>
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
          <div className="header-bottom">
            <div className="header-bottom-container container">
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
