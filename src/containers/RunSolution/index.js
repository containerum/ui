/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import queryString from 'query-string';

import '../../theme/common.scss';

import type {
  Dispatch,
  Namespaces as NamespacesType,
  ReduxState
} from '../../types';
import * as actionRunSolution from '../../actions/solutionActions/runSolution';
import * as actionGetEnvsSolution from '../../actions/solutionActions/getEnvsSolution';
import * as actionGetDeploymentsRunningSolution from '../../actions/solutionsActions/getDeploymentsRunningSolution';
import * as actionGetServicesRunningSolution from '../../actions/solutionsActions/getServicesRunningSolution';
import {
  RUN_SOLUTION_INVALID,
  RUN_SOLUTION_SUCCESS,
  RUN_SOLUTION_FAILURE
} from '../../constants/solutionConstants/runSolution';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';
import RunSolutionModals from '../../components/CustomerModal/RunSolutionModals/RunSolutionModals';
import { GET_ENVS_SOLUTION_SUCCESS } from '../../constants/solutionConstants/getEnvsSolution';
import { GET_DEPLOYMENTS_RUNNING_SOLUTION_SUCCESS } from '../../constants/solutionsConstants/getDeploymentsRunningSolution';
import { GET_SERVICES_RUNNING_SOLUTION_SUCCESS } from '../../constants/solutionsConstants/getServicesRunningSolution';

type Props = {
  location: Object,
  history: Object,
  getProfileReducer: Object,
  isOpenedRunSolution: boolean,
  currentSolutionTemplate: string,
  getSolutionsReducer: Object,
  runSolutionReducer: Object,
  getEnvsSolutionReducer: Object,
  fetchGetEnvsSolutionIfNeeded: Object,
  getNamespacesReducer: NamespacesType,
  getServicesRunningSolutionReducer: Object,
  getDeploymentsRunningSolutionReducer: Object,
  handleOpenClose: () => void,
  fetchRunSolutionIfNeeded: (idName: string, data: Object) => void,
  fetchGetServicesRunningSolutionIfNeeded: (
    idName: string,
    idSol: string
  ) => void,
  fetchGetDeploymentsRunningSolutionIfNeeded: (
    idName: string,
    idSol: string
  ) => void
};

export class RunSolution extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentNamespace: {},
      displayEnvsSolution: [],
      currentSolution: {},
      solutionName: '',
      currentView: 'first',
      isOpenedSelectNamespace: false,
      statusOfRunSolution: RUN_SOLUTION_INVALID
    };
  }
  componentDidMount() {
    const currentSolution = this.props.getSolutionsReducer.data.find(
      solution => solution.name === this.props.currentSolutionTemplate
    );
    let currentNamespace = {};
    const { namespace } = queryString.parse(this.props.location.search);
    if (this.props.getNamespacesReducer.data.length) {
      [currentNamespace] = this.props.getNamespacesReducer.data;
    }
    if (namespace) {
      const ifCurrentNamespace = this.props.getNamespacesReducer.data.find(
        ns => ns.id === namespace
      );
      if (ifCurrentNamespace) {
        currentNamespace = ifCurrentNamespace;
      }
    }
    console.log(currentNamespace);
    this.setState({
      ...this.state,
      currentSolution:
        currentSolution || this.props.getSolutionsReducer.data[0],
      isOpenedSelectNamespace: this.props.isOpenedRunSolution,
      displayedNamespaces: this.props.getNamespacesReducer.data,
      currentNamespace
    });
  }
  componentWillUpdate(nextProps) {
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
    const currentSolution = this.props.getSolutionsReducer.data.find(
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
          this.props.handleOpenClose();
        }
      }
    } else {
      this.setState(newState);
      this.props.handleOpenClose();
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
    const regexp = /^[a-z][a-z0-9-]*$|^$/;
    if (value.search(regexp) !== -1) {
      this.setState({
        ...this.state,
        solutionName: value
      });
    }
  };

  render() {
    const {
      history,
      getNamespacesReducer,
      getDeploymentsRunningSolutionReducer,
      getServicesRunningSolutionReducer,
      runSolutionReducer,
      getEnvsSolutionReducer,
      getProfileReducer
    } = this.props;
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
        {this.props.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS &&
          currentSolution &&
          currentNamespace && (
            <RunSolutionModals
              history={history}
              login={getProfileReducer.data.login}
              currentNamespace={currentNamespace}
              currentView={currentView}
              currentSolution={currentSolution}
              displayedNamespaces={getNamespacesReducer.data}
              isOpenedSelectNamespace={isOpenedSelectNamespace}
              statusOfRunSolution={statusOfRunSolution}
              getEnvsData={displayEnvsSolution}
              solutionName={solutionName}
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
              handleSelectNamespace={value => this.handleSelectNamespace(value)}
            />
          )}
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
    fetchRunSolutionIfNeeded: (idName: string, data: Object) =>
      dispatch(actionRunSolution.fetchRunSolutionIfNeeded(idName, data)),
    fetchGetEnvsSolutionIfNeeded: (label: string) =>
      dispatch(actionGetEnvsSolution.fetchGetEnvsSolutionIfNeeded(label)),

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

export default connector(RunSolution);
