/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import classNames from 'classnames/bind';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetNamespace from '../../actions/namespaceActions/getNamespace';
import * as actionGetRunningSolution from '../../actions/solutionActions/getRunningSolution';
import * as actionDeleteRunningSolutions from '../../actions/solutionActions/deleteRunningSolution';
import * as actionGetDeploymentsRunningSolution from '../../actions/solutionsActions/getDeploymentsRunningSolution';
import * as actionDeleteDeployment from '../../actions/deploymentActions/deleteDeployment';
import * as actionGetServicesRunningSolution from '../../actions/solutionsActions/getServicesRunningSolution';
import * as actionDeleteService from '../../actions/serviceActions/deleteService';
import {
  GET_DEPLOYMENTS_RUNNING_SOLUTION_INVALID,
  GET_DEPLOYMENTS_RUNNING_SOLUTION_REQUESTING,
  GET_DEPLOYMENTS_RUNNING_SOLUTION_FAILURE,
  GET_DEPLOYMENTS_RUNNING_SOLUTION_SUCCESS
} from '../../constants/solutionsConstants/getDeploymentsRunningSolution';
import {
  DELETE_DEPLOYMENT_SUCCESS,
  DELETE_DEPLOYMENT_REQUESTING
} from '../../constants/deploymentConstants/deleteDeployment';
import {
  GET_SERVICES_RUNNING_SOLUTION_INVALID,
  GET_SERVICES_RUNNING_SOLUTION_REQUESTING,
  GET_SERVICES_RUNNING_SOLUTION_FAILURE,
  GET_SERVICES_RUNNING_SOLUTION_SUCCESS
} from '../../constants/solutionsConstants/getServicesRunningSolution';
import { DELETE_RUNNING_SOLUTION_REQUESTING } from '../../constants/solutionConstants/deleteRunningSolution';
import {
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_REQUESTING
} from '../../constants/serviceConstants/deleteService';
import {
  GET_NAMESPACE_FAILURE,
  GET_NAMESPACE_INVALID,
  GET_NAMESPACE_REQUESTING
} from '../../constants/namespaceConstants/getNamespace';
import {
  GET_RUNNING_SOLUTION_FAILURE,
  GET_RUNNING_SOLUTION_INVALID,
  GET_RUNNING_SOLUTION_REQUESTING
} from '../../constants/solutionConstants/getRunningSolution';
import ServicesList from '../../components/ServicesList';
import DeploymentsList from '../../components/DeploymentsList';
import Notification from '../Notification';
import DeleteModal from '../../components/CustomerModal/DeleteModal';
// import getSolutionImage from '../../functions/getSolutionImage';
import NavigationHeaderItem from '../NavigationHeader';
import globalStyles from '../../theme/global.scss';

const globalClassName = classNames.bind(globalStyles);
const btnClassName = globalClassName('btnBlue', 'btnDepl');

type Props = {
  getDeploymentsRunningSolutionReducer: Object,
  getRunningSolutionReducer: Object,
  deleteDeploymentReducer: Object,
  deleteRunningSolutionReducer: Object,
  fetchGetNamespaceIfNeeded: (idName: string) => void,
  fetchGetRunningSolutionIfNeeded: (idName: string, idSol: string) => void,
  fetchDeleteRunningSolutionIfNeeded: (idName: string, idSol: string) => void,
  fetchGetDeploymentsRunningSolutionIfNeeded: (
    idName: string,
    idSol: string
  ) => void,
  fetchDeleteDeploymentIfNeeded: (idName: string, idDep: string) => void,
  getServicesRunningSolutionReducer: Object,
  getNamespaceReducer: Object,
  deleteServiceReducer: Object,
  fetchGetServicesRunningSolutionIfNeeded: (
    idName: string,
    idSol: string
  ) => void,
  fetchDeleteServiceIfNeeded: (idName: string, idSvr: string) => void,
  history: Object,
  match: Object
};

// Export this for unit testing more easily
export class RunningSolution extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      inputName: '',
      idDep: null,
      isOpened: false,
      isOpenedSol: false,
      displayedDeployments: [],
      displayedService: []
    };
  }
  componentDidMount() {
    const {
      fetchGetNamespaceIfNeeded,
      fetchGetDeploymentsRunningSolutionIfNeeded,
      fetchGetServicesRunningSolutionIfNeeded,
      fetchGetRunningSolutionIfNeeded,
      match
    } = this.props;
    const { idName, idSol } = match.params;
    fetchGetNamespaceIfNeeded(idName);
    fetchGetRunningSolutionIfNeeded(idName, idSol);
    fetchGetServicesRunningSolutionIfNeeded(idName, idSol);
    fetchGetDeploymentsRunningSolutionIfNeeded(idName, idSol);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getDeploymentsRunningSolutionReducer.readyStatus !==
        nextProps.getDeploymentsRunningSolutionReducer.readyStatus &&
      nextProps.getDeploymentsRunningSolutionReducer.readyStatus ===
        GET_DEPLOYMENTS_RUNNING_SOLUTION_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedDeployments:
          nextProps.getDeploymentsRunningSolutionReducer.data
      });
    }
    if (
      this.props.deleteDeploymentReducer.readyStatus !==
        nextProps.deleteDeploymentReducer.readyStatus &&
      nextProps.deleteDeploymentReducer.readyStatus ===
        DELETE_DEPLOYMENT_SUCCESS
    ) {
      const displayedDep = this.state.displayedDeployments.filter(
        deployment =>
          nextProps.deleteDeploymentReducer.idDep !== deployment.name
      );
      this.setState({
        ...this.state,
        displayedDeployments: displayedDep
      });
    }
    if (
      this.props.getServicesRunningSolutionReducer.readyStatus !==
        nextProps.getServicesRunningSolutionReducer.readyStatus &&
      nextProps.getServicesRunningSolutionReducer.readyStatus ===
        GET_SERVICES_RUNNING_SOLUTION_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedService: nextProps.getServicesRunningSolutionReducer.data
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
  onHandleDelete = idDep => {
    const { fetchDeleteDeploymentIfNeeded, match } = this.props;
    fetchDeleteDeploymentIfNeeded(match.params.idName, idDep);
  };
  onHandleDeleteSolution = () => {
    const { match, fetchDeleteRunningSolutionIfNeeded } = this.props;
    fetchDeleteRunningSolutionIfNeeded(match.params.idName, match.params.idSol);
  };
  handleInputName = inputName => {
    this.setState({
      ...this.state,
      inputName
    });
  };
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpened: !this.state.isOpened,
      idDep: null,
      inputName: ''
    });
  };
  handleOpenCloseSolutionModal = () => {
    this.setState({
      ...this.state,
      isOpenedSol: !this.state.isOpenedSol,
      idDep: null,
      inputName: ''
    });
  };
  handleDeleteService = idSrv => {
    const { match } = this.props;
    this.props.fetchDeleteServiceIfNeeded(match.params.idName, idSrv);
  };
  handleDeleteDeployment = idDep => {
    this.setState({
      ...this.state,
      idDep,
      isOpened: true
    });
  };
  handleClickDeleteSolution = () => {
    this.setState({
      ...this.state,
      isOpenedSol: true
    });
  };

  renderSolution = () => {
    const {
      getRunningSolutionReducer,
      deleteRunningSolutionReducer,
      getNamespaceReducer,
      getServicesRunningSolutionReducer
    } = this.props;

    if (
      !getNamespaceReducer.readyStatus ||
      getNamespaceReducer.readyStatus === GET_NAMESPACE_INVALID ||
      getNamespaceReducer.readyStatus === GET_NAMESPACE_REQUESTING ||
      !getRunningSolutionReducer.readyStatus ||
      getRunningSolutionReducer.readyStatus === GET_RUNNING_SOLUTION_INVALID ||
      getRunningSolutionReducer.readyStatus ===
        GET_RUNNING_SOLUTION_REQUESTING ||
      !getServicesRunningSolutionReducer.readyStatus ||
      getServicesRunningSolutionReducer.readyStatus ===
        GET_SERVICES_RUNNING_SOLUTION_INVALID ||
      getServicesRunningSolutionReducer.readyStatus ===
        GET_SERVICES_RUNNING_SOLUTION_REQUESTING ||
      deleteRunningSolutionReducer.readyStatus ===
        DELETE_RUNNING_SOLUTION_REQUESTING
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

    if (
      getNamespaceReducer.readyStatus === GET_NAMESPACE_FAILURE ||
      getRunningSolutionReducer.readyStatus === GET_RUNNING_SOLUTION_FAILURE ||
      getServicesRunningSolutionReducer.readyStatus ===
        GET_SERVICES_RUNNING_SOLUTION_FAILURE
    ) {
      return <p>Oops, Failed to load data of Solution!</p>;
    }
    const { name, url, template } = getRunningSolutionReducer.data;
    const imageHref = `${url}/${template}.png`
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/tree', '');
    const accessToNamespace = getNamespaceReducer.data.access;
    const firstServiceWithDomain = this.state.displayedService.find(
      service => (service ? service.domain : null)
    );
    let openApplication = url;
    if (firstServiceWithDomain) {
      const { ports } = firstServiceWithDomain;
      openApplication = `http://${firstServiceWithDomain.domain}:${
        ports[0].port
      }`;
    }
    return (
      <div className="content-block-container content-block_common-statistic container ">
        <div className="content-block-header active-solution-header">
          <div className="active-solution-wrapper">
            <div className="solution-container-img-block active-solution-block">
              <img src={imageHref} alt={name} />
            </div>
            <div className="content-block-header-label">
              <div className="content-block-header-label__text content-block-header-label_main">
                {name}{' '}
                <span className="content-block-header-label__descript">
                  solution
                </span>
              </div>
              <a
                href={openApplication}
                target="_blank"
                className={btnClassName}
              >
                open application
              </a>
            </div>
          </div>

          <div className="content-block-header-extra-panel">
            <div className="content-block-header-extra-panel dropdown no-arrow">
              {accessToNamespace !== 'read' && (
                <i
                  className={`${globalStyles.contentBlockTableMore} ${
                    globalStyles.dropdownToggle
                  }
                          ${globalStyles.ellipsisRoleMore} ion-more `}
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                />
              )}
              {accessToNamespace !== 'read' && (
                <ul
                  className={` dropdown-menu dropdown-menu-right ${
                    globalStyles.dropdownMenu
                  }`}
                  role="menu"
                >
                  <button
                    className={`dropdown-item text-danger ${
                      globalStyles.dropdownItem
                    }`}
                    onClick={this.handleClickDeleteSolution}
                  >
                    Delete
                  </button>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  renderDeploymentsList = () => {
    const {
      getDeploymentsRunningSolutionReducer,
      getNamespaceReducer,
      deleteDeploymentReducer,
      match
    } = this.props;

    if (
      !getNamespaceReducer.readyStatus ||
      getNamespaceReducer.readyStatus === GET_NAMESPACE_INVALID ||
      getNamespaceReducer.readyStatus === GET_NAMESPACE_REQUESTING ||
      !getDeploymentsRunningSolutionReducer.readyStatus ||
      getDeploymentsRunningSolutionReducer.readyStatus ===
        GET_DEPLOYMENTS_RUNNING_SOLUTION_INVALID ||
      getDeploymentsRunningSolutionReducer.readyStatus ===
        GET_DEPLOYMENTS_RUNNING_SOLUTION_REQUESTING ||
      deleteDeploymentReducer.readyStatus === DELETE_DEPLOYMENT_REQUESTING
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
      getNamespaceReducer.readyStatus === GET_NAMESPACE_FAILURE ||
      getDeploymentsRunningSolutionReducer.readyStatus ===
        GET_DEPLOYMENTS_RUNNING_SOLUTION_FAILURE
    ) {
      return <p>Oops, Failed to load data of Deployments!</p>;
    }

    return (
      <DeploymentsList
        data={this.state.displayedDeployments}
        dataNamespace={getNamespaceReducer.data}
        handleDeleteDeployment={idDep => this.handleDeleteDeployment(idDep)}
        history={this.props.history}
        idName={match.params.idName}
      />
    );
  };
  renderServicesList = () => {
    const {
      getServicesRunningSolutionReducer,
      getNamespaceReducer,
      deleteServiceReducer,
      match
    } = this.props;

    if (
      !getNamespaceReducer.readyStatus ||
      getNamespaceReducer.readyStatus === GET_NAMESPACE_INVALID ||
      getNamespaceReducer.readyStatus === GET_NAMESPACE_REQUESTING ||
      !getServicesRunningSolutionReducer.readyStatus ||
      getServicesRunningSolutionReducer.readyStatus ===
        GET_SERVICES_RUNNING_SOLUTION_INVALID ||
      getServicesRunningSolutionReducer.readyStatus ===
        GET_SERVICES_RUNNING_SOLUTION_REQUESTING ||
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
      getNamespaceReducer.readyStatus === GET_NAMESPACE_FAILURE ||
      getServicesRunningSolutionReducer.readyStatus ===
        GET_SERVICES_RUNNING_SOLUTION_FAILURE
    ) {
      return <p>Oops, Failed to load data of Services!</p>;
    }

    return (
      <ServicesList
        data={this.state.displayedService}
        dataNamespace={getNamespaceReducer.data}
        handleDeleteService={idSrv => this.handleDeleteService(idSrv)}
        history={this.props.history}
        idName={match.params.idName}
      />
    );
  };

  render() {
    const {
      deleteDeploymentReducer,
      deleteServiceReducer,
      deleteRunningSolutionReducer,
      getDeploymentsRunningSolutionReducer,
      match
    } = this.props;
    const { idSol } = match.params;
    const { status, idDep, err } = deleteDeploymentReducer;
    const { status: statusSrv, idSrv, err: errSrv } = deleteServiceReducer;
    const {
      status: statusSol,
      idSol: deleteSol,
      err: errSol
    } = deleteRunningSolutionReducer;
    const {
      inputName,
      isOpened,
      isOpenedSol,
      idDep: currentIdDep
    } = this.state;
    let currentDepl;
    if (
      getDeploymentsRunningSolutionReducer.readyStatus ===
      GET_DEPLOYMENTS_RUNNING_SOLUTION_SUCCESS
    ) {
      currentDepl = getDeploymentsRunningSolutionReducer.data.find(
        depl => depl.name === currentIdDep
      );
    }
    // const { srcLogo, logoHeight } = getSolutionImage(name, '85px');
    return (
      <div>
        <NavigationHeaderItem idName={match.params.idName} />
        <Notification status={status} name={idDep} errorMessage={err} />
        <Notification status={statusSrv} name={idSrv} errorMessage={errSrv} />
        <Notification
          status={statusSol}
          name={deleteSol}
          errorMessage={errSol}
        />
        {currentDepl && (
          <DeleteModal
            type="Deployment"
            inputName={inputName}
            name={currentIdDep}
            typeName={currentDepl.name}
            isOpened={isOpened}
            minLengthName={1}
            handleInputName={this.handleInputName}
            handleOpenCloseModal={this.handleOpenCloseModal}
            onHandleDelete={this.onHandleDelete}
          />
        )}
        <DeleteModal
          type="Solution"
          inputName={inputName}
          name={idSol}
          typeName={idSol}
          isOpened={isOpenedSol}
          minLengthName={1}
          handleInputName={this.handleInputName}
          handleOpenCloseModal={this.handleOpenCloseSolutionModal}
          onHandleDelete={this.onHandleDeleteSolution}
        />
        <div className="content-block">{this.renderSolution()}</div>
        <div className="content-block">
          <div className="content-block-container container ">
            <div className="active-solution-title">Deployments</div>
            <div className="content-block-content full">
              {this.renderDeploymentsList()}
            </div>
          </div>
        </div>
        <div className="content-block">
          <div className="content-block-container container ">
            <div className="active-solution-title">Services</div>
            <div className="content-block-content full">
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
    getDeploymentsRunningSolutionReducer,
    getNamespaceReducer,
    deleteDeploymentReducer,
    getServicesRunningSolutionReducer,
    deleteServiceReducer,
    getRunningSolutionReducer,
    deleteRunningSolutionReducer
  }: ReduxState) => ({
    getDeploymentsRunningSolutionReducer,
    getNamespaceReducer,
    deleteDeploymentReducer,
    getServicesRunningSolutionReducer,
    deleteServiceReducer,
    getRunningSolutionReducer,
    deleteRunningSolutionReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespaceIfNeeded: (idName: string) =>
      dispatch(actionGetNamespace.fetchGetNamespaceIfNeeded(idName)),
    fetchGetRunningSolutionIfNeeded: (idName: string, idSol: string) =>
      dispatch(
        actionGetRunningSolution.fetchGetRunningSolutionIfNeeded(idName, idSol)
      ),
    fetchDeleteRunningSolutionIfNeeded: (idName: string, idSol: string) =>
      dispatch(
        actionDeleteRunningSolutions.fetchDeleteRunningSolutionIfNeeded(
          idName,
          idSol
        )
      ),
    fetchGetDeploymentsRunningSolutionIfNeeded: (
      idName: string,
      idSol: string
    ) =>
      dispatch(
        actionGetDeploymentsRunningSolution.fetchGetDeploymentsRunningSolutionIfNeeded(
          idName,
          idSol
        )
      ),
    fetchDeleteDeploymentIfNeeded: (idName: string, idDep: string) =>
      dispatch(
        actionDeleteDeployment.fetchDeleteDeploymentIfNeeded(idName, idDep)
      ),
    fetchGetServicesRunningSolutionIfNeeded: (idName: string, idSol: string) =>
      dispatch(
        actionGetServicesRunningSolution.fetchGetServicesRunningSolutionIfNeeded(
          idName,
          idSol
        )
      ),
    fetchDeleteServiceIfNeeded: (idName: string, idSrv: string) =>
      dispatch(actionDeleteService.fetchDeleteServiceIfNeeded(idName, idSrv))
  })
);

export default connector(RunningSolution);
