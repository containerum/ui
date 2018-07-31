/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import className from 'classnames/bind';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';
import * as actionGetDomains from '../../actions/servicesActions/getDomains';
import * as actionDeleteDomain from '../../actions/serviceActions/deleteIngress';
import type { Dispatch, ReduxState } from '../../types';
import {
  GET_INGRESSES_INVALID,
  GET_INGRESSES_REQUESTING,
  GET_INGRESSES_SUCCESS,
  GET_INGRESSES_FAILURE
} from '../../constants/serviceConstants/getDomains';
import {
  DELETE_INGRESS_SUCCESS,
  DELETE_INGRESS_REQUESTING
} from '../../constants/serviceConstants/deleteIngress';
import DomainsList from '../../components/DomainsList';
import Notification from '../Notification';

import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';

import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';
import globalStyles from '../../theme/global.scss';

import {
  // GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_SUCCESS
} from '../../constants/namespacesConstants/getNamespaces';

const globalClass = className.bind(globalStyles);

const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);
// import {
//   DELETE_DEPLOYMENT_REQUESTING,
//   DELETE_DEPLOYMENT_SUCCESS
// } from '../../constants/deploymentConstants/deleteDeployment';
// import {
//   GET_DEPLOYMENTS_FAILURE,
//   GET_DEPLOYMENTS_INVALID,
//   GET_DEPLOYMENTS_REQUESTING,
//   GET_DEPLOYMENTS_SUCCESS
// } from '../../constants/deploymentsConstants/getDeployments';

type Props = {
  match: Object,
  history: Object,
  getProfileReducer: Object,
  getNamespacesReducer: Object,
  getIngressesReducer: Object,
  deleteIngressReducer: Object,
  fetchGetIngressesIfNeeded: (idName: string) => void,
  fetchDeleteIngressIfNeeded: (idName: string, label: string) => void,
  fetchGetNamespacesIfNeeded: (role: string) => void
};

export class Domains extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      displayedDomains: {}
    };
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentDidMount() {
    const { fetchGetIngressesIfNeeded } = this.props;
    fetchGetIngressesIfNeeded(this.props.match.params.idName);
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
      this.props.getIngressesReducer.readyStatus !==
        nextProps.getIngressesReducer.readyStatus &&
      nextProps.getIngressesReducer.readyStatus === GET_INGRESSES_SUCCESS
    ) {
      // this.props.fetchGetIngressesIfNeeded(this.props.match.params.idName);
      this.setState({
        ...this.state,
        displayedDomains: nextProps.getIngressesReducer.data.ingresses
      });
    }
    if (
      this.props.deleteIngressReducer.readyStatus !==
        nextProps.deleteIngressReducer.readyStatus &&
      nextProps.deleteIngressReducer.readyStatus === DELETE_INGRESS_SUCCESS
    ) {
      this.props.fetchGetIngressesIfNeeded(
        // this.props.getNamespacesReducer.data.id
        this.props.match.params.idName
      );
    }
  }
  handleDeleteDomain = (idName, label) => {
    this.props.fetchDeleteIngressIfNeeded(idName, label);
  };

  renderDomainsList = () => {
    const {
      getIngressesReducer,
      deleteIngressReducer,
      getNamespacesReducer,
      match
    } = this.props;
    let namespacesLabels;
    if (getNamespacesReducer.readyStatus === GET_NAMESPACES_SUCCESS) {
      namespacesLabels = getNamespacesReducer.data.map(ingress => [
        ingress.id,
        ingress.label
      ]);
    }

    if (
      !getIngressesReducer.readyStatus ||
      getIngressesReducer.readyStatus === GET_INGRESSES_INVALID ||
      getIngressesReducer.readyStatus === GET_INGRESSES_REQUESTING ||
      deleteIngressReducer.readyStatus === DELETE_INGRESS_REQUESTING ||
      (!getNamespacesReducer.readyStatus ||
        getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
        getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING)
    ) {
      return (
        <div
          className={globalStyles.container}
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

    if (getIngressesReducer.readyStatus === GET_INGRESSES_FAILURE) {
      return <p>Oops, Failed to load data of Domains!</p>;
    }

    return (
      <DomainsList
        match={match}
        namespacesLabels={namespacesLabels}
        namespacesData={getNamespacesReducer.data}
        data={getIngressesReducer.data.ingresses}
        handleDeleteDomain={(idName, label) =>
          this.handleDeleteDomain(idName, label)
        }
      />
    );
  };
  render() {
    const { status, method, label, err } = this.props.deleteIngressReducer;
    return (
      <div>
        <Helmet title="Domains" />
        <Notification
          status={status}
          name={label}
          method={method}
          errorMessage={err}
        />
        <div className={contentClassName}>
          <div className="tab-content">
            <div className="tab-pane active">{this.renderDomainsList()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getIngressesReducer,
    deleteIngressReducer,
    getNamespacesReducer,
    getProfileReducer
  }: ReduxState) => ({
    getIngressesReducer,
    deleteIngressReducer,
    getNamespacesReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespacesIfNeeded: (role: string) =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded(role)),
    fetchGetIngressesIfNeeded: (idName: string) =>
      dispatch(actionGetDomains.fetchGetIngressesIfNeeded(idName)),
    fetchDeleteIngressIfNeeded: (idName: string, label: string) =>
      dispatch(actionDeleteDomain.fetchDeleteIngressIfNeeded(idName, label))
  })
);

export default connector(Domains);
