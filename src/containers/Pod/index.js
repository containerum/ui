/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';

import initSocket from '../../functions/getSockets';
import * as actionGetPod from '../../actions/podActions/getPod';
import * as actionDeletePod from '../../actions/podActions/deletePod';
import {
  GET_POD_FAILURE,
  GET_POD_INVALID,
  GET_POD_REQUESTING
} from '../../constants/podConstants/getPod';
import {
  DELETE_POD_SUCCESS,
  DELETE_POD_REQUESTING
} from '../../constants/podConstants/deletePod';
import type { Dispatch, ReduxState } from '../../types';
import PodList from '../../components/PodCard/PodList';
import PodInfo from '../../components/PodCard/PodInfo';
import Notification from '../Notification';
import NavigationHeaderItem from '../NavigationHeader';

type Props = {
  getPodReducer: Object,
  deletePodReducer: Object,
  fetchGetPodIfNeeded: (idName: string, idDep: string, idPod: string) => void,
  fetchDeletePodIfNeeded: (idName: string, idPod: string) => void,
  match: Object,
  history: Object
};

// Export this for unit testing more easily
export class Pod extends PureComponent<Props> {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     logs: []
  //   };
  // }
  componentDidMount() {
    const { fetchGetPodIfNeeded, match } = this.props;
    const { idName, idDep, idPod } = match.params;
    fetchGetPodIfNeeded(idName, idDep, idPod);
    const socket = initSocket();
    if (socket) {
      socket.on('message', data => {
        console.log('componentDidMount', data);
        this.onMessageReceived(data);
      });
      // socket.on('message', this.onMessageReceived);
      // setTimeout(() => {
      //   socket.emit('history', { offset: 0, length: 100 });
      // }, 100);
    }
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.deletePodReducer.readyStatus !==
        nextProps.deletePodReducer.readyStatus &&
      nextProps.deletePodReducer.readyStatus === DELETE_POD_SUCCESS
    ) {
      this.props.history.goBack();
    }
  }
  // componentWillUnmount() {
  //   if (socket) {
  //     console.log(socket);
  //     // socket.removeListener('msg', this.onMessageReceived);
  //   }
  // }
  onMessageReceived = data => {
    // const { logs } = this.state.logs;
    console.log('onMessageReceived', data);
    // logs.push(data);
    // this.setState({ logs });
  };
  onHandleDelete = idPod => {
    const { fetchDeletePodIfNeeded, match } = this.props;
    fetchDeletePodIfNeeded(match.params.idName, idPod);
  };

  renderPodInfo = () => {
    const { getPodReducer, deletePodReducer, match } = this.props;

    if (
      !getPodReducer.readyStatus ||
      getPodReducer.readyStatus === GET_POD_INVALID ||
      getPodReducer.readyStatus === GET_POD_REQUESTING ||
      deletePodReducer.readyStatus === DELETE_POD_REQUESTING
    ) {
      return (
        <div
          className="container"
          style={{
            padding: '0',
            marginTop: '17px',
            marginBottom: '30px',
            backgroundColor: 'transparent'
          }}
        >
          <img
            src={require('../../images/ns-dep.svg')}
            alt="ns-dep"
            style={{ width: '100%' }}
          />
        </div>
      );
    }

    if (getPodReducer.readyStatus === GET_POD_FAILURE) {
      return <p>Oops, Failed to load data of NS!</p>;
    }

    return (
      <PodInfo
        data={getPodReducer.data}
        handleDeletePod={idPod => this.onHandleDelete(idPod)}
        idName={match.params.idName}
        idDep={match.params.idDep}
      />
    );
  };
  renderPodList = () => {
    const { getPodReducer, deletePodReducer, match } = this.props;

    if (
      !getPodReducer.readyStatus ||
      getPodReducer.readyStatus === GET_POD_INVALID ||
      getPodReducer.readyStatus === GET_POD_REQUESTING ||
      deletePodReducer.readyStatus === DELETE_POD_REQUESTING
    ) {
      return (
        <div
          className="container"
          style={{
            padding: '0',
            marginTop: '17px',
            marginBottom: '30px',
            backgroundColor: 'transparent'
          }}
        >
          <div className="row double">
            {new Array(2).fill().map(() => (
              <div className="col-md-6" key={_.uniqueId()}>
                <img
                  src={require('../../images/pods-cont.svg')}
                  style={{ width: '100%' }}
                  alt="pod"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (getPodReducer.readyStatus === GET_POD_FAILURE) {
      return <p>Oops, Failed to load data of NS!</p>;
    }

    return (
      <PodList
        data={getPodReducer.data}
        handleDeletePod={idDep => this.onHandleDelete(idDep)}
        idName={match.params.idName}
        idDep={match.params.idDep}
      />
    );
  };

  render() {
    const { match } = this.props;
    const { status, idPod, err } = this.props.deletePodReducer;
    return (
      <div>
        <Helmet title={`Pod - ${match.params.idPod}`} />
        <Notification status={status} name={idPod} errorMessage={err} />
        <NavigationHeaderItem
          idName={match.params.idName}
          idDep={match.params.idDep}
          idPod={match.params.idPod}
        />
        {this.renderPodInfo()}
        <div className="content-block">
          <div className="container no-back">{this.renderPodList()}</div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getPodReducer, deletePodReducer }: ReduxState) => ({
    getPodReducer,
    deletePodReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetPodIfNeeded: (idName: string, idDep: string, idPod: string) =>
      dispatch(actionGetPod.fetchGetPodIfNeeded(idName, idDep, idPod)),
    fetchDeletePodIfNeeded: (idName: string, idPod: string) =>
      dispatch(actionDeletePod.fetchDeletePodIfNeeded(idName, idPod))
  })
);

export default connector(Pod);
