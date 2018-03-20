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
import { GET_NAMESPACES_SUCCESS } from '../../constants/namespacesConstants/getNamespaces';
import SolutionsList from '../../components/SolutionsList';

type Props = {
  history: Object,
  getSolutionsReducer: Object,
  fetchGetSolutionsIfNeeded: () => void,
  getNamespacesReducer: NamespacesType,
  fetchGetNamespacesIfNeeded: () => void
};

// Export this for unit testing more easily
export class Solutions extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      idName: null,
      isOpened: false
    };
  }
  componentDidMount() {
    const {
      fetchGetSolutionsIfNeeded,
      fetchGetNamespacesIfNeeded,
      getNamespacesReducer
    } = this.props;
    if (getNamespacesReducer.readyStatus !== GET_NAMESPACES_SUCCESS) {
      fetchGetNamespacesIfNeeded();
    }
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
        idName: nextProps.getNamespacesReducer.data.length
          ? nextProps.getNamespacesReducer.data[0]
          : null
      });
    }
  }

  renderSolutionsList = () => {
    const { getSolutionsReducer, history } = this.props;
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
      return <p>Oops, Failed to load data of Solutions!</p>;
    }
    return <SolutionsList data={getSolutionsReducer.data} history={history} />;
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
  ({ getSolutionsReducer, getNamespacesReducer }: ReduxState) => ({
    getSolutionsReducer,
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
