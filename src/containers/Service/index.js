/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';

import * as actionGetService from '../../actions/serviceActions/getService';
import * as actionGetDeployments from '../../actions/deploymentsActions/getDeployments';
import * as actionDeleteService from '../../actions/serviceActions/deleteService';
import {
  GET_SERVICE_FAILURE,
  GET_SERVICE_INVALID,
  GET_SERVICE_REQUESTING
} from '../../constants/serviceConstants/getService';
import {
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_REQUESTING
} from '../../constants/serviceConstants/deleteService';
import type { Dispatch, ReduxState } from '../../types';
import { routerLinks } from '../../config';
import ServiceInfo from '../../components/ServiceInfo';
import Notification from '../Notification';
import NavigationHeaderItem from '../NavigationHeader';
import LinkedDeployment from '../LinkedDeployment';
import PortsPage from '../Ports';

type Props = {
  getServiceReducer: Object,
  deleteServiceReducer: Object,
  fetchGetServiceIfNeeded: (idName: string, idSrv: string) => void,
  fetchGetDeploymentsIfNeeded: (idName: string) => void,
  fetchDeleteServiceIfNeeded: (idName: string, idSrv: string) => void,
  match: Object,
  history: Object
};

// Export this for unit testing more easily
export class Service extends PureComponent<Props> {
  componentDidMount() {
    const {
      fetchGetServiceIfNeeded,
      fetchGetDeploymentsIfNeeded,
      match
    } = this.props;
    fetchGetServiceIfNeeded(match.params.idName, match.params.idSrv);
    fetchGetDeploymentsIfNeeded(match.params.idName);
  }
  componentWillUpdate(nextProps) {
    const { deleteServiceReducer } = this.props;
    if (
      deleteServiceReducer.readyStatus !==
        nextProps.deleteServiceReducer.readyStatus &&
      nextProps.deleteServiceReducer.readyStatus === DELETE_SERVICE_SUCCESS
    ) {
      this.props.history.goBack();
    }
  }
  onHandleDelete = idSrv => {
    const { fetchDeleteServiceIfNeeded, match } = this.props;
    fetchDeleteServiceIfNeeded(match.params.idName, idSrv);
  };

  renderServiceInfo = () => {
    const { getServiceReducer, deleteServiceReducer, match } = this.props;

    if (
      !getServiceReducer.readyStatus ||
      getServiceReducer.readyStatus === GET_SERVICE_INVALID ||
      getServiceReducer.readyStatus === GET_SERVICE_REQUESTING ||
      deleteServiceReducer.readyStatus === DELETE_SERVICE_REQUESTING
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

    if (getServiceReducer.readyStatus === GET_SERVICE_FAILURE) {
      return <p>Oops, Failed to load data of Service!</p>;
    }

    return (
      <ServiceInfo
        data={getServiceReducer.data}
        handleDeleteService={idSrv => this.onHandleDelete(idSrv)}
        idName={match.params.idName}
        idSrv={match.params.idSrv}
      />
    );
  };

  render() {
    const { deleteServiceReducer, match } = this.props;
    const { status, idSrv, err } = this.props.deleteServiceReducer;
    return (
      <div>
        <Helmet title={`Service - ${match.params.idSrv}`} />
        <Notification status={status} name={idSrv} errorMessage={err} />
        <NavigationHeaderItem
          idName={match.params.idName}
          idService={match.params.idSrv}
        />
        {this.renderServiceInfo()}
        {deleteServiceReducer.readyStatus !== DELETE_SERVICE_REQUESTING && (
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
                        to={routerLinks.getServiceLink(
                          match.params.idName,
                          match.params.idSrv
                        )}
                        className="content-block-menu__link"
                      >
                        Ports
                      </NavLink>
                    </li>
                    <li className="content-block-menu__li nav-item">
                      <NavLink
                        activeClassName="active"
                        to={routerLinks.getDepInServiceLink(
                          match.params.idName,
                          match.params.idSrv
                        )}
                        className="content-block-menu__link"
                      >
                        Linked Deployment
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <Switch>
                <Route
                  path={`${match.path}/ports`}
                  exact
                  component={PortsPage}
                />
                <Route
                  path={`${match.url}`}
                  exact
                  component={() => <Redirect to={`${match.url}/ports`} />}
                />
                <Route
                  path={`${match.path}/deployment`}
                  exact
                  component={LinkedDeployment}
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
  ({ getServiceReducer, deleteServiceReducer }: ReduxState) => ({
    getServiceReducer,
    deleteServiceReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetServiceIfNeeded: (idName: string, idSrv: string) =>
      dispatch(actionGetService.fetchGetServiceIfNeeded(idName, idSrv)),
    fetchGetDeploymentsIfNeeded: (idName: string) =>
      dispatch(actionGetDeployments.fetchGetDeploymentsIfNeeded(idName)),
    fetchDeleteServiceIfNeeded: (idName: string, idSrv: string) =>
      dispatch(actionDeleteService.fetchDeleteServiceIfNeeded(idName, idSrv))
  })
);

export default connector(Service);
