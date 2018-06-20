/* @flow */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import _ from 'lodash/fp';

import styles from './index.scss';
import '../../theme/common.scss';
import globalStyles from '../../theme/global.scss';

import type {
  Dispatch,
  Namespaces as NamespacesType,
  ReduxState
} from '../../types';
import * as actionGetSolutions from '../../actions/solutionsActions/getSolutions';
import * as actionRunSolution from '../../actions/solutionActions/runSolution';
import * as actionGetEnvsSolution from '../../actions/solutionActions/getEnvsSolution';
import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';
import * as actionGetDeploymentsRunningSolution from '../../actions/solutionsActions/getDeploymentsRunningSolution';
import * as actionGetServicesRunningSolution from '../../actions/solutionsActions/getServicesRunningSolution';
import {
  GET_SOLUTIONS_INVALID,
  GET_SOLUTIONS_REQUESTING,
  GET_SOLUTIONS_FAILURE,
  GET_SOLUTIONS_SUCCESS
} from '../../constants/solutionsConstants/getSolutions';
import {
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_SUCCESS
} from '../../constants/namespacesConstants/getNamespaces';
import {
  RUN_SOLUTION_INVALID,
  RUN_SOLUTION_SUCCESS,
  RUN_SOLUTION_FAILURE
} from '../../constants/solutionConstants/runSolution';
import SolutionsList from '../../components/SolutionsList';
import RunSolutionModals from '../../components/CustomerModal/RunSolutionModals/RunSolutionModals';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';
import { GET_ENVS_SOLUTION_SUCCESS } from '../../constants/solutionConstants/getEnvsSolution';
import { GET_DEPLOYMENTS_RUNNING_SOLUTION_SUCCESS } from '../../constants/solutionsConstants/getDeploymentsRunningSolution';
import { GET_SERVICES_RUNNING_SOLUTION_SUCCESS } from '../../constants/solutionsConstants/getServicesRunningSolution';

type Props = {
  history: Object,
  getSolutionsReducer: Object,
  runSolutionReducer: Object,
  getEnvsSolutionReducer: Object,
  fetchGetEnvsSolutionIfNeeded: Object,
  getProfileReducer: Object,
  getNamespacesReducer: NamespacesType,
  getServicesRunningSolutionReducer: Object,
  getDeploymentsRunningSolutionReducer: Object,
  fetchGetSolutionsIfNeeded: () => void,
  fetchRunSolutionIfNeeded: (idName: string, data: Object) => void,
  fetchGetNamespacesIfNeeded: () => void,
  fetchGetServicesRunningSolutionIfNeeded: (
    idName: string,
    idSol: string
  ) => void,
  fetchGetDeploymentsRunningSolutionIfNeeded: (
    idName: string,
    idSol: string
  ) => void
};

export class Solutions extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      displayedNamespaces: [],
      currentNamespace: {},
      displayedSolutions: [],
      displayEnvsSolution: [],
      currentSolution: {},
      solutionName: '',
      currentView: 'first',
      isOpenedSelectNamespace: false,
      statusOfRunSolution: RUN_SOLUTION_INVALID
    };
  }
  componentDidMount() {
    const { fetchGetSolutionsIfNeeded } = this.props;
    fetchGetSolutionsIfNeeded();
  }
  componentWillUpdate(nextProps, nextState) {
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
      this.props.getNamespacesReducer.readyStatus !==
        nextProps.getNamespacesReducer.readyStatus &&
      nextProps.getNamespacesReducer.readyStatus === GET_NAMESPACES_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedNamespaces: nextProps.getNamespacesReducer.data,
        currentNamespace: nextProps.getNamespacesReducer.data.length
          ? nextProps.getNamespacesReducer.data[0]
          : {}
      });
    }
    if (
      this.props.getSolutionsReducer.readyStatus !==
        nextProps.getSolutionsReducer.readyStatus &&
      nextProps.getSolutionsReducer.readyStatus === GET_SOLUTIONS_SUCCESS
    ) {
      this.setState({
        ...this.state,
        currentSolution: nextProps.getSolutionsReducer.data.length
          ? nextProps.getSolutionsReducer.data[0]
          : null,
        displayedSolutions: nextProps.getSolutionsReducer.data
      });
    }
    if (
      this.props.getEnvsSolutionReducer.readyStatus !==
        nextProps.getEnvsSolutionReducer.readyStatus &&
      nextProps.getEnvsSolutionReducer.readyStatus === GET_ENVS_SOLUTION_SUCCESS
    ) {
      const envsSolutionWithOutHash = Object.assign(
        {},
        nextProps.getEnvsSolutionReducer.data
      );
      delete envsSolutionWithOutHash.HASH;
      this.setState({
        ...this.state,
        currentView: 'second',
        displayEnvsSolution: envsSolutionWithOutHash
      });
    }
    if (
      this.props.runSolutionReducer.readyStatus !==
        nextProps.runSolutionReducer.readyStatus &&
      nextProps.runSolutionReducer.readyStatus === RUN_SOLUTION_FAILURE
    ) {
      this.setState({
        ...this.state,
        currentView: 'third-error'
      });
    }
    if (nextState.isOpenedSelectNamespace && typeof document === 'object') {
      const getHtml = document.querySelector('html');
      getHtml.style.overflow = 'hidden';
    } else if (
      !nextState.isOpenedSelectNamespace &&
      typeof document === 'object'
    ) {
      const getHtml = document.querySelector('html');
      getHtml.style.overflow = 'auto';
    }
    if (
      this.props.runSolutionReducer.readyStatus !==
        nextProps.runSolutionReducer.readyStatus &&
      nextProps.runSolutionReducer.readyStatus === RUN_SOLUTION_SUCCESS
    ) {
      const { currentNamespace, solutionName } = this.state;
      this.props.fetchGetServicesRunningSolutionIfNeeded(
        currentNamespace.id,
        solutionName
      );
      this.props.fetchGetDeploymentsRunningSolutionIfNeeded(
        currentNamespace.id,
        solutionName
      );
    }
    if (
      (this.props.getDeploymentsRunningSolutionReducer.readyStatus !==
        nextProps.getDeploymentsRunningSolutionReducer.readyStatus &&
        nextProps.getDeploymentsRunningSolutionReducer.readyStatus ===
          GET_DEPLOYMENTS_RUNNING_SOLUTION_SUCCESS) ||
      (this.props.getServicesRunningSolutionReducer.readyStatus !==
        nextProps.getServicesRunningSolutionReducer.readyStatus &&
        nextProps.getServicesRunningSolutionReducer.readyStatus ===
          GET_SERVICES_RUNNING_SOLUTION_SUCCESS)
    ) {
      this.setState({
        ...this.state,
        currentView: 'third-success'
      });
    }
  }
  handleClickRunSolution = solutionTemplate => {
    const currentSolution = this.state.displayedSolutions.find(
      ns => ns.name === solutionTemplate
    );
    this.setState({
      ...this.state,
      currentSolution,
      isOpenedSelectNamespace: true
    });
  };
  handleOpenCloseModal = currentView => {
    const newState = {
      ...this.state,
      isOpenedSelectNamespace: !this.state.isOpenedSelectNamespace,
      currentNamespace: this.state.displayedNamespaces.length
        ? this.state.displayedNamespaces[0]
        : {},
      statusOfRunSolution: RUN_SOLUTION_INVALID,
      currentView: 'first'
    };
    if (currentView === 'second') {
      if (typeof window !== 'undefined') {
        const result = window.confirm('Are you sure?');
        if (result) {
          this.setState(newState);
        }
      }
    } else {
      this.setState(newState);
    }
  };
  openFirstModal = () => {
    this.setState({
      currentView: 'first'
    });
  };
  handleOpenPreviousModal = () => {
    this.setState({
      ...this.state,
      currentView: 'first'
    });
  };
  handleSelectNamespace = value => {
    const currentNamespace = this.state.displayedNamespaces.find(
      ns => ns.label === value
    );
    this.setState({
      ...this.state,
      currentNamespace
    });
  };
  handleSubmitCreatingEssence = (e, type) => {
    e.preventDefault();
    const {
      currentSolution,
      currentNamespace,
      displayEnvsSolution,
      solutionName
    } = this.state;
    if (currentSolution && currentNamespace && solutionName) {
      if (type === 'next') {
        this.props.fetchGetEnvsSolutionIfNeeded(currentSolution.name);
      } else if (type === 'deploy') {
        this.props.fetchRunSolutionIfNeeded(currentNamespace.id, {
          template: currentSolution.name,
          name: solutionName,
          branch: 'master',
          env: displayEnvsSolution
        });
      }
    }
  };
  handleChangeInputEnvironment = (value, env) => {
    const nextState = Object.assign({}, this.state.displayEnvsSolution);
    nextState[env] = value;
    this.setState({
      ...this.state,
      displayEnvsSolution: nextState
    });
  };
  handleChangeInput = value => {
    this.setState({
      ...this.state,
      solutionName: value
    });
  };

  renderSolutionsList = () => {
    const {
      getSolutionsReducer,
      getNamespacesReducer,
      getDeploymentsRunningSolutionReducer,
      getServicesRunningSolutionReducer,
      runSolutionReducer,
      getEnvsSolutionReducer,
      history
    } = this.props;
    if (
      !getSolutionsReducer.readyStatus ||
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_INVALID ||
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_REQUESTING ||
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING
    ) {
      return (
        <div className="row">
          {new Array(6).fill().map(() => (
            <div
              key={_.uniqueId()}
              className={`col-md-4  ${styles.solutionContainerPlaceholder}`}
              style={{
                display: 'inline-block',
                marginTop: 30,
                height: '307px',
                backgroundColor: '#f6f6f6'
              }}
            />
          ))}
        </div>
      );
    }
    if (
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_FAILURE ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE
    ) {
      return <p>Oops, Failed to load data of Solutions!</p>;
    }

    if (
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_SUCCESS &&
      getNamespacesReducer.readyStatus === GET_NAMESPACES_SUCCESS
    ) {
      const {
        currentView,
        currentSolution,
        solutionName,
        isOpenedSelectNamespace,
        currentNamespace,
        statusOfRunSolution,
        displayEnvsSolution
      } = this.state;
      return (
        <div>
          {currentSolution &&
            currentNamespace && (
              <RunSolutionModals
                currentNamespace={currentNamespace}
                currentView={currentView}
                currentSolution={currentSolution}
                displayedNamespaces={getNamespacesReducer.data}
                isOpenedSelectNamespace={isOpenedSelectNamespace}
                statusOfRunSolution={statusOfRunSolution}
                getEnvsData={displayEnvsSolution}
                solutionName={solutionName}
                history={history}
                getEnvsSolutionReducer={getEnvsSolutionReducer}
                runSolutionReducer={runSolutionReducer}
                deploymentsRunningSolution={
                  getDeploymentsRunningSolutionReducer.data
                }
                servicesRunningSolution={getServicesRunningSolutionReducer.data}
                handleOpenCloseModal={this.handleOpenCloseModal}
                openFirstModal={this.openFirstModal}
                handleOpenPreviousModal={this.handleOpenPreviousModal}
                handleSubmitCreatingEssence={this.handleSubmitCreatingEssence}
                handleChangeInputEnvironment={this.handleChangeInputEnvironment}
                handleChangeInput={this.handleChangeInput}
                handleSelectNamespace={value =>
                  this.handleSelectNamespace(value)
                }
              />
            )}
          <SolutionsList
            data={getSolutionsReducer.data}
            history={history}
            handleClickRunSolution={solutionTemplate =>
              this.handleClickRunSolution(solutionTemplate)
            }
          />
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div>
        <Helmet title="Solutions" />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            {this.renderSolutionsList()}
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getSolutionsReducer,
    runSolutionReducer,
    getEnvsSolutionReducer,
    getNamespacesReducer,
    getProfileReducer,
    getServicesRunningSolutionReducer,
    getDeploymentsRunningSolutionReducer
  }: ReduxState) => ({
    getSolutionsReducer,
    runSolutionReducer,
    getEnvsSolutionReducer,
    getNamespacesReducer,
    getProfileReducer,
    getServicesRunningSolutionReducer,
    getDeploymentsRunningSolutionReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetSolutionsIfNeeded: () =>
      dispatch(actionGetSolutions.fetchGetSolutionsIfNeeded()),
    fetchRunSolutionIfNeeded: (idName: string, data: Object) =>
      dispatch(actionRunSolution.fetchRunSolutionIfNeeded(idName, data)),
    fetchGetEnvsSolutionIfNeeded: (label: string) =>
      dispatch(actionGetEnvsSolution.fetchGetEnvsSolutionIfNeeded(label)),
    fetchGetNamespacesIfNeeded: (role: string) =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded(role)),

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
    fetchGetServicesRunningSolutionIfNeeded: (idName: string, idSol: string) =>
      dispatch(
        actionGetServicesRunningSolution.fetchGetServicesRunningSolutionIfNeeded(
          idName,
          idSol
        )
      )
  })
);

export default connector(Solutions);
