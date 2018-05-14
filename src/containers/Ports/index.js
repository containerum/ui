/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import className from 'classnames/bind';

import type { ReduxState } from '../../types';
import {
  GET_SERVICE_INVALID,
  GET_SERVICE_REQUESTING,
  GET_SERVICE_FAILURE
} from '../../constants/serviceConstants/getService';
import PortsList from '../../components/PortsList';

import globalStyles from '../../theme/global.scss';

const globalClass = className.bind(globalStyles);

const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);

type Props = {
  getServiceReducer: Object
};

// Export this for unit testing more easily
export class Ports extends PureComponent<Props> {
  renderPortsList = () => {
    const { getServiceReducer } = this.props;

    if (
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

    if (getServiceReducer.readyStatus === GET_SERVICE_FAILURE) {
      return <p>Oops, Failed to load data of Ports!</p>;
    }

    return <PortsList data={getServiceReducer.data} />;
  };

  render() {
    return (
      <div className={contentClassName}>
        <div className="tab-content">
          <div className="tab-pane pods active">{this.renderPortsList()}</div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getServiceReducer }: ReduxState) => ({
    getServiceReducer
  })
);

export default connector(Ports);
