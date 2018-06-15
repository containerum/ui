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
  GET_RUNNING_SOLUTIONS_FAILURE,
  GET_RUNNING_SOLUTIONS_SUCCESS
} from '../../constants/solutionsConstants/getRunningSolutions';
import {
  DELETE_RUNNING_SOLUTION_SUCCESS,
  DELETE_RUNNING_SOLUTION_REQUESTING
} from '../../constants/solutionConstants/deleteRunningSolution';
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
  deleteRunningSolutionReducer: Object,
  fetchGetRunningSolutionsIfNeeded: (idName: string) => void,
  fetchDeleteRunningSolutionsIfNeeded: (idName: string, idDep: string) => void,
  history: Object,
  match: Object
};

// Export this for unit testing more easily
export class RunningSolutions extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      inputName: '',
      idDep: null,
      isOpened: false,
      displayedRunningSolutions: []
    };
  }
  componentDidMount() {
    const { fetchGetRunningSolutionsIfNeeded, match } = this.props;
    fetchGetRunningSolutionsIfNeeded(match.params.idName);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getRunningSolutionsReducer.readyStatus !==
        nextProps.getRunningSolutionsReducer.readyStatus &&
      nextProps.getRunningSolutionsReducer.readyStatus ===
        GET_RUNNING_SOLUTIONS_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedRunningSolutions: nextProps.getRunningSolutionsReducer.data
      });
    }
    if (
      this.props.deleteRunningSolutionReducer.readyStatus !==
        nextProps.deleteRunningSolutionReducer.readyStatus &&
      nextProps.deleteRunningSolutionReducer.readyStatus ===
        DELETE_RUNNING_SOLUTION_SUCCESS
    ) {
      const displayedDep = this.state.displayedRunningSolutions.filter(
        deployment =>
          nextProps.deleteRunningSolutionReducer.idDep !== deployment.name
      );
      this.setState({
        ...this.state,
        displayedRunningSolutions: displayedDep
      });
    }
  }
  onHandleDelete = idDep => {
    const { fetchDeleteRunningSolutionsIfNeeded, match } = this.props;
    fetchDeleteRunningSolutionsIfNeeded(match.params.idName, idDep);
  };
  handleDeleteRunningSolutions = idDep => {
    // console.log(idDep);
    this.setState({
      ...this.state,
      idDep,
      isOpened: true
    });
  };
  handleInputName = inputName => {
    this.setState({
      ...this.state,
      inputName
    });
  };
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpened: !this.state.isOpened,
      idDep: null,
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
        data={this.state.displayedRunningSolutions}
        dataNamespace={getNamespacesReducer.data.find(
          namespace => namespace.id === match.params.idName
        )}
        handleDeleteRunningSolutions={idDep =>
          this.handleDeleteRunningSolutions(idDep)
        }
        history={this.props.history}
        idName={match.params.idName}
      />
    );
  };

  render() {
    // const { status, idDep, err } = this.props.deleteRunningSolutionReducer;
    // const { inputName, isOpened, idDep: currentIdDep } = this.state;
    // let currentDepl;
    // if (
    //   this.props.getRunningSolutionsReducer.readyStatus ===
    //   GET_RUNNING_SOLUTIONS_SUCCESS
    // ) {
    //   currentDepl = this.props.getRunningSolutionsReducer.data.find(
    //     depl => depl.name === currentIdDep
    //   );
    // }
    return (
      <div>
        {/* <Notification status={status} name={idDep} errorMessage={err} /> */}
        {/* {currentDepl && ( */}
        {/* <DeleteModal */}
        {/* type="RunningSolutions" */}
        {/* inputName={inputName} */}
        {/* name={currentIdDep} */}
        {/* typeName={currentDepl.name} */}
        {/* isOpened={isOpened} */}
        {/* minLengthName={1} */}
        {/* handleInputName={this.handleInputName} */}
        {/* handleOpenCloseModal={this.handleOpenCloseModal} */}
        {/* onHandleDelete={this.onHandleDelete} */}
        {/* /> */}
        {/* )} */}
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
