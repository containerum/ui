/* @flow */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';
import * as actionGetSolutions from '../../actions/solutionsActions/getSolutions';
import * as actionGetSolution from '../../actions/solutionActions/getSolution';
import {
  GET_SOLUTIONS_INVALID,
  GET_SOLUTIONS_REQUESTING,
  GET_SOLUTIONS_FAILURE
} from '../../constants/solutionsConstants/getSolutions';
import {
  GET_SOLUTION_INVALID,
  GET_SOLUTION_REQUESTING,
  GET_SOLUTION_FAILURE
} from '../../constants/solutionConstants/getSolution';
import {
  RUN_SOLUTION_INVALID,
  RUN_SOLUTION_SUCCESS,
  RUN_SOLUTION_FAILURE
} from '../../constants/solutionConstants/runSolution';
import SolutionItem from '../../components/SolutionItem';
import RunSolutionItem from '../RunSolution';
import {
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_SUCCESS
} from '../../constants/namespacesConstants/getNamespaces';

type Props = {
  match: Object,
  getSolutionsReducer: Object,
  getSolutionReducer: Object,
  getNamespacesReducer: Object,
  fetchGetSolutionsIfNeeded: () => void,
  fetchGetNamespacesIfNeeded: () => void,
  fetchGetSolutionIfNeeded: (idSol: string) => void
};

// Export this for unit testing more easily
export class Solution extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      idName: null,
      displayedNamespaces: [],
      currentSolution: null,
      isOpenedSelectNamespace: false,
      statusOfRunSolution: RUN_SOLUTION_INVALID
    };
  }
  componentDidMount() {
    const {
      match,
      fetchGetSolutionsIfNeeded,
      fetchGetNamespacesIfNeeded,
      fetchGetSolutionIfNeeded
    } = this.props;
    fetchGetNamespacesIfNeeded();
    fetchGetSolutionsIfNeeded();
    fetchGetSolutionIfNeeded(match.params.idSol);
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
        : null,
      statusOfRunSolution: RUN_SOLUTION_INVALID
    });
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
  handleSolutionSuccess = () => {
    this.setState({
      ...this.state,
      statusOfRunSolution: RUN_SOLUTION_SUCCESS
    });
  };
  handleSolutionFailure = () => {
    this.setState({
      ...this.state,
      statusOfRunSolution: RUN_SOLUTION_FAILURE
    });
  };

  renderSolutionItem = () => {
    const {
      getSolutionReducer,
      getSolutionsReducer,
      getNamespacesReducer,
      match
    } = this.props;
    if (
      !getSolutionReducer.readyStatus ||
      getSolutionReducer.readyStatus === GET_SOLUTION_INVALID ||
      getSolutionReducer.readyStatus === GET_SOLUTION_REQUESTING ||
      !getSolutionsReducer.readyStatus ||
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_INVALID ||
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_REQUESTING ||
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING
    ) {
      return (
        <div className="row page-wrapper">
          <div
            className="col-md-4 page-left-side"
            style={{
              height: '500px',
              backgroundColor: '#f6f6f6'
            }}
          />
          <div
            className="col-md-8 page-right-side"
            style={{
              height: '700px',
              backgroundColor: '#f6f6f6'
            }}
          />
        </div>
      );
    }
    if (
      getSolutionReducer.readyStatus === GET_SOLUTION_FAILURE ||
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_FAILURE ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE
    ) {
      return <p>Oops, Failed to load data of Solution!</p>;
    }

    const {
      currentSolution,
      isOpenedSelectNamespace,
      idName,
      displayedNamespaces,
      statusOfRunSolution
    } = this.state;
    return (
      <div>
        <RunSolutionItem
          idName={idName}
          currentSolution={currentSolution}
          displayedNamespaces={displayedNamespaces}
          isOpenedSelectNamespace={isOpenedSelectNamespace}
          statusOfRunSolution={statusOfRunSolution}
          handleOpenCloseModal={this.handleOpenCloseModal}
          handleSelectNamespace={value => this.handleSelectNamespace(value)}
          handleSolutionFailure={this.handleSolutionFailure}
          handleSolutionSuccess={this.handleSolutionSuccess}
        />
        <SolutionItem
          text={getSolutionReducer.data}
          solution={getSolutionsReducer.data.filter(
            solution => solution.Name === match.params.idSol
          )}
          handleClickRunSolution={solutionName =>
            this.handleClickRunSolution(solutionName)
          }
        />
      </div>
    );
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <Helmet title={`Solution ${match.params.idSol}`} />
        <div className="content-block">
          <div className="container">{this.renderSolutionItem()}</div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getSolutionReducer,
    getSolutionsReducer,
    getNamespacesReducer
  }: ReduxState) => ({
    getSolutionReducer,
    getSolutionsReducer,
    getNamespacesReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetSolutionsIfNeeded: () =>
      dispatch(actionGetSolutions.fetchGetSolutionsIfNeeded()),
    fetchGetSolutionIfNeeded: (idSol: string) =>
      dispatch(actionGetSolution.fetchGetSolutionIfNeeded(idSol)),
    fetchGetNamespacesIfNeeded: () =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded())
  })
);

export default connector(Solution);
