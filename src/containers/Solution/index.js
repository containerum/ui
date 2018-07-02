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
import SolutionItem from '../../components/SolutionItem';
import RunSolutionModal from '../RunSolution';
import {
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING
} from '../../constants/namespacesConstants/getNamespaces';

import styles from './index.scss';
import globalStyles from '../../theme/global.scss';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';

type Props = {
  history: Object,
  match: Object,
  getSolutionsReducer: Object,
  getSolutionReducer: Object,
  getProfileReducer: Object,
  getNamespacesReducer: Object,
  fetchGetSolutionsIfNeeded: () => void,
  fetchGetNamespacesIfNeeded: () => void,
  fetchGetSolutionIfNeeded: (idSol: string) => void
};

export class Solution extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isOpenedRunSolution: false,
      currentSolutionTemplate: null
    };
  }
  componentDidMount() {
    const {
      match,
      fetchGetSolutionsIfNeeded,
      fetchGetSolutionIfNeeded
    } = this.props;
    fetchGetSolutionsIfNeeded();
    fetchGetSolutionIfNeeded(match.params.idSol);
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
    if (nextState.isOpenedRunSolution && typeof document === 'object') {
      const getHtml = document.querySelector('html');
      getHtml.style.overflow = 'hidden';
    } else if (!nextState.isOpenedRunSolution && typeof document === 'object') {
      const getHtml = document.querySelector('html');
      getHtml.style.overflow = 'auto';
    }
  }
  componentWillUnmount() {
    if (typeof document === 'object') {
      const getHtml = document.querySelector('html');
      getHtml.style.overflow = 'auto';
    }
  }

  handleClickRunSolution = solutionTemplate => {
    this.setState({
      ...this.state,
      isOpenedRunSolution: true,
      currentSolutionTemplate: solutionTemplate
    });
    // this.props.history.push(`/solutions/${solutionTemplate}/runSolution`);
  };
  handleOpenClose = () => {
    this.setState({
      ...this.state,
      isOpenedRunSolution: false,
      currentSolutionTemplate: null
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
        <div className={`${styles.solutionPageWrapper} row`}>
          <div
            className={`${styles.solutionPageLeftSide} col-md-4`}
            style={{
              height: '500px',
              backgroundColor: '#f6f6f6'
            }}
          />
          <div
            className={`${styles.solutionPageRightSide} col-md-8`}
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

    return (
      <SolutionItem
        text={getSolutionReducer.data}
        solution={getSolutionsReducer.data.find(
          solution => solution.name === match.params.idSol
        )}
        handleClickRunSolution={solutionName =>
          this.handleClickRunSolution(solutionName)
        }
      />
    );
  };

  render() {
    const { match, history } = this.props;
    const { isOpenedRunSolution, currentSolutionTemplate } = this.state;
    return (
      <div>
        {currentSolutionTemplate ? (
          <Helmet title={`Run ${currentSolutionTemplate}`} />
        ) : (
          <Helmet title={`Solution ${match.params.idSol}`} />
        )}
        {isOpenedRunSolution && (
          <RunSolutionModal
            history={history}
            isOpenedRunSolution={isOpenedRunSolution}
            currentSolutionTemplate={currentSolutionTemplate}
            handleOpenClose={this.handleOpenClose}
          />
        )}
        <div className={globalStyles.contentBlock}>
          <div className="container pr-0 pl-0">{this.renderSolutionItem()}</div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getSolutionReducer,
    getSolutionsReducer,
    getNamespacesReducer,
    getProfileReducer
  }: ReduxState) => ({
    getSolutionReducer,
    getSolutionsReducer,
    getNamespacesReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetSolutionsIfNeeded: () =>
      dispatch(actionGetSolutions.fetchGetSolutionsIfNeeded()),
    fetchGetSolutionIfNeeded: (idSol: string) =>
      dispatch(actionGetSolution.fetchGetSolutionIfNeeded(idSol)),
    fetchGetNamespacesIfNeeded: (role: string) =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded(role))
  })
);

export default connector(Solution);
