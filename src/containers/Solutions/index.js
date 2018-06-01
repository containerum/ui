/* @flow */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
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
import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';
import {
  GET_SOLUTIONS_INVALID,
  GET_SOLUTIONS_REQUESTING,
  GET_SOLUTIONS_FAILURE
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
import RunSolutionItem from '../RunSolution';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';

type Props = {
  history: Object,
  getSolutionsReducer: Object,
  getProfileReducer: Object,
  getNamespacesReducer: NamespacesType,
  fetchGetSolutionsIfNeeded: () => void,
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
      isOpenedSelectNamespace: false,
      statusOfRunSolution: RUN_SOLUTION_INVALID
    };
  }
  componentDidMount() {
    const { fetchGetSolutionsIfNeeded } = this.props;
    fetchGetSolutionsIfNeeded();
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
      this.props.getNamespacesReducer.readyStatus !==
        nextProps.getNamespacesReducer.readyStatus &&
      nextProps.getNamespacesReducer.readyStatus === GET_NAMESPACES_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedNamespaces: nextProps.getNamespacesReducer.data.namespaces,
        idName: nextProps.getNamespacesReducer.data.namespaces.length
          ? nextProps.getNamespacesReducer.data.namespaces[0]
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
      ns => ns.label === value
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

  renderSolutionsList = () => {
    const { getSolutionsReducer, getNamespacesReducer, history } = this.props;
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
    getNamespacesReducer,
    getProfileReducer
  }: ReduxState) => ({
    getSolutionsReducer,
    getNamespacesReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetSolutionsIfNeeded: () =>
      dispatch(actionGetSolutions.fetchGetSolutionsIfNeeded()),
    fetchGetNamespacesIfNeeded: (role: string) =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded(role))
  })
);

export default connector(Solutions);
