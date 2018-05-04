/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';

import * as actionGetServices from '../../actions/servicesActions/getServices';
import * as actionCreateDomain from '../../actions/serviceActions/createDomain';
import {
  GET_SERVICES_INVALID,
  GET_SERVICES_REQUESTING,
  GET_SERVICES_FAILURE,
  GET_SERVICES_SUCCESS
} from '../../constants/servicesConstants/getServices';
// import { CREATE_DOMAIN_SUCCESS } from '../../constants/serviceConstants/createDomain';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';
import type { Dispatch, ReduxState } from '../../types';
import NavigationHeaderItem from '../NavigationHeader';
import CreateDomainCard from '../../components/CreateDomainCard';
import LoadButton from '../../components/LoadButton';
// import InputControl from '../../components/InputControl';
import Notification from '../Notification';
// import { routerLinks } from '../../config';
import globalStyles from '../../theme/global.scss';

type Props = {
  getServicesReducer: Object,
  createDomainReducer: Object,
  getProfileReducer: Object,
  match: Object,
  // history: Object,
  fetchGetServicesIfNeeded: (idName: string) => void,
  fetchCreateDomainIfNeeded: (idName: string, data: Object) => void
};

// Export this for unit testing more easily
export class CreateDomain extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      currentService: undefined,
      servicesList: [],
      currentPort: undefined,
      portsList: [],
      domainName: '',
      domainPath: '',
      isEnabledSSL: false
    };
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
      if (nextProps.getServicesReducer.data[0]) {
        const servicesList = nextProps.getServicesReducer.data.filter(
          service =>
            (service.domain &&
              (service.ports.length === 1 &&
                service.ports[0].protocol !== 'UDP')) ||
            (service.domain &&
              (service.ports.length >= 1 &&
                service.ports[0].protocol === 'TCP'))
        );
        const currentService = servicesList.find(
          service => service.name === this.props.match.params.idSrv
        );
        this.setState({
          ...this.state,
          currentService,
          currentPort: currentService ? currentService.ports[0] : undefined,
          portsList: currentService.ports,
          servicesList
        });
      }
    }
    if (
      this.props.getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      this.setState({
        ...this.state,
        uid: nextProps.getProfileReducer.data.id
      });
    }
  }
  handleChangeSelectService = value => {
    const currentService = this.state.servicesList.filter(
      service => service.name === value
    );
    this.setState({
      ...this.state,
      currentService: currentService[0],
      currentPort: currentService[0].ports[0],
      portsList: currentService[0].ports
    });
  };
  handleChangeSelectPort = value => {
    const currentPort = this.state.portsList.filter(
      port => port.port === parseInt(value, 10)
    );
    this.setState({
      ...this.state,
      currentPort: currentPort[0]
    });
  };
  handleChangeInput = (value, type) => {
    this.setState({
      ...this.state,
      [`${type}`]: value
    });
  };
  handleChangeCheckBox = () => {
    this.setState({
      ...this.state,
      isEnabledSSL: !this.state.isEnabledSSL
    });
  };
  handleSubmitCreateDomain = e => {
    e.preventDefault();
    const { fetchCreateDomainIfNeeded, match } = this.props;
    fetchCreateDomainIfNeeded(match.params.idName, this.state);
  };
  renderCreateDomain = () => {
    const { getServicesReducer } = this.props;
    if (
      !getServicesReducer.readyStatus ||
      getServicesReducer.readyStatus === GET_SERVICES_INVALID ||
      getServicesReducer.readyStatus === GET_SERVICES_REQUESTING
    ) {
      return (
        <div>
          {new Array(3).fill().map(() => (
            <img
              key={_.uniqueId()}
              src={require('../../images/create-dep-serv.svg')}
              style={{
                marginTop: '-2px',
                marginBottom: '30px',
                width: '100%'
              }}
              alt="create service"
            />
          ))}
        </div>
      );
    }

    if (getServicesReducer.readyStatus === GET_SERVICES_FAILURE) {
      return <p>Oops, Failed to load data of Services!</p>;
    }

    const {
      currentService,
      servicesList,
      currentPort,
      portsList,
      domainName,
      domainPath,
      isEnabledSSL
    } = this.state;
    return (
      <CreateDomainCard
        currentService={currentService}
        servicesList={servicesList}
        currentPort={currentPort}
        portsList={portsList}
        domainName={domainName}
        domainPath={domainPath}
        isEnabledSSL={isEnabledSSL}
        handleChangeSelectService={value =>
          this.handleChangeSelectService(value)
        }
        handleChangeSelectPort={value => this.handleChangeSelectPort(value)}
        handleChangeInput={(value, type) => this.handleChangeInput(value, type)}
        handleChangeCheckBox={this.handleChangeCheckBox}
      />
    );
  };

  render() {
    const { match, createDomainReducer } = this.props;
    // console.log(this.state);
    return (
      <div>
        <Helmet title={`Create Domain in ${match.params.idSrv}`} />
        <div className="container-fluid breadcrumbNavigation">
          <NavigationHeaderItem
            idName={match.params.idName}
            idService={match.params.idSrv}
            IdCreate="domain"
          />
        </div>
        <Notification
          status={createDomainReducer.status}
          name={createDomainReducer.idSrv}
          errorMessage={createDomainReducer.err}
        />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            <div className="row pageWidth">
              <div className="col-md-3 sideMenu" />
              <div className="col-md-9 pageContent">
                <form onSubmit={e => this.handleSubmitCreateDomain(e)}>
                  {this.renderCreateDomain()}
                  <LoadButton
                    type="submit"
                    buttonText="Create domain"
                    isFetching={createDomainReducer.isFetching}
                    baseClassButton="btnDeployment btnService"
                  />
                </form>
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
    getServicesReducer,
    createDomainReducer,
    getProfileReducer
  }: ReduxState) => ({
    getServicesReducer,
    createDomainReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetServicesIfNeeded: (idName: string) =>
      dispatch(actionGetServices.fetchGetServicesIfNeeded(idName)),
    fetchCreateDomainIfNeeded: (idName: string, data: Object) =>
      dispatch(actionCreateDomain.fetchCreateDomainIfNeeded(idName, data))
  })
);

export default connector(CreateDomain);
