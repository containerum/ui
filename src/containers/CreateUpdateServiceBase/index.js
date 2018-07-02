/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import _ from 'lodash/fp';

import type { ReduxState } from '../../types';
import ServiceForm from '../../components/ServiceFormCard';
import UpdateServiceForm from '../../components/UpdateServiceFormCard';
import { GET_SERVICE_SUCCESS } from '../../constants/serviceConstants/getService';

type Props = {
  handleChangeState: () => void,
  handleChangeActivityInternal: () => void,
  handleChangeActivityExternal: () => void,
  match: Object,
  isActiveInternal: boolean,
  isActiveExternal: boolean,
  internalSrvObject: Array<Object>,
  externalSrvObject: Array<Object>,
  getServiceReducer: Object,
  idSrv: string
};

export class CreateUpdateServiceBase extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      service: '',
      isActiveInternal: false,
      isActiveExternal: false,
      externalSrvNameValue: '',
      internalSrvNameValue: '',
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
  componentWillUpdate(nextProps) {
    if (nextProps.getServiceReducer.readyStatus === GET_SERVICE_SUCCESS) {
      this.setState({
        ...this.state,
        service: nextProps.idSrv,
        isActiveInternal: nextProps.isActiveInternal,
        isActiveExternal: nextProps.isActiveExternal,
        internalSrvObject: nextProps.internalSrvObject,
        externalSrvObject: nextProps.externalSrvObject
      });
    }
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
  handleChangeServiceNameValue = (e, type) => {
    this.setState(
      {
        ...this.state,
        [type]: e.target.value
      },
      () => {
        this.props.handleChangeState(this.state);
      }
    );
  };
  render() {
    const {
      externalSrvNameValue,
      internalSrvNameValue,
      isActiveInternal,
      isActiveExternal,
      externalSrvObject,
      internalSrvObject,
      service
    } = this.state;
    return (
      <div>
        {service ? (
          <UpdateServiceForm
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
            service={service}
          />
        ) : (
          <ServiceForm
            match={this.props.match}
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
            handleChangeServiceNameValue={(e, type) =>
              this.handleChangeServiceNameValue(e, type)
            }
            externalSrvNameValue={externalSrvNameValue}
            internalSrvNameValue={internalSrvNameValue}
            isActiveInternal={isActiveInternal}
            isActiveExternal={isActiveExternal}
          />
        )}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    createExternalServiceReducer,
    createInternalServiceReducer,
    getServiceReducer
  }: ReduxState) => ({
    createExternalServiceReducer,
    createInternalServiceReducer,
    getServiceReducer
  })
);

export default connector(CreateUpdateServiceBase);
