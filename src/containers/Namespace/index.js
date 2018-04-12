/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';

import * as actionGetNamespace from '../../actions/namespaceActions/getNamespace';
import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';
import * as actionDeleteNamespace from '../../actions/namespaceActions/deleteNamespace';
import {
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_FAILURE
} from '../../constants/namespacesConstants/getNamespaces';
import {
  DELETE_NAMESPACE_SUCCESS,
  DELETE_NAMESPACE_REQUESTING
} from '../../constants/namespaceConstants/deleteNamespace';
import type {
  Dispatch,
  Namespace as NamespaceType,
  ReduxState
} from '../../types';
import { routerLinks } from '../../config';
import NamespaceInfo from '../../components/NamespaceInfo';
import Notification from '../Notification';
import NavigationHeaderItem from '../NavigationHeader';
import DeleteModal from '../../components/CustomerModal/DeleteModal';
import DeploymentsPage from '../Deployments';
import ServicesPage from '../Services';
import ConfigMapsPage from '../ConfigMaps';
import ns from '../../images/ns-1.svg';

type Props = {
  getNamespacesReducer: Object,
  deleteNamespaceReducer: NamespaceType,
  fetchGetNamespaceIfNeeded: (idName: string) => void,
  fetchGetNamespacesIfNeeded: () => void,
  fetchDeleteNamespaceIfNeeded: (idName: string) => void,
  match: Object,
  history: Object
};

// Export this for unit testing more easily
export class Namespace extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      inputName: '',
      idName: null,
      isOpened: false
    };
  }
  componentDidMount() {
    const {
      fetchGetNamespaceIfNeeded,
      fetchGetNamespacesIfNeeded,
      match
    } = this.props;
    fetchGetNamespacesIfNeeded();
    fetchGetNamespaceIfNeeded(match.params.idName);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.deleteNamespaceReducer.readyStatus !==
        nextProps.deleteNamespaceReducer.readyStatus &&
      nextProps.deleteNamespaceReducer.readyStatus === DELETE_NAMESPACE_SUCCESS
    ) {
      this.props.history.push('/');
    }
  }
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpened: !this.state.isOpened,
      idName: null,
      inputName: ''
    });
  };
  handleInputName = inputName => {
    this.setState({
      ...this.state,
      inputName
    });
  };
  handleDeleteNamespace = idName => {
    this.setState({
      ...this.state,
      idName,
      isOpened: true
    });
  };

  renderNamespaceInfo = () => {
    const { getNamespacesReducer, deleteNamespaceReducer, match } = this.props;

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING
    ) {
      return (
        <div
          className="container"
          style={{
            padding: '0',
            marginTop: '17px',
            marginBottom: '30px',
            backgroundColor: 'transparent'
          }}
        >
          <img
            src={require('../../images/ns-dep.svg')}
            alt="ns-dep"
            style={{ width: '100%' }}
          />
        </div>
      );
    }

    if (deleteNamespaceReducer.readyStatus === DELETE_NAMESPACE_REQUESTING) {
      return (
        <div className="content-block">
          <div className="container no-back">
            <div className="row double">
              {new Array(3).fill().map(() => (
                <div key={_.uniqueId()} className="col-md-4 align-middle">
                  <img
                    className="content-block-container-img"
                    src={ns}
                    alt="ns"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE) {
      return <p>Oops, Failed to load data of Namespace!</p>;
    }

    return (
      <NamespaceInfo
        data={getNamespacesReducer.data.find(
          namespace =>
            namespace.label === match.params.idName ? namespace : null
        )}
        handleDeleteNamespace={idName => this.handleDeleteNamespace(idName)}
        idName={match.params.idName}
      />
    );
  };

  render() {
    const {
      fetchDeleteNamespaceIfNeeded,
      deleteNamespaceReducer,
      match,
      history
    } = this.props;
    const { status, idName, err } = this.props.deleteNamespaceReducer;
    const { inputName, isOpened, idName: currentIdName } = this.state;
    return (
      <div>
        <Helmet title={`Namespace - ${match.params.idName}`} />
        <Notification status={status} name={idName} errorMessage={err} />
        <DeleteModal
          type="Namespace"
          name={inputName}
          typeName={currentIdName}
          isOpened={isOpened}
          handleInputName={this.handleInputName}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleDelete={fetchDeleteNamespaceIfNeeded}
        />
        {deleteNamespaceReducer.readyStatus !== DELETE_NAMESPACE_REQUESTING && (
          <NavigationHeaderItem idName={match.params.idName} />
        )}
        {this.renderNamespaceInfo()}
        {deleteNamespaceReducer.readyStatus !== DELETE_NAMESPACE_REQUESTING && (
          <div className="content-block">
            <div className="content-block-container container">
              <div className="content-block-header">
                <div className="content-block-header-nav">
                  <ul
                    className="content-block-menu nav nav-pills"
                    role="tablist"
                  >
                    <li className="content-block-menu__li nav-item">
                      <NavLink
                        activeClassName="active"
                        to={routerLinks.getDeploymentsLink(match.params.idName)}
                        className="content-block-menu__link"
                      >
                        Deployments
                      </NavLink>
                    </li>
                    <li className="content-block-menu__li nav-item">
                      <NavLink
                        activeClassName="active"
                        to={routerLinks.getServicesLink(match.params.idName)}
                        className="content-block-menu__link"
                      >
                        Services
                      </NavLink>
                    </li>
                    <li className="content-block-menu__li nav-item">
                      <NavLink
                        activeClassName="active"
                        to={routerLinks.getConfigMapsLink(match.params.idName)}
                        className="content-block-menu__link"
                      >
                        ConfigMaps
                      </NavLink>
                    </li>
                  </ul>
                </div>
                {history.location.pathname.indexOf('/services') + 1 ? (
                  <div className="content-block-header-extra-panel">
                    <div className="content-block-header-extra-panel">
                      <NavLink
                        to={routerLinks.createServiceLink(match.params.idName)}
                        className="button_blue btn btn-outline-primary"
                      >
                        Create
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {history.location.pathname.indexOf('/deployments') + 1 ? (
                  <div className="content-block-header-extra-panel">
                    <div className="content-block-header-extra-panel">
                      <NavLink
                        to={`/namespace/${
                          match.params.idName
                        }/createDeployment`}
                        className="button_blue btn btn-outline-primary"
                      >
                        Create
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {history.location.pathname.indexOf('/configMaps') + 1 ? (
                  <div className="content-block-header-extra-panel">
                    <div className="content-block-header-extra-panel">
                      <NavLink
                        to={`/namespace/${match.params.idName}/createConfigMap`}
                        className="button_blue btn btn-outline-primary"
                      >
                        Create
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <Switch>
                <Route
                  path={`${match.path}/deployments`}
                  exact
                  component={DeploymentsPage}
                />
                <Route
                  path={`${match.path}/services`}
                  exact
                  component={ServicesPage}
                />
                <Route
                  path={`${match.path}/configmaps`}
                  exact
                  component={ConfigMapsPage}
                />
                <Route
                  path={`${match.url}`}
                  exact
                  component={() => <Redirect to={`${match.url}/deployments`} />}
                />
              </Switch>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getNamespaceReducer,
    getNamespacesReducer,
    deleteNamespaceReducer
  }: ReduxState) => ({
    getNamespaceReducer,
    getNamespacesReducer,
    deleteNamespaceReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespacesIfNeeded: () =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded()),
    fetchGetNamespaceIfNeeded: (idName: string) =>
      dispatch(actionGetNamespace.fetchGetNamespaceIfNeeded(idName)),
    fetchDeleteNamespaceIfNeeded: (idName: string) =>
      dispatch(actionDeleteNamespace.fetchDeleteNamespaceIfNeeded(idName))
  })
);

export default connector(Namespace);
