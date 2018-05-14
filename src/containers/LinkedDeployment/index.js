/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import className from 'classnames/bind';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetDeployments from '../../actions/deploymentsActions/getDeployments';
import {
  GET_DEPLOYMENTS_INVALID,
  GET_DEPLOYMENTS_REQUESTING,
  GET_DEPLOYMENTS_FAILURE,
  GET_DEPLOYMENTS_SUCCESS
} from '../../constants/deploymentsConstants/getDeployments';
import {
  GET_SERVICE_INVALID,
  GET_SERVICE_FAILURE,
  GET_SERVICE_REQUESTING,
  GET_SERVICE_SUCCESS
} from '../../constants/serviceConstants/getService';
import DeploymentsList from '../../components/DeploymentsList';

import globalStyles from '../../theme/global.scss';

const globalClass = className.bind(globalStyles);

const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);

type Props = {
  getDeploymentsReducer: Object,
  getServiceReducer: Object,
  fetchGetDeploymentsIfNeeded: (idName: string) => void,
  history: Object,
  match: Object
};

// Export this for unit testing more easily
export class Deployments extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      displayedDeployments: []
    };
  }
  componentDidMount() {
    const { fetchGetDeploymentsIfNeeded, match } = this.props;
    fetchGetDeploymentsIfNeeded(match.params.idName);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getDeploymentsReducer.readyStatus !==
        nextProps.getDeploymentsReducer.readyStatus &&
      nextProps.getDeploymentsReducer.readyStatus === GET_DEPLOYMENTS_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedDeployments: nextProps.getDeploymentsReducer.data
      });
    }
    if (
      this.props.getServiceReducer.readyStatus !==
        nextProps.getServiceReducer.readyStatus &&
      nextProps.getServiceReducer.readyStatus === GET_SERVICE_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedDeployments: this.state.displayedDeployments.filter(
          deployment =>
            nextProps.getServiceReducer.data.deploy === deployment.name
        )
      });
    }
  }

  renderDeploymentsList = () => {
    const { getDeploymentsReducer, getServiceReducer, match } = this.props;

    if (
      !getDeploymentsReducer.readyStatus ||
      getDeploymentsReducer.readyStatus === GET_DEPLOYMENTS_INVALID ||
      getDeploymentsReducer.readyStatus === GET_DEPLOYMENTS_REQUESTING ||
      !getServiceReducer.readyStatus ||
      getServiceReducer.readyStatus === GET_SERVICE_INVALID ||
      getServiceReducer.readyStatus === GET_SERVICE_REQUESTING
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
      getDeploymentsReducer.readyStatus === GET_DEPLOYMENTS_FAILURE ||
      getServiceReducer.readyStatus === GET_SERVICE_FAILURE
    ) {
      return <p>Oops, Failed to load data of Deployments!</p>;
    }

    return (
      <DeploymentsList
        data={this.state.displayedDeployments}
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
            <div className="tab-pane deployments active">
              {this.renderDeploymentsList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getDeploymentsReducer, getServiceReducer }: ReduxState) => ({
    getDeploymentsReducer,
    getServiceReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetDeploymentsIfNeeded: (idName: string) =>
      dispatch(actionGetDeployments.fetchGetDeploymentsIfNeeded(idName))
  })
);

export default connector(Deployments);
