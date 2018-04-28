/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';
import Scrollspy from 'react-scrollspy';

import scrollById from '../../functions/scrollById';
import * as actionGetDeployments from '../../actions/deploymentsActions/getDeployments';
import * as actionCreateInternalService from '../../actions/serviceActions/createInternalService';
import * as actionCreateExternalService from '../../actions/serviceActions/createExternalService';
import {
  GET_DEPLOYMENTS_INVALID,
  GET_DEPLOYMENTS_REQUESTING,
  GET_DEPLOYMENTS_FAILURE,
  GET_DEPLOYMENTS_SUCCESS
} from '../../constants/deploymentsConstants/getDeployments';
import {
  CREATE_EXTERNAL_SERVICE_SUCCESS,
  CREATE_EXTERNAL_SERVICE_REQUESTING
} from '../../constants/serviceConstants/createExternalService';
import { CREATE_INTERNAL_SERVICE_SUCCESS } from '../../constants/serviceConstants/createInternalService';
import type { Dispatch, ReduxState } from '../../types';
import NavigationHeaderItem from '../NavigationHeader';
import CreateServiceCardItem from './CreateServiceCard';
import LoadButton from '../../components/LoadButton';
import Notification from '../Notification';
import { routerLinks } from '../../config';
import globalStyles from '../../theme/global.scss';

type Props = {
  getDeploymentsReducer: Object,
  createExternalServiceReducer: Object,
  createInternalServiceReducer: Object,
  match: Object,
  history: Object,
  fetchGetDeploymentsIfNeeded: (idName: string) => void,
  fetchCreateInternalServiceIfNeeded: (idName: string, data: Object) => void,
  fetchCreateExternalServiceIfNeeded: (idName: string, data: Object) => void
};

// Export this for unit testing more easily
export class CreateService extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentDeployment: '',
      deploymentList: [],
      isActiveInternal: false,
      isActiveExternal: false
    };
  }
  componentDidMount() {
    const { fetchGetDeploymentsIfNeeded, match } = this.props;
    fetchGetDeploymentsIfNeeded(match.params.idName);
  }
  componentWillUpdate(nextProps) {
    const { match } = this.props;
    if (
      this.props.getDeploymentsReducer.readyStatus !==
        nextProps.getDeploymentsReducer.readyStatus &&
      nextProps.getDeploymentsReducer.readyStatus === GET_DEPLOYMENTS_SUCCESS
    ) {
      if (nextProps.getDeploymentsReducer.data[0]) {
        this.setState({
          ...this.state,
          currentDeployment: nextProps.getDeploymentsReducer.data[0].name,
          deploymentList: nextProps.getDeploymentsReducer.data
        });
      }
    }
    if (
      this.props.createInternalServiceReducer.readyStatus !==
        nextProps.createInternalServiceReducer.readyStatus &&
      nextProps.createInternalServiceReducer.readyStatus ===
        CREATE_INTERNAL_SERVICE_SUCCESS &&
      nextProps.createExternalServiceReducer.readyStatus !==
        CREATE_EXTERNAL_SERVICE_REQUESTING
    ) {
      this.props.history.push(routerLinks.namespaces);
    } else if (
      this.props.createExternalServiceReducer.readyStatus !==
        nextProps.createExternalServiceReducer.readyStatus &&
      nextProps.createExternalServiceReducer.readyStatus ===
        CREATE_EXTERNAL_SERVICE_SUCCESS
    ) {
      this.props.history.push(
        routerLinks.createdExternalServiceSuccessfulLink(
          match.params.idName,
          this.state.externalSrvNameValue
        )
      );
    }
  }
  handleSubmitCreateService = e => {
    e.preventDefault();
    const serviceObject = this.state;
    const {
      match,
      fetchCreateInternalServiceIfNeeded,
      fetchCreateExternalServiceIfNeeded
    } = this.props;
    if (
      serviceObject.externalSrvObject.length &&
      serviceObject.externalSrvObject[0].externalSrvTargetPort
    ) {
      fetchCreateExternalServiceIfNeeded(match.params.idName, serviceObject);
    }
    if (
      serviceObject.internalSrvObject.length &&
      serviceObject.internalSrvObject[0].internalSrvPort
    ) {
      fetchCreateInternalServiceIfNeeded(match.params.idName, serviceObject);
    }
  };
  handleChange = e => {
    this.setState({
      ...this.state,
      currentDeployment: e.target.value
    });
  };
  handleChangeState = obj => {
    const state = Object.assign({}, this.state, obj);
    this.setState(state);
  };
  renderServiceSidebar = () => {
    const { getDeploymentsReducer } = this.props;
    if (
      !getDeploymentsReducer.readyStatus ||
      getDeploymentsReducer.readyStatus === GET_DEPLOYMENTS_INVALID ||
      getDeploymentsReducer.readyStatus === GET_DEPLOYMENTS_REQUESTING
    ) {
      return (
        <div style={{ marginTop: '40px', width: '80%' }}>
          {new Array(3)
            .fill()
            .map(() => (
              <img
                key={_.uniqueId()}
                src={require('../../images/profile-sidebar-big.svg')}
                style={{ width: '100%', marginBottom: '20px' }}
                alt="profile-sidebar"
              />
            ))}
        </div>
      );
    }

    return (
      <Scrollspy
        items={['target-deployment', 'internal-service', 'external-service']}
        style={{
          padding: '50px 0',
          margin: '-40px 0 0'
        }}
        currentClassName="active"
      >
        <div className="sideMenuHeader">
          <div
            onClick={() => scrollById('target-deployment')}
            onKeyPress={() => scrollById('target-deployment')}
            role="presentation"
          >
            Target Deployment
          </div>
        </div>
        <div className="sideMenuHeader">
          <div
            onClick={() => scrollById('internal-service')}
            onKeyPress={() => scrollById('internal-service')}
            role="presentation"
          >
            Internal Service
          </div>
        </div>
        <div className="sideMenuHeader">
          <div
            onClick={() => scrollById('external-service')}
            onKeyPress={() => scrollById('external-service')}
            role="presentation"
          >
            External Service
          </div>
        </div>
      </Scrollspy>
    );
  };
  renderCreateService = () => {
    const { getDeploymentsReducer, match } = this.props;
    if (
      !getDeploymentsReducer.readyStatus ||
      getDeploymentsReducer.readyStatus === GET_DEPLOYMENTS_INVALID ||
      getDeploymentsReducer.readyStatus === GET_DEPLOYMENTS_REQUESTING
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

    if (getDeploymentsReducer.readyStatus === GET_DEPLOYMENTS_FAILURE) {
      return <p>Oops, Failed to load data of Service!</p>;
    }

    return (
      <CreateServiceCardItem
        deploymentsData={getDeploymentsReducer.data}
        idName={match.params.idName}
        handleSubmitCreateService={e => this.handleSubmitCreateService(e)}
        handleChangeState={obj => this.handleChangeState(obj)}
        handleChangeActivityInternal={() =>
          this.setState({
            ...this.state,
            isActiveInternal: !this.state.isActiveInternal,
            internalSrvObject: [
              {
                internalSrvName: '',
                internalSrvPort: '',
                internalSrvTargetPort: '',
                intServiceType: 'TCP',
                id: _.uniqueId(),
                index: 0
              }
            ]
          })
        }
        handleChangeActivityExternal={() =>
          this.setState({
            ...this.state,
            isActiveExternal: !this.state.isActiveExternal,
            externalSrvObject: [
              {
                externalSrvName: '',
                externalSrvTargetPort: '',
                extServiceType: 'TCP',
                id: _.uniqueId(),
                index: 0
              }
            ]
          })
        }
      />
    );
  };

  render() {
    const {
      match,
      createExternalServiceReducer,
      createInternalServiceReducer
    } = this.props;
    const {
      currentDeployment,
      deploymentList,
      isActiveInternal,
      isActiveExternal
    } = this.state;
    // console.log(this.state);
    return (
      <div>
        <Helmet title={`Create Service in ${match.params.idName}`} />
        <div className="container-fluid breadcrumbNavigation">
          <NavigationHeaderItem
            idName={match.params.idName}
            IdCreate="service"
          />
        </div>
        <Notification
          status={createInternalServiceReducer.status}
          name={createInternalServiceReducer.idSrv}
          errorMessage={createInternalServiceReducer.err}
        />
        <Notification
          status={createExternalServiceReducer.status}
          name={createExternalServiceReducer.idSrv}
          errorMessage={createExternalServiceReducer.err}
        />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            <div className="row pageWidth">
              <div
                className="col-md-3 sideMenu"
                style={{ padding: '20px 0px' }}
              >
                {this.renderServiceSidebar()}
              </div>
              <div className="col-md-9 pageContent">
                <form onSubmit={e => this.handleSubmitCreateService(e)}>
                  <div
                    className="blockContainer blockContainerPadin"
                    id="target-deployment"
                  >
                    <div className="col-md-6">
                      <div className="containerTitle">
                        <span className={!currentDeployment ? 'isHidden' : ''}>
                          *
                        </span>{' '}
                        Target Deployment
                        {/* <Tooltip */}
                        {/* placement='top' */}
                        {/* trigger={['hover']} */}
                        {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
                        {/* > */}
                        {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
                        {/* </Tooltip> */}
                      </div>
                      {currentDeployment ? (
                        <div className="containerSubTitle marBot30">
                          Choose Deployment
                        </div>
                      ) : (
                        <div className="containerSubTitle marBot30">
                          You must have Deployment to create a Service
                        </div>
                      )}

                      {currentDeployment ? (
                        <div className="select-wrapper">
                          <div className="select-arrow-3" />
                          <div className="select-arrow-3" />
                          <select
                            name="deployment"
                            className="selectCustom selectGreyColor"
                            value={currentDeployment}
                            onChange={e => this.handleChange(e)}
                            required
                          >
                            {deploymentList.map(item => (
                              <option key={item.name} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <NavLink
                          to={`/namespace/${
                            match.params.idName
                          }/createDeployment`}
                          className="deployBtn"
                        >
                          Create Deployment
                        </NavLink>
                      )}

                      <div className="helperText isHidden">
                        Select the deployment for which the Service applies
                      </div>
                    </div>
                  </div>
                  {this.renderCreateService()}
                  {(isActiveInternal || isActiveExternal) && (
                    <LoadButton
                      type="submit"
                      buttonText="Create service"
                      isFetching={
                        createExternalServiceReducer.isFetching ||
                        createInternalServiceReducer.isFetching
                      }
                      baseClassButton="btnDeployment btnService"
                    />
                  )}
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
    getDeploymentsReducer,
    createExternalServiceReducer,
    createInternalServiceReducer
  }: ReduxState) => ({
    getDeploymentsReducer,
    createExternalServiceReducer,
    createInternalServiceReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetDeploymentsIfNeeded: (idName: string) =>
      dispatch(actionGetDeployments.fetchGetDeploymentsIfNeeded(idName)),
    fetchCreateInternalServiceIfNeeded: (idName: string, data: Object) =>
      dispatch(
        actionCreateInternalService.fetchCreateInternalServiceIfNeeded(
          idName,
          data
        )
      ),
    fetchCreateExternalServiceIfNeeded: (idName: string, data: Object) =>
      dispatch(
        actionCreateExternalService.fetchCreateExternalServiceIfNeeded(
          idName,
          data
        )
      )
  })
);

export default connector(CreateService);
