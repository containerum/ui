/* @flow */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
// import { NavLink } from 'react-router-dom';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetSolutions from '../../actions/solutionsActions/getSolutions';
import * as actionGetSolution from '../../actions/solutionActions/getSolution';
import {
  GET_SOLUTIONS_INVALID,
  GET_SOLUTIONS_REQUESTING,
  GET_SOLUTIONS_FAILURE,
  GET_SOLUTIONS_SUCCESS
} from '../../constants/solutionsConstants/getSolutions';
import {
  GET_SOLUTION_INVALID,
  GET_SOLUTION_REQUESTING,
  GET_SOLUTION_FAILURE
} from '../../constants/solutionConstants/getSolution';
import SolutionItem from '../../components/SolutionItem';

type Props = {
  match: Object,
  getSolutionsReducer: Object,
  getSolutionReducer: Object,
  fetchGetSolutionsIfNeeded: () => void,
  fetchGetSolutionIfNeeded: (idSol: string) => void
};

// Export this for unit testing more easily
export class Solution extends PureComponent<Props> {
  componentDidMount() {
    const {
      match,
      getSolutionsReducer,
      fetchGetSolutionsIfNeeded,
      fetchGetSolutionIfNeeded
    } = this.props;
    if (getSolutionsReducer.readyStatus !== GET_SOLUTIONS_SUCCESS) {
      fetchGetSolutionsIfNeeded();
    }
    fetchGetSolutionIfNeeded(match.params.idSol);
  }

  renderSolutionItem = () => {
    const { getSolutionReducer, getSolutionsReducer, match } = this.props;
    if (
      !getSolutionReducer.readyStatus ||
      getSolutionReducer.readyStatus === GET_SOLUTION_INVALID ||
      getSolutionReducer.readyStatus === GET_SOLUTION_REQUESTING ||
      !getSolutionsReducer.readyStatus ||
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_INVALID ||
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_REQUESTING
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
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_FAILURE
    ) {
      return <p>Oops, Failed to load data of Solution!</p>;
    }

    return (
      <SolutionItem
        text={getSolutionReducer.data}
        solution={getSolutionsReducer.data.filter(
          solution => solution.Name === match.params.idSol
        )}
      />
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
  ({ getSolutionReducer, getSolutionsReducer }: ReduxState) => ({
    getSolutionReducer,
    getSolutionsReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetSolutionsIfNeeded: () =>
      dispatch(actionGetSolutions.fetchGetSolutionsIfNeeded()),
    fetchGetSolutionIfNeeded: (idSol: string) =>
      dispatch(actionGetSolution.fetchGetSolutionIfNeeded(idSol))
  })
);

export default connector(Solution);
