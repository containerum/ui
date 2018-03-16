/* @flow */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import _ from 'lodash/fp';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetSolutions from '../../actions/solutionsActions/getSolutions';
import {
  GET_SOLUTIONS_INVALID,
  GET_SOLUTIONS_REQUESTING,
  GET_SOLUTIONS_FAILURE
} from '../../constants/solutionsConstants/getSolutions';
import SolutionsList from '../../components/SolutionsList';

type Props = {
  // history: Object,
  getSolutionsReducer: Object,
  fetchGetSolutionsIfNeeded: () => void
};

// Export this for unit testing more easily
export class Solutions extends PureComponent<Props> {
  componentDidMount() {
    const { fetchGetSolutionsIfNeeded } = this.props;
    fetchGetSolutionsIfNeeded();
  }

  renderSolutionsList = () => {
    const { getSolutionsReducer } = this.props;
    if (
      !getSolutionsReducer.readyStatus ||
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_INVALID ||
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_REQUESTING
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
    if (getSolutionsReducer.readyStatus === GET_SOLUTIONS_FAILURE) {
      return <p>Oops, Failed to load data of Namespaces!</p>;
    }
    return <SolutionsList data={getSolutionsReducer.data} />;
  };

  render() {
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
  ({ getSolutionsReducer }: ReduxState) => ({
    getSolutionsReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetSolutionsIfNeeded: () =>
      dispatch(actionGetSolutions.fetchGetSolutionsIfNeeded())
  })
);

export default connector(Solutions);
