/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import className from 'classnames/bind';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';
import type { Dispatch, ReduxState } from '../../types';
import * as actionGetServices from '../../actions/servicesActions/getServices';
import * as actionDeleteService from '../../actions/serviceActions/deleteService';
import {
  GET_SERVICES_INVALID,
  GET_SERVICES_REQUESTING,
  GET_SERVICES_FAILURE,
  GET_SERVICES_SUCCESS
} from '../../constants/servicesConstants/getServices';
import {
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_REQUESTING
} from '../../constants/serviceConstants/deleteService';
import ServicesList from '../../components/ServicesList';
import Notification from '../Notification';

import globalStyles from '../../theme/global.scss';
import {
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING
} from '../../constants/namespacesConstants/getNamespaces';

const globalClass = className.bind(globalStyles);

const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);

type Props = {
  history: Object,
  match: Object,
  getServicesReducer: Object,
  getNamespacesReducer: Object,
  deleteServiceReducer: Object,
  fetchGetServicesIfNeeded: (idName: string) => void,
  fetchDeleteServiceIfNeeded: (idName: string, idSvr: string) => void
};

export class Services extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      displayedService: []
    };
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentDidMount() {
    const { fetchGetServicesIfNeeded, match } = this.props;
    fetchGetServicesIfNeeded(match.params.idName);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getServicesReducer.readyStatus !==
        nextProps.getServicesReducer.readyStatus &&
      nextProps.getServicesReducer.readyStatus === GET_SERVICES_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedService: nextProps.getServicesReducer.data
      });
    }
    if (
      this.props.deleteServiceReducer.readyStatus !==
        nextProps.deleteServiceReducer.readyStatus &&
      nextProps.deleteServiceReducer.readyStatus === DELETE_SERVICE_SUCCESS
    ) {
      const displayedSrv = this.state.displayedService.filter(
        service => nextProps.deleteServiceReducer.idSrv !== service.name
      );
      this.setState({
        ...this.state,
        displayedService: displayedSrv
      });
    }
  }
  handleDeleteService = idSrv => {
    const { match } = this.props;
    this.props.fetchDeleteServiceIfNeeded(match.params.idName, idSrv);
  };

  renderServicesList = () => {
    const {
      getServicesReducer,
      getNamespacesReducer,
      deleteServiceReducer,
      match
    } = this.props;

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
      !getServicesReducer.readyStatus ||
      getServicesReducer.readyStatus === GET_SERVICES_INVALID ||
      getServicesReducer.readyStatus === GET_SERVICES_REQUESTING ||
      deleteServiceReducer.readyStatus === DELETE_SERVICE_REQUESTING
    ) {
      return (
        <div
          style={{
            height: '270px',
            margin: '0 30px',
            borderRadius: '2px',
            backgroundColor: '#f6f6f6'
          }}
        />
      );
    }

    if (
      getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE ||
      getServicesReducer.readyStatus === GET_SERVICES_FAILURE
    ) {
      return <p>Oops, Failed to load data of Services!</p>;
    }

    return (
      <ServicesList
        data={this.state.displayedService}
        dataNamespace={getNamespacesReducer.data.find(
          namespace => namespace.id === match.params.idName
        )}
        handleDeleteService={idSrv => this.handleDeleteService(idSrv)}
        history={this.props.history}
        idName={match.params.idName}
      />
    );
  };

  render() {
    const { status, idSrv, err } = this.props.deleteServiceReducer;
    return (
      <div>
        <Notification status={status} name={idSrv} errorMessage={err} />
        <div className={contentClassName}>
          <div className="tab-content">
            <div className="tab-pane services active">
              {this.renderServicesList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getServicesReducer,
    getNamespacesReducer,
    deleteServiceReducer
  }: ReduxState) => ({
    getServicesReducer,
    getNamespacesReducer,
    deleteServiceReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetServicesIfNeeded: (idName: string) =>
      dispatch(actionGetServices.fetchGetServicesIfNeeded(idName)),
    fetchDeleteServiceIfNeeded: (idName: string, idSrv: string) =>
      dispatch(actionDeleteService.fetchDeleteServiceIfNeeded(idName, idSrv))
  })
);

export default connector(Services);
