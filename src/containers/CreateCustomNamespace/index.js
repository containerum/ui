/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
// import _ from 'lodash/fp';
import Scrollspy from 'react-scrollspy';
import cookie from 'react-cookies';

import scrollById from '../../functions/scrollById';
import { routerLinks } from '../../config';
import * as actionCreateCustomNamespace from '../../actions/namespaceActions/createCustomNamespace';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';
// import { CREATE_CUSTOM_NAMESPACE_SUCCESS } from '../../constants/namespaceConstants/createCustomNamespace';
import type { Dispatch, ReduxState } from '../../types';
import NavigationHeaderItem from '../NavigationHeader';
import LoadButton from '../../components/LoadButton';
import Notification from '../Notification';
import CreateCustomNamespaceInfo from '../../components/CreateUpdateCustomNamespaceInfo';
// import Name from '../../components/CreateNamespaceCards/Name';
import globalStyles from '../../theme/global.scss';

type Props = {
  history: Object,
  getProfileReducer: Object,
  createCustomNamespaceReducer: Object,
  fetchCreateCustomNamespaceIfNeeded: (data: Object) => void
};

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
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentWillUpdate(nextProps) {
    const { getProfileReducer, history } = this.props;
    if (
      getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      if (nextProps.getProfileReducer.data.role !== 'admin') {
        history.push(routerLinks.namespaces);
      }
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
      <CreateCustomNamespaceInfo
        label={label}
        cpu={cpu}
        memory={memory}
        maxExtServices={maxExtServices}
        maxIntServices={maxIntServices}
        maxTraffic={maxTraffic}
        handleChangeInput={(type, value) => this.handleChangeInput(type, value)}
      />
    );
  };

  render() {
    const { createCustomNamespaceReducer } = this.props;
    return (
      <div>
        <Helmet title="Create Custom Project" />
        <div className="container-fluid breadcrumbNavigation">
          <NavigationHeaderItem IdCreate="namespace" idName="new" />
        </div>
        <Notification
          status={createCustomNamespaceReducer.status}
          name={createCustomNamespaceReducer.idName}
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
                    buttonText="Create project"
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
