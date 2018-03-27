/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import _ from 'lodash/fp';

import type { ReduxState } from '../../../types';
import ServiceForm from '../../../components/ServiceFormCard';

type Props = {
  handleChangeState: () => void,
  handleChangeActivityInternal: () => void,
  handleChangeActivityExternal: () => void
};

// Export this for unit testing more easily
export class CreateServiceCard extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isActiveInternal: false,
      isActiveExternal: false,
      internalSrvObject: [
        {
          internalSrvName: '',
          internalSrvPort: '',
          internalSrvTargetPort: '',
          intServiceType: 'TCP',
          id: _.uniqueId(),
          index: 0
        }
      ],
      internalSrvName: '',
      externalSrvObject: [
        {
          externalSrvName: '',
          externalSrvTargetPort: '',
          extServiceType: 'TCP',
          id: _.uniqueId(),
          index: 0
        }
      ],
      externalSrvName: ''
    };
  }
  handleClickRemoveInternalPort = id => {
    if (this.state.internalSrvObject.length > 1) {
      const nextState = Object.assign({}, this.state).internalSrvObject.filter(
        item => item.id !== id
      );
      this.setState(
        {
          ...this.state,
          internalSrvObject: nextState
        },
        () => {
          this.props.handleChangeState(this.state);
        }
      );
    } else {
      this.setState(
        {
          ...this.state,
          internalSrvObject: [
            {
              internalSrvName: '',
              internalSrvPort: '',
              internalSrvTargetPort: '',
              intServiceType: 'TCP',
              id: _.uniqueId(),
              index: 0
            }
          ]
        },
        () => {
          this.props.handleChangeState(this.state);
        }
      );
    }
  };
  handleClickRemoveExternalPort = id => {
    if (this.state.externalSrvObject.length > 1) {
      const nextState = Object.assign({}, this.state).externalSrvObject.filter(
        item => item.id !== id
      );
      this.setState(
        {
          ...this.state,
          externalSrvObject: nextState
        },
        () => {
          this.props.handleChangeState(this.state);
        }
      );
    } else {
      this.setState(
        {
          ...this.state,
          externalSrvObject: [
            {
              externalSrvName: '',
              externalSrvTargetPort: '',
              intServiceType: 'TCP',
              id: _.uniqueId(),
              index: 0
            }
          ]
        },
        () => {
          this.props.handleChangeState(this.state);
        }
      );
    }
  };
  handleClickAddInternalPort = () => {
    this.setState(
      {
        ...this.state,
        internalSrvObject: [
          ...this.state.internalSrvObject,
          {
            internalSrvName: '',
            internalSrvPort: '',
            internalSrvTargetPort: '',
            intServiceType: 'TCP',
            id: _.uniqueId(),
            index: 0
          }
        ]
      },
      () => {
        this.props.handleChangeState(this.state);
      }
    );
  };
  handleClickAddExternalPort = () => {
    this.setState(
      {
        ...this.state,
        externalSrvObject: [
          ...this.state.externalSrvObject,
          {
            externalSrvName: '',
            externalSrvTargetPort: '',
            extServiceType: 'TCP',
            id: _.uniqueId(),
            index: 0
          }
        ]
      },
      () => {
        this.props.handleChangeState(this.state);
      }
    );
  };
  handleChangeService = (e, id, index, type, inputType) => {
    const nextState = Object.assign([], this.state[`${type}`]);
    const match = nextState.find(srv => srv.id === id);
    const matchUpdated = { ...match, [`${inputType}`]: e.target.value };
    this.setState(
      {
        ...this.state,
        [`${type}`]: [
          ...this.state[`${type}`].slice(0, index),
          Object.assign({}, this.state[`${type}`][index], matchUpdated),
          ...this.state[`${type}`].slice(index + 1)
        ]
      },
      () => {
        this.props.handleChangeState(this.state);
      }
    );
  };
  render() {
    const {
      isActiveInternal,
      isActiveExternal,
      externalSrvObject,
      internalSrvObject
    } = this.state;
    // console.log('state', this.state);
    return (
      <ServiceForm
        handleChangeActivityInternal={() => {
          this.props.handleChangeActivityInternal();
          this.setState({
            ...this.state,
            isActiveInternal: !this.state.isActiveInternal,
            internalSrvObject: [
              {
                internalSrvName: '',
                internalSrvPort: '',
                internalSrvTargetPort: '',
                intServiceType: 'TCP',
                id: _.uniqueId(),
                index: 0
              }
            ]
          });
        }}
        handleChangeActivityExternal={() => {
          this.props.handleChangeActivityExternal();
          this.setState({
            ...this.state,
            isActiveExternal: !this.state.isActiveExternal,
            externalSrvObject: [
              {
                externalSrvName: '',
                externalSrvTargetPort: '',
                extServiceType: 'TCP',
                id: _.uniqueId(),
                index: 0
              }
            ]
          });
        }}
        handleChangeService={(e, id, index, type, inputType) =>
          this.handleChangeService(e, id, index, type, inputType)
        }
        handleClickRemoveInternalPort={id =>
          this.handleClickRemoveInternalPort(id)
        }
        handleClickRemoveExternalPort={id =>
          this.handleClickRemoveExternalPort(id)
        }
        handleClickAddInternalPort={() => this.handleClickAddInternalPort()}
        handleClickAddExternalPort={() => this.handleClickAddExternalPort()}
        externalSrvObject={externalSrvObject}
        internalSrvObject={internalSrvObject}
        isActiveInternal={isActiveInternal}
        isActiveExternal={isActiveExternal}
      />
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    createExternalServiceReducer,
    createInternalServiceReducer
  }: ReduxState) => ({
    createExternalServiceReducer,
    createInternalServiceReducer
  })
);

export default connector(CreateServiceCard);
