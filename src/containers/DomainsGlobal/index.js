/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';
import * as actionGetDomains from '../../actions/servicesActions/getDomainsGlobal';
import * as actionDeleteDomain from '../../actions/serviceActions/deleteDomain';
import type { Dispatch, ReduxState } from '../../types';
import {
  GET_DOMAINS_GLOBAL_INVALID,
  GET_DOMAINS_GLOBAL_REQUESTING,
  GET_DOMAINS_GLOBAL_SUCCESS,
  GET_DOMAINS_GLOBAL_FAILURE
} from '../../constants/serviceConstants/getDomainsGlobal';
import {
  DELETE_DOMAIN_SUCCESS,
  DELETE_DOMAIN_REQUESTING
} from '../../constants/serviceConstants/deleteDomain';
import DomainsList from '../../components/DomainsGlobalList';
import Notification from '../Notification';

import globalStyles from '../../theme/global.scss';
import {
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_SUCCESS
} from '../../constants/namespacesConstants/getNamespaces';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';

import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';

type Props = {
  history: Object,
  getProfileReducer: Object,
  getNamespacesReducer: Object,
  getDomainsGlobalReducer: Object,
  deleteDomainReducer: Object,
  fetchGetDomainsIfNeeded: (idName: string) => void,
  fetchDeleteDomainIfNeeded: (idName: string, label: string) => void,
  fetchGetNamespacesIfNeeded: (role: string) => void
};

export class DomainsGlobal extends PureComponent<Props> {
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
    const { fetchGetDomainsIfNeeded } = this.props;
    fetchGetDomainsIfNeeded();
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
      this.props.getDomainsGlobalReducer.readyStatus !==
        nextProps.getDomainsGlobalReducer.readyStatus &&
      nextProps.getDomainsGlobalReducer.readyStatus ===
        GET_DOMAINS_GLOBAL_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedDomains: nextProps.getDomainsGlobalReducer.data
      });
    }
    if (
      this.props.deleteDomainReducer.readyStatus !==
        nextProps.deleteDomainReducer.readyStatus &&
      nextProps.deleteDomainReducer.readyStatus === DELETE_DOMAIN_SUCCESS
    ) {
      this.props.fetchGetDomainsIfNeeded();
    }
  }
  handleDeleteDomain = (idName, label) => {
    this.props.fetchDeleteDomainIfNeeded(idName, label);
  };

  renderDomainsList = () => {
    const {
      getDomainsGlobalReducer,
      deleteDomainReducer,
      getNamespacesReducer
    } = this.props;
    let namespacesLabels;
    if (getNamespacesReducer.readyStatus === GET_NAMESPACES_SUCCESS) {
      namespacesLabels = getNamespacesReducer.data.map(ingress => [
        ingress.id,
        ingress.label
      ]);
    }

    if (
      !getDomainsGlobalReducer.readyStatus ||
      getDomainsGlobalReducer.readyStatus === GET_DOMAINS_GLOBAL_INVALID ||
      getDomainsGlobalReducer.readyStatus === GET_DOMAINS_GLOBAL_REQUESTING ||
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

    if (getDomainsGlobalReducer.readyStatus === GET_DOMAINS_GLOBAL_FAILURE) {
      return <p>Oops, Failed to load data of Domains!</p>;
    }

    return (
      <DomainsList
        namespacesLabels={namespacesLabels}
        namespacesData={getNamespacesReducer.data}
        data={this.state.displayedDomains}
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
        <div className={`container ${globalStyles.containerNoBackground}`}>
          <div className={globalStyles.contentBlcok}>
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2" />
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className={`container ${globalStyles.containerDomains}`}>
                  <div className={globalStyles.blockItem} id="domains">
                    <div className={globalStyles.blockItemTitle}>Domains</div>
                    <div className="row">
                      <div className="col-md-8">
                        <div className={globalStyles.textLight}>
                          Your Domains
                        </div>
                      </div>
                      <div className={globalStyles.contentBlock}>
                        <div
                          className={`container ${
                            globalStyles.containerNoBackground
                          }`}
                        >
                          {this.renderDomainsList()}
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div
                          className={globalStyles.textLight}
                          style={{ margin: '20px 0' }}
                        >
                          To add Domain, please visit Service creation page and
                          add Domain in the corresponding section (for External
                          Service only)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getDomainsGlobalReducer,
    deleteDomainReducer,
    getNamespacesReducer,
    getProfileReducer
  }: ReduxState) => ({
    getDomainsGlobalReducer,
    deleteDomainReducer,
    getNamespacesReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespacesIfNeeded: (role: string) =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded(role)),
    fetchGetDomainsIfNeeded: () =>
      dispatch(actionGetDomains.fetchGetDomainsIfNeeded()),
    fetchDeleteDomainIfNeeded: (idName: string, label: string) =>
      dispatch(actionDeleteDomain.fetchDeleteDomainIfNeeded(idName, label))
  })
);

export default connector(DomainsGlobal);
