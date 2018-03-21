/* @flow */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import _ from 'lodash/fp';

import type {
  Dispatch,
  Namespaces as NamespacesType,
  ReduxState
} from '../../types';
import * as actionGetSolutions from '../../actions/solutionsActions/getSolutions';
import * as actionRunSolutions from '../../actions/solutionActions/runSolution';
import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';
import {
  GET_SOLUTIONS_INVALID,
  GET_SOLUTIONS_REQUESTING,
  GET_SOLUTIONS_FAILURE
} from '../../constants/solutionsConstants/getSolutions';
import { RUN_SOLUTION_SUCCESS } from '../../constants/solutionConstants/runSolution';
import {
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_SUCCESS
} from '../../constants/namespacesConstants/getNamespaces';
import SolutionsList from '../../components/SolutionsList';
import SelectNamespaceModal from '../../components/CustomerModal/CreateSolutionModals/SelectNamespaceModal';

type Props = {
  history: Object,
  getSolutionsReducer: Object,
  runSolutionReducer: Object,
  getNamespacesReducer: NamespacesType,
  fetchGetSolutionsIfNeeded: () => void,
  fetchRunSolutionsIfNeeded: (idName: string, idSol: string) => void,
  fetchGetNamespacesIfNeeded: () => void
};

// Export this for unit testing more easily
export class Solutions extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      idName: null,
      displayedNamespaces: [],
      currentSolution: null,
      isOpenedSelectNamespace: false
    };
  }
  componentDidMount() {
    const {
      fetchGetSolutionsIfNeeded,
      fetchGetNamespacesIfNeeded
    } = this.props;
    fetchGetNamespacesIfNeeded();
    fetchGetSolutionsIfNeeded();
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getNamespacesReducer.readyStatus !==
        nextProps.getNamespacesReducer.readyStatus &&
      nextProps.getNamespacesReducer.readyStatus === GET_NAMESPACES_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedNamespaces: nextProps.getNamespacesReducer.data,
        idName: nextProps.getNamespacesReducer.data.length
          ? nextProps.getNamespacesReducer.data[0]
          : null
      });
    }
    if (
      this.props.runSolutionReducer.readyStatus !==
        nextProps.runSolutionReducer.readyStatus &&
      nextProps.runSolutionReducer.readyStatus === RUN_SOLUTION_SUCCESS
    ) {
      console.log('runSolutionReducer', nextProps.runSolutionReducer);
    }
  }
  handleClickRunSolution = solutionName => {
    this.setState({
      ...this.state,
      currentSolution: solutionName,
      isOpenedSelectNamespace: true
    });
  };
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpenedSelectNamespace: !this.state.isOpenedSelectNamespace,
      idName: this.state.displayedNamespaces.length
        ? this.state.displayedNamespaces[0]
        : null
    });
  };
  handleCreate = () => {
    const { idName, currentSolution } = this.state;
    this.props.fetchRunSolutionsIfNeeded(idName.name, currentSolution);
  };
  handleSelectNamespace = value => {
    const currentNamespace = this.state.displayedNamespaces.filter(
      ns => ns.name === value
    );
    this.setState({
      ...this.state,
      idName: currentNamespace ? currentNamespace[0] : null
    });
  };

  renderSolutionsList = () => {
    const {
      getSolutionsReducer,
      getNamespacesReducer,
      runSolutionReducer,
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
        <div className="solution-containers-wrapper mt-30">
          {new Array(6).fill().map(() => (
            <div
              key={_.uniqueId()}
              className="col-md-4 solution-container"
              style={{
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

    const {
      isOpenedSelectNamespace,
      displayedNamespaces,
      idName,
      currentSolution
    } = this.state;
    return (
      <div>
        {isOpenedSelectNamespace && (
          <SelectNamespaceModal
            isOpened={isOpenedSelectNamespace}
            namespaces={displayedNamespaces}
            namespace={idName}
            currentSolution={currentSolution}
            handleSelectNamespace={this.handleSelectNamespace}
            handleOpenCloseModal={this.handleOpenCloseModal}
            isFetching={runSolutionReducer.isFetching}
            readyStatus={runSolutionReducer.readyStatus}
            onHandleCreate={this.handleCreate}
          />
        )}
        <SolutionsList
          data={getSolutionsReducer.data}
          history={history}
          handleClickRunSolution={solutionName =>
            this.handleClickRunSolution(solutionName)
          }
        />
      </div>
    );
  };

  render() {
    // console.log(this.state);
    return (
      <div>
        <Helmet title="Solutions" />
        <div className="content-block">
          <div className="container no-back">{this.renderSolutionsList()}</div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getSolutionsReducer,
    runSolutionReducer,
    getNamespacesReducer
  }: ReduxState) => ({
    getSolutionsReducer,
    runSolutionReducer,
    getNamespacesReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetSolutionsIfNeeded: () =>
      dispatch(actionGetSolutions.fetchGetSolutionsIfNeeded()),
    fetchRunSolutionsIfNeeded: (idName: string, idSol: string) =>
      dispatch(actionRunSolutions.fetchRunSolutionsIfNeeded(idName, idSol)),
    fetchGetNamespacesIfNeeded: () =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded())
  })
);

export default connector(Solutions);
