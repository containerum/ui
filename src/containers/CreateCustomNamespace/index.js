/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
// import _ from 'lodash/fp';
import Scrollspy from 'react-scrollspy';

import scrollById from '../../functions/scrollById';
// import { routerLinks } from '../../config';
import * as actionCreateCustomNamespace from '../../actions/namespaceActions/createCustomNamespace';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';
// import { CREATE_CUSTOM_NAMESPACE_SUCCESS } from '../../constants/namespaceConstants/createCustomNamespace';
import type { Dispatch, ReduxState } from '../../types';
import NavigationHeaderItem from '../NavigationHeader';
import LoadButton from '../../components/LoadButton';
import Notification from '../Notification';
import InputControl from '../../components/InputControl';
// import Name from '../../components/CreateNamespaceCards/Name';
import globalStyles from '../../theme/global.scss';

type Props = {
  // history: Object,
  getProfileReducer: Object,
  createCustomNamespaceReducer: Object,
  fetchCreateCustomNamespaceIfNeeded: (data: Object) => void
};

// Export this for unit testing more easily
export class CreateCustomNamespace extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      cpu: 500,
      memory: 512,
      maxExtServices: 20,
      maxIntServices: 20,
      maxTraffic: 1024
    };
  }
  componentWillUpdate(nextProps) {
    const { getProfileReducer } = this.props;
    if (
      getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      console.log(nextProps.getProfileReducer.data.role);
      // if (nextProps.getProfileReducer.data.role !== 'admin') {
      //   history.push(routerLinks.namespaces);
      // }
    }
  }
  handleSubmitCreateCustomNamespace = e => {
    e.preventDefault();
    const { fetchCreateCustomNamespaceIfNeeded } = this.props;
    fetchCreateCustomNamespaceIfNeeded(this.state);
  };
  handleChangeInput = (type, value) => {
    this.setState({
      ...this.state,
      [`${type}`]: value
    });
  };

  renderCreateCustomNamespaceSidebar = () => {
    const arrayOfLinks = ['name', 'parameters'];
    return (
      <Scrollspy
        items={arrayOfLinks}
        onUpdate={this.handleUpdateMenu}
        style={{
          padding: '20px 0'
        }}
        currentClassName="active"
      >
        <div className="sideMenuHeader">
          <div
            onClick={() => scrollById('name')}
            onKeyPress={() => scrollById('name')}
            role="presentation"
          >
            name
          </div>
        </div>
        <div className="sideMenuHeader">
          <div
            onClick={() => scrollById('parameters')}
            onKeyPress={() => scrollById('parameters')}
            role="presentation"
          >
            parameters
          </div>
        </div>
      </Scrollspy>
    );
  };
  renderCreateCustomNamespace = () => {
    const {
      label,
      cpu,
      memory,
      maxExtServices,
      maxIntServices,
      maxTraffic
    } = this.state;
    return (
      <div>
        <div className="row rowLine" id="name">
          <div className="col-md-7">
            <div className="containerTitle">
              <span>*</span> Name
              {/* <Tooltip */}
              {/* placement='top' */}
              {/* trigger={['hover']} */}
              {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
              {/* > */}
              {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
              {/* </Tooltip> */}
            </div>
            <div className="containerSubTitle">Enter Namespace name</div>
            <InputControl
              value={label}
              id="deploymentName"
              type="text"
              pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
              required
              baseClassName="form-group__input-text form-control customInput"
              baseClassNameLabel={`form-group__label ${label &&
                'form-group__label-always-onfocus'}`}
              labelText="Name"
              textHelper="Namespace name can only contain letters, numbers and characters"
              baseClassNameHelper="form-group__helper"
              handleChangeInput={e =>
                this.handleChangeInput('label', e.target.value)
              }
            />
          </div>
        </div>
        <div className="row rowLine" id="parameters">
          <div className="col-md-12">
            <div className="containerTitle containerBlockTitle">
              <span>*</span> Parameters
              {/* <Tooltip */}
              {/* placement='top' */}
              {/* trigger={['hover']} */}
              {/* overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>} */}
              {/* > */}
              {/* <span className="myTooltip" data-toggle="tooltip">?</span> */}
              {/* </Tooltip> */}
            </div>
          </div>
          <div className="col-md-5 myColumn">
            <InputControl
              value={cpu}
              id="cpu"
              type="number"
              pattern="(3000|[12][0-9]{3}|[1-9][0-9]{1,2})"
              required
              min="10"
              max="3000"
              baseClassName="form-group__input-text form-control customInput"
              baseClassNameLabel={`form-group__label ${
                cpu || cpu === 0 ? 'form-group__label-always-onfocus' : ''
              }`}
              labelText="CPU"
              title="Range: 10 - 3000"
              textHelper="Range: 10 - 3000"
              baseClassNameHelper="form-group__helper"
              handleChangeInput={e => {
                const cpuValue = parseInt(e.target.value, 10);
                this.handleChangeInput(
                  'cpu',
                  Number.isInteger(cpuValue) ? cpuValue : ''
                );
              }}
            />
          </div>
          <div className="col-md-5 myColumn">
            <InputControl
              value={memory}
              id="memory"
              type="number"
              pattern="(8000|[1-7][0-9]{3}|[1-9][0-9]{1,2})"
              required
              min="10"
              max="8000"
              baseClassName="form-group__input-text form-control customInput"
              baseClassNameLabel={`form-group__label ${
                memory || memory === 0 ? 'form-group__label-always-onfocus' : ''
              }`}
              labelText="RAM"
              title="Range: 10 - 8000"
              textHelper="Range: 10 - 8000"
              baseClassNameHelper="form-group__helper"
              handleChangeInput={e => {
                const cpuValue = parseInt(e.target.value, 10);
                this.handleChangeInput(
                  'memory',
                  Number.isInteger(cpuValue) ? cpuValue : ''
                );
              }}
            />
          </div>

          <div className="col-md-4 myColumnColMd4">
            <InputControl
              value={maxExtServices}
              id="maxExtServices"
              type="number"
              pattern="(1000|[12][0-9]{3}|[1-9][0-9]{1,2})"
              required
              min="1"
              max="1000"
              baseClassName="form-group__input-text form-control customInput"
              baseClassNameLabel={`form-group__label ${
                maxExtServices || maxExtServices === 0
                  ? 'form-group__label-always-onfocus'
                  : ''
              }`}
              labelText="Max Ext Services"
              title="Range: 10 - 3000"
              textHelper="Range: 10 - 3000"
              baseClassNameHelper="form-group__helper"
              handleChangeInput={e => {
                const maxExtServicesValue = parseInt(e.target.value, 10);
                this.handleChangeInput(
                  'maxExtServices',
                  Number.isInteger(maxExtServicesValue)
                    ? maxExtServicesValue
                    : ''
                );
              }}
            />
          </div>
          <div className="col-md-4 myColumnColMd4">
            <InputControl
              value={maxIntServices}
              id="maxIntServices"
              type="number"
              pattern="(1000|[12][0-9]{3}|[1-9][0-9]{1,2})"
              required
              min="1"
              max="1000"
              baseClassName="form-group__input-text form-control customInput"
              baseClassNameLabel={`form-group__label ${
                maxIntServices || maxIntServices === 0
                  ? 'form-group__label-always-onfocus'
                  : ''
              }`}
              labelText="Max Int Services"
              title="Range: 10 - 8000"
              textHelper="Range: 10 - 8000"
              baseClassNameHelper="form-group__helper"
              handleChangeInput={e => {
                const maxIntServicesValue = parseInt(e.target.value, 10);
                this.handleChangeInput(
                  'maxIntServices',
                  Number.isInteger(maxIntServicesValue)
                    ? maxIntServicesValue
                    : ''
                );
              }}
            />
          </div>
          <div className="col-md-4 myColumnColMd4">
            <InputControl
              value={maxTraffic}
              id="maxTraffic"
              type="number"
              pattern="(8000|[12][0-9]{3}|[1-9][0-9]{1,2})"
              required
              min="1"
              max="8000"
              baseClassName="form-group__input-text form-control customInput"
              baseClassNameLabel={`form-group__label ${
                maxTraffic || maxTraffic === 0
                  ? 'form-group__label-always-onfocus'
                  : ''
              }`}
              labelText="Max Traffic"
              title="Range: 10 - 8000"
              textHelper="Range: 10 - 8000"
              baseClassNameHelper="form-group__helper"
              handleChangeInput={e => {
                const cpuValue = parseInt(e.target.value, 10);
                this.handleChangeInput(
                  'maxTraffic',
                  Number.isInteger(cpuValue) ? cpuValue : ''
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { createCustomNamespaceReducer } = this.props;
    // console.log(this.state);
    return (
      <div>
        <Helmet title="Create Custom Namespace" />
        <div className="container-fluid breadcrumbNavigation">
          <NavigationHeaderItem IdCreate="namespace" />
        </div>
        <Notification
          status={createCustomNamespaceReducer.status}
          name={createCustomNamespaceReducer.idDep}
          method={createCustomNamespaceReducer.method}
          errorMessage={createCustomNamespaceReducer.err}
        />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            <div className="row pageWidth">
              <div
                className="col-md-3 sideMenu"
                style={{ padding: '20px 0px' }}
              >
                {this.renderCreateCustomNamespaceSidebar()}
              </div>
              <div className="col-md-9 pageContent">
                <form onSubmit={e => this.handleSubmitCreateCustomNamespace(e)}>
                  <div className="blockContainer blockAddContainerPadin">
                    <div className="col-md-12">
                      {this.renderCreateCustomNamespace()}
                    </div>
                  </div>
                  <LoadButton
                    type="submit"
                    buttonText="Create namespace"
                    isFetching={createCustomNamespaceReducer.isFetching}
                    baseClassButton="btnDeployment btnService"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ createCustomNamespaceReducer, getProfileReducer }: ReduxState) => ({
    createCustomNamespaceReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchCreateCustomNamespaceIfNeeded: (data: Object) =>
      dispatch(
        actionCreateCustomNamespace.fetchCreateCustomNamespaceIfNeeded(data)
      )
  })
);

export default connector(CreateCustomNamespace);
