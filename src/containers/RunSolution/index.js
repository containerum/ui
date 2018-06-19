/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';

import type { Dispatch, ReduxState } from '../../types';
import * as actionRunSolution from '../../actions/solutionActions/runSolution';
import SelectNamespaceModal from '../../components/CustomerModal/RunSolutionModal';
import {
  RUN_SOLUTION_SUCCESS,
  RUN_SOLUTION_FAILURE
} from '../../constants/solutionConstants/runSolution';

type Props = {
  idName: string,
  displayedNamespaces: Array<Object>,
  statusOfRunSolution: string,
  currentSolution: string,
  handleSelectNamespace: (value: string) => void,
  handleOpenCloseModal: () => void,
  isOpenedSelectNamespace: boolean,
  runSolutionReducer: Object,
  handleSolutionFailure: () => void,
  handleSolutionSuccess: () => void,
  fetchRunSolutionIfNeeded: (idName: string, idSol: string) => void
};

// Export this for unit testing more easily
export class RunSolution extends PureComponent<Props> {
  componentWillUpdate(nextProps) {
    if (
      this.props.runSolutionReducer.readyStatus !==
        nextProps.runSolutionReducer.readyStatus &&
      nextProps.runSolutionReducer.readyStatus === RUN_SOLUTION_SUCCESS
    ) {
      this.props.handleSolutionSuccess();
    } else if (
      this.props.runSolutionReducer.readyStatus !==
        nextProps.runSolutionReducer.readyStatus &&
      nextProps.runSolutionReducer.readyStatus === RUN_SOLUTION_FAILURE
    ) {
      this.props.handleSolutionFailure();
    }
  }
  handleCreate = () => {
    const { fetchRunSolutionIfNeeded, currentSolution, idName } = this.props;
    fetchRunSolutionIfNeeded(idName.name, currentSolution);
  };

  render() {
    const { displayedNamespaces, idName, statusOfRunSolution } = this.props;
    const {
      runSolutionReducer,
      isOpenedSelectNamespace,
      currentSolution,
      handleOpenCloseModal,
      handleSelectNamespace
    } = this.props;
    return (
      <div>
        {isOpenedSelectNamespace && (
          <SelectNamespaceModal
            isOpened={isOpenedSelectNamespace}
            namespaces={displayedNamespaces}
            namespace={idName}
            currentSolution={currentSolution}
            handleSelectNamespace={value => handleSelectNamespace(value)}
            handleOpenCloseModal={handleOpenCloseModal}
            isFetching={runSolutionReducer.isFetching}
            readyStatus={statusOfRunSolution}
            onHandleCreate={this.handleCreate}
          />
        )}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ runSolutionReducer }: ReduxState) => ({
    runSolutionReducer
  }),
  (dispatch: Dispatch) => ({
    fetchRunSolutionIfNeeded: (idName: string, idSol: string) =>
      dispatch(actionRunSolution.fetchRunSolutionIfNeeded(idName, idSol))
  })
);

export default connector(RunSolution);
