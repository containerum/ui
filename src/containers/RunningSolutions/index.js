/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import className from 'classnames/bind';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetRunningSolutions from '../../actions/solutionsActions/getRunningSolutions';
import {
  GET_RUNNING_SOLUTIONS_INVALID,
  GET_RUNNING_SOLUTIONS_REQUESTING,
  GET_RUNNING_SOLUTIONS_FAILURE
} from '../../constants/solutionsConstants/getRunningSolutions';
import RunningSolutionsList from '../../components/RunningSolutionsList';
// import Notification from '../Notification';
// import DeleteModal from '../../components/CustomerModal/DeleteModal';

import globalStyles from '../../theme/global.scss';
import {
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING
} from '../../constants/namespacesConstants/getNamespaces';

const globalClass = className.bind(globalStyles);

const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);

type Props = {
  getRunningSolutionsReducer: Object,
  getNamespacesReducer: Object,
  fetchGetRunningSolutionsIfNeeded: (idName: string) => void,
  history: Object,
  match: Object
};

// Export this for unit testing more easily
export class RunningSolutions extends PureComponent<Props> {
  componentDidMount() {
    const { fetchGetRunningSolutionsIfNeeded, match } = this.props;
    fetchGetRunningSolutionsIfNeeded(match.params.idName);
  }

  renderRunningSolutionsList = () => {
    const {
      getRunningSolutionsReducer,
      getNamespacesReducer,
      match
    } = this.props;

    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
      !getRunningSolutionsReducer.readyStatus ||
      getRunningSolutionsReducer.readyStatus ===
        GET_RUNNING_SOLUTIONS_INVALID ||
      getRunningSolutionsReducer.readyStatus ===
        GET_RUNNING_SOLUTIONS_REQUESTING
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
      getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE ||
      getRunningSolutionsReducer.readyStatus === GET_RUNNING_SOLUTIONS_FAILURE
    ) {
      return <p>Oops, Failed to load data of Solutions!</p>;
    }

    return (
      <RunningSolutionsList
        data={getRunningSolutionsReducer.data}
        history={this.props.history}
        idName={match.params.idName}
      />
    );
  };

  render() {
    return (
      <div>
        <div className={contentClassName}>
          <div className="tab-content">
            <div className="tab-pane active">
              {this.renderRunningSolutionsList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getRunningSolutionsReducer,
    getNamespacesReducer,
    deleteRunningSolutionReducer
  }: ReduxState) => ({
    getRunningSolutionsReducer,
    getNamespacesReducer,
    deleteRunningSolutionReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetRunningSolutionsIfNeeded: (idName: string) =>
      dispatch(
        actionGetRunningSolutions.fetchGetRunningSolutionsIfNeeded(idName)
      )
  })
);

export default connector(RunningSolutions);
