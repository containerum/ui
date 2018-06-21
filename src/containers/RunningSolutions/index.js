/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import className from 'classnames/bind';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetRunningSolutions from '../../actions/solutionsActions/getRunningSolutions';
import * as actionDeleteRunningSolutions from '../../actions/solutionActions/deleteRunningSolution';
import {
  GET_RUNNING_SOLUTIONS_INVALID,
  GET_RUNNING_SOLUTIONS_REQUESTING,
  GET_RUNNING_SOLUTIONS_FAILURE
} from '../../constants/solutionsConstants/getRunningSolutions';
import RunningSolutionsList from '../../components/RunningSolutionsList';
import DeleteModal from '../../components/CustomerModal/DeleteModal';
import Notification from '../Notification';
// import Notification from '../Notification';
// import DeleteModal from '../../components/CustomerModal/DeleteModal';

import globalStyles from '../../theme/global.scss';
import {
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING
} from '../../constants/namespacesConstants/getNamespaces';
import { DELETE_RUNNING_SOLUTION_REQUESTING } from '../../constants/solutionConstants/deleteRunningSolution';

const globalClass = className.bind(globalStyles);

const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);

type Props = {
  getRunningSolutionsReducer: Object,
  getNamespacesReducer: Object,
  deleteRunningSolutionReducer: Object,
  fetchGetRunningSolutionsIfNeeded: (idName: string) => void,
  fetchDeleteRunningSolutionIfNeeded: (idName: string, idSol: string) => void,
  history: Object,
  match: Object
};

export class RunningSolutions extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      inputName: '',
      currentSolutionName: '',
      isOpenedSol: false,
      displayedDeployments: [],
      displayedService: []
    };
  }
  componentDidMount() {
    const { fetchGetRunningSolutionsIfNeeded, match } = this.props;
    fetchGetRunningSolutionsIfNeeded(match.params.idName);
  }
  onHandleDeleteSolution = () => {
    const { match, fetchDeleteRunningSolutionIfNeeded } = this.props;
    fetchDeleteRunningSolutionIfNeeded(
      match.params.idName,
      this.state.currentSolutionName
    );
  };
  handleDeleteSolution = currentSolutionName => {
    this.setState({
      ...this.state,
      currentSolutionName,
      isOpenedSol: true
    });
  };
  handleInputName = inputName => {
    this.setState({
      ...this.state,
      inputName
    });
  };
  handleOpenCloseSolutionModal = () => {
    this.setState({
      ...this.state,
      isOpenedSol: !this.state.isOpenedSol,
      inputName: ''
    });
  };

  renderRunningSolutionsList = () => {
    const {
      getRunningSolutionsReducer,
      getNamespacesReducer,
      deleteRunningSolutionReducer,
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
        GET_RUNNING_SOLUTIONS_REQUESTING ||
      deleteRunningSolutionReducer.readyStatus ===
        DELETE_RUNNING_SOLUTION_REQUESTING
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
        handleDeleteSolution={this.handleDeleteSolution}
      />
    );
  };

  render() {
    const {
      status: statusSol,
      idSol: deleteSol,
      err: errSol
    } = this.props.deleteRunningSolutionReducer;
    const { inputName, isOpenedSol, currentSolutionName } = this.state;
    return (
      <div>
        <Notification
          status={statusSol}
          name={deleteSol}
          errorMessage={errSol}
        />
        <DeleteModal
          type="Solution"
          inputName={inputName}
          name={currentSolutionName}
          typeName={currentSolutionName}
          isOpened={isOpenedSol}
          minLengthName={1}
          handleInputName={this.handleInputName}
          handleOpenCloseModal={this.handleOpenCloseSolutionModal}
          onHandleDelete={this.onHandleDeleteSolution}
        />
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
      ),
    fetchDeleteRunningSolutionIfNeeded: (idName: string, idSol: string) =>
      dispatch(
        actionDeleteRunningSolutions.fetchDeleteRunningSolutionIfNeeded(
          idName,
          idSol
        )
      )
  })
);

export default connector(RunningSolutions);
