/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';
import className from 'classnames/bind';

import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';
import * as actionGetUsageNamespaces from '../../actions/namespacesActions/getUsageNamespaces';
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

import globalStyles from '../../theme/global.scss';
import buttonsStyles from '../../theme/buttons.scss';
import {
  GET_NAMESPACES_USAGE_FAILURE,
  GET_NAMESPACES_USAGE_INVALID,
  GET_NAMESPACES_USAGE_REQUESTING
} from '../../constants/namespacesConstants/getUsageNamespaces';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';

const globalClass = className.bind(globalStyles);

const containerNoBack = globalClass('container', 'containerNoBackground');

const containerClassName = globalClass('contentBlockContainer', 'container');

type Props = {
  getNamespacesReducer: Object,
  getUsageNamespacesReducer: Object,
  getProfileReducer: Object,
  deleteNamespaceReducer: NamespaceType,
  fetchGetUsageNamespacesIfNeeded: () => void,
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
    const { fetchGetUsageNamespacesIfNeeded } = this.props;
    fetchGetUsageNamespacesIfNeeded();
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      this.props.fetchGetNamespacesIfNeeded(
        nextProps.getProfileReducer.data.role
      );
    }
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
    const {
      getNamespacesReducer,
      getUsageNamespacesReducer,
      deleteNamespaceReducer,
      match
    } = this.props;
    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
      !getUsageNamespacesReducer.readyStatus ||
      getUsageNamespacesReducer.readyStatus === GET_NAMESPACES_USAGE_INVALID ||
      getUsageNamespacesReducer.readyStatus === GET_NAMESPACES_USAGE_REQUESTING
    ) {
      return (
        <div
          className={`${globalStyles.container} container`}
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
        <div className={globalStyles.contentBlock}>
          <div className={`${containerNoBack} container`}>
            <div className="row double">
              {new Array(3).fill().map(() => (
                <div key={_.uniqueId()} className="col-md-4 align-middle">
                  <img
                    className={globalStyles.contentBlockContainerImg}
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

    if (
      getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE ||
      getUsageNamespacesReducer.readyStatus === GET_NAMESPACES_USAGE_FAILURE
    ) {
      return <p>Oops, Failed to load data of Namespace!</p>;
    }

    const currentNamespace = getNamespacesReducer.data.find(
      namespace => namespace.id === match.params.idName
    );
    return (
      <NamespaceInfo
        data={currentNamespace || {}}
        dataUsageNamespaces={getUsageNamespacesReducer.data}
        handleDeleteNamespace={idName => this.handleDeleteNamespace(idName)}
        idName={match.params.idName}
      />
    );
  };

  render() {
    const {
      fetchDeleteNamespaceIfNeeded,
      deleteNamespaceReducer,
      getNamespacesReducer,
      match,
      history
    } = this.props;
    const { status, idName, err } = deleteNamespaceReducer;
    const { inputName, isOpened, idName: currentIdName } = this.state;

    const currentNamespace = getNamespacesReducer.data.find(
      namespace => namespace.id === match.params.idName
    );
    const isReadAccess = currentNamespace && currentNamespace.access !== 'read';
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
          <div className={globalStyles.contentBlock}>
            <div className={`${containerClassName} container`}>
              <div className={globalStyles.contentBlockHeader}>
                <div>
                  <ul
                    className={`${globalStyles.contentBlockMenu} nav nav-pills`}
                    role="tablist"
                  >
                    <li
                      className={`${globalStyles.contentBlockMenuLi} nav-item`}
                    >
                      <NavLink
                        activeClassName={globalStyles.contentBlockMenuLiActive}
                        to={routerLinks.getDeploymentsLink(match.params.idName)}
                      >
                        Deployments
                      </NavLink>
                    </li>
                    <li
                      className={`${globalStyles.contentBlockMenuLi} nav-item`}
                    >
                      <NavLink
                        activeClassName={globalStyles.contentBlockMenuLiActive}
                        to={routerLinks.getServicesLink(match.params.idName)}
                      >
                        Services
                      </NavLink>
                    </li>
                    <li
                      className={`${globalStyles.contentBlockMenuLi} nav-item`}
                    >
                      <NavLink
                        activeClassName={globalStyles.contentBlockMenuLiActive}
                        to={routerLinks.getConfigMapsLink(match.params.idName)}
                      >
                        ConfigMaps
                      </NavLink>
                    </li>
                  </ul>
                </div>
                {history.location.pathname.indexOf('/services') + 1 &&
                isReadAccess ? (
                  <div className={globalStyles.contentBlockHeaderExtraPanel}>
                    <div className={globalStyles.contentBlockHeaderExtraPanel}>
                      <NavLink
                        to={routerLinks.createServiceLink(match.params.idName)}
                        className={`${
                          buttonsStyles.buttonUICreate
                        } btn btn-outline-primary`}
                      >
                        Create
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {history.location.pathname.indexOf('/deployments') + 1 &&
                isReadAccess ? (
                  <div className={globalStyles.contentBlockHeaderExtraPanel}>
                    <div className={globalStyles.contentBlockHeaderExtraPanel}>
                      <NavLink
                        to={`/namespace/${
                          match.params.idName
                        }/createDeployment`}
                        className={`${
                          buttonsStyles.buttonUICreate
                        } btn btn-outline-primary`}
                      >
                        Create
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {history.location.pathname.indexOf('/configMaps') + 1 &&
                isReadAccess ? (
                  <div className={globalStyles.contentBlockHeaderExtraPanel}>
                    <div className={globalStyles.contentBlockHeaderExtraPanel}>
                      <NavLink
                        to={`/namespace/${match.params.idName}/createConfigMap`}
                        className={`${
                          buttonsStyles.buttonUICreate
                        } btn btn-outline-primary`}
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
    getNamespacesReducer,
    getUsageNamespacesReducer,
    deleteNamespaceReducer,
    getProfileReducer
  }: ReduxState) => ({
    getNamespacesReducer,
    getUsageNamespacesReducer,
    deleteNamespaceReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespacesIfNeeded: (role: string) =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded(role)),
    fetchGetUsageNamespacesIfNeeded: () =>
      dispatch(actionGetUsageNamespaces.fetchGetUsageNamespacesIfNeeded()),
    fetchDeleteNamespaceIfNeeded: (idName: string) =>
      dispatch(actionDeleteNamespace.fetchDeleteNamespaceIfNeeded(idName))
  })
);

export default connector(Namespace);
