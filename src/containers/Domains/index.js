/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import className from 'classnames/bind';

import * as actionGetDomains from '../../actions/servicesActions/getDomains';
import * as actionDeleteDomain from '../../actions/serviceActions/deleteDomain';
import type { Dispatch, ReduxState } from '../../types';
import {
  GET_DOMAINS_INVALID,
  GET_DOMAINS_REQUESTING,
  GET_DOMAINS_SUCCESS,
  GET_DOMAINS_FAILURE
} from '../../constants/serviceConstants/getDomains';
import {
  DELETE_DOMAIN_SUCCESS,
  DELETE_DOMAIN_REQUESTING
} from '../../constants/serviceConstants/deleteDomain';
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
  getProfileReducer: Object,
  getNamespacesReducer: Object,
  getDomainsReducer: Object,
  deleteDomainReducer: Object,
  match: Object,
  fetchGetDomainsIfNeeded: (idName: string) => void,
  fetchDeleteDomainIfNeeded: (idName: string, label: string) => void,
  fetchGetNamespacesIfNeeded: (role: string) => void
};

export class Domains extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      displayedDomains: {}
    };
  }
  componentDidMount() {
    const { fetchGetDomainsIfNeeded } = this.props;
    fetchGetDomainsIfNeeded(this.props.match.params.idName);
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
      this.props.getDomainsReducer.readyStatus !==
        nextProps.getDomainsReducer.readyStatus &&
      nextProps.getDomainsReducer.readyStatus === GET_DOMAINS_SUCCESS
    ) {
      // this.props.fetchGetDomainsIfNeeded(this.props.match.params.idName);
      this.setState({
        ...this.state,
        displayedDomains: nextProps.getDomainsReducer.data.ingresses
      });
    }
    if (
      this.props.deleteDomainReducer.readyStatus !==
        nextProps.deleteDomainReducer.readyStatus &&
      nextProps.deleteDomainReducer.readyStatus === DELETE_DOMAIN_SUCCESS
    ) {
      this.props.fetchGetDomainsIfNeeded(
        // this.props.getNamespacesReducer.data.id
        this.props.match.params.idName
      );
    }
  }
  handleDeleteDomain = (idName, label) => {
    this.props.fetchDeleteDomainIfNeeded(idName, label);
  };

  renderDomainsList = () => {
    const {
      getDomainsReducer,
      deleteDomainReducer,
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
      !getDomainsReducer.readyStatus ||
      getDomainsReducer.readyStatus === GET_DOMAINS_INVALID ||
      getDomainsReducer.readyStatus === GET_DOMAINS_REQUESTING ||
      deleteDomainReducer.readyStatus === DELETE_DOMAIN_REQUESTING ||
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

    if (getDomainsReducer.readyStatus === GET_DOMAINS_FAILURE) {
      return <p>Oops, Failed to load data of Domains!</p>;
    }

    return (
      <DomainsList
        match={match}
        namespacesLabels={namespacesLabels}
        namespacesData={getNamespacesReducer.data}
        data={getDomainsReducer.data.ingresses}
        handleDeleteDomain={(idName, label) =>
          this.handleDeleteDomain(idName, label)
        }
      />
    );
  };
  render() {
    const { status, method, label, err } = this.props.deleteDomainReducer;
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
    getDomainsReducer,
    deleteDomainReducer,
    getNamespacesReducer,
    getProfileReducer
  }: ReduxState) => ({
    getDomainsReducer,
    deleteDomainReducer,
    getNamespacesReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespacesIfNeeded: (role: string) =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded(role)),
    fetchGetDomainsIfNeeded: (idName: string) =>
      dispatch(actionGetDomains.fetchGetDomainsIfNeeded(idName)),
    fetchDeleteDomainIfNeeded: (idName: string, label: string) =>
      dispatch(actionDeleteDomain.fetchDeleteDomainIfNeeded(idName, label))
  })
);

export default connector(Domains);
