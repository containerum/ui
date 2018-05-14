/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import className from 'classnames/bind';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetPods from '../../actions/podsActions/getPods';
import * as actionDeletePod from '../../actions/podActions/deletePod';
import {
  GET_PODS_INVALID,
  GET_PODS_REQUESTING,
  GET_PODS_FAILURE,
  GET_PODS_SUCCESS
} from '../../constants/podsConstants/getPods';
import {
  DELETE_POD_SUCCESS,
  DELETE_POD_REQUESTING
} from '../../constants/podConstants/deletePod';
import PodsList from '../../components/PodsList';
import Notification from '../Notification';

import globalStyles from '../../theme/global.scss';

const globalClass = className.bind(globalStyles);

const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);

type Props = {
  getPodsReducer: Object,
  deletePodReducer: Object,
  fetchGetPodsIfNeeded: (idName: string, idDep: string) => void,
  fetchDeletePodIfNeeded: (idName: string, idPod: string) => void,
  history: Object,
  match: Object
};

// Export this for unit testing more easily
export class Pods extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      inputName: '',
      idDep: null,
      isOpened: false,
      displayedPods: []
    };
  }
  componentDidMount() {
    const { fetchGetPodsIfNeeded, match } = this.props;
    fetchGetPodsIfNeeded(match.params.idName, match.params.idDep);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getPodsReducer.readyStatus !==
        nextProps.getPodsReducer.readyStatus &&
      nextProps.getPodsReducer.readyStatus === GET_PODS_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedPods: nextProps.getPodsReducer.data
      });
    }
    if (
      this.props.deletePodReducer.readyStatus !==
        nextProps.deletePodReducer.readyStatus &&
      nextProps.deletePodReducer.readyStatus === DELETE_POD_SUCCESS
    ) {
      const displayedPods = this.state.displayedPods.filter(
        pods => nextProps.deletePodReducer.idPod !== pods.name
      );
      this.setState({
        ...this.state,
        displayedPods
      });
    }
  }
  handleDeletePod = idPod => {
    const { fetchDeletePodIfNeeded, match } = this.props;
    fetchDeletePodIfNeeded(match.params.idName, idPod);
  };

  renderPodsList = () => {
    const { getPodsReducer, deletePodReducer, match } = this.props;

    if (
      !getPodsReducer.readyStatus ||
      getPodsReducer.readyStatus === GET_PODS_INVALID ||
      getPodsReducer.readyStatus === GET_PODS_REQUESTING ||
      deletePodReducer.readyStatus === DELETE_POD_REQUESTING
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

    if (getPodsReducer.readyStatus === GET_PODS_FAILURE) {
      return <p>Oops, Failed to load data of Pods!</p>;
    }

    return (
      <PodsList
        data={this.state.displayedPods}
        handleDeletePod={idPod => this.handleDeletePod(idPod)}
        history={this.props.history}
        idName={match.params.idName}
        idDep={match.params.idDep}
      />
    );
  };

  render() {
    const { status, idPod, err } = this.props.deletePodReducer;
    return (
      <div>
        <Notification status={status} name={idPod} errorMessage={err} />
        <div className={contentClassName}>
          <div className="tab-content">
            <div className="tab-pane pods active">{this.renderPodsList()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getPodsReducer, deletePodReducer }: ReduxState) => ({
    getPodsReducer,
    deletePodReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetPodsIfNeeded: (idName: string, idDep: string) =>
      dispatch(actionGetPods.fetchGetPodsIfNeeded(idName, idDep)),
    fetchDeletePodIfNeeded: (idName: string, idPod: string) =>
      dispatch(actionDeletePod.fetchDeletePodIfNeeded(idName, idPod))
  })
);

export default connector(Pods);
