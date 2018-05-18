/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';
import Scrollspy from 'react-scrollspy';

import scrollById from '../../functions/scrollById';
import { routerLinks } from '../../config';
import * as actionGetNamespace from '../../actions/namespaceActions/getNamespace';
import * as actionUpdateCustomNamespace from '../../actions/namespaceActions/updateCustomNamespace';
import {
  GET_NAMESPACE_INVALID,
  GET_NAMESPACE_REQUESTING,
  GET_NAMESPACE_FAILURE,
  GET_NAMESPACE_SUCCESS
} from '../../constants/namespaceConstants/getNamespace';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';
// import { CREATE_CUSTOM_NAMESPACE_SUCCESS } from '../../constants/namespaceConstants/updateCustomNamespace';
import type { Dispatch, ReduxState } from '../../types';
import NavigationHeaderItem from '../NavigationHeader';
import LoadButton from '../../components/LoadButton';
import Notification from '../Notification';
import UpdateCustomNamespaceInfo from '../../components/CreateUpdateCustomNamespaceInfo';
// import Name from '../../components/UpdateNamespaceCards/Name';
import globalStyles from '../../theme/global.scss';

type Props = {
  match: Object,
  history: Object,
  getNamespaceReducer: Object,
  getProfileReducer: Object,
  updateCustomNamespaceReducer: Object,
  fetchGetNamespaceIfNeeded: (idName: string) => void,
  fetchUpdateCustomNamespaceIfNeeded: (data: Object) => void
};

// Export this for unit testing more easily
export class UpdateCustomNamespace extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      cpu: '',
      memory: '',
      maxExtServices: '',
      maxIntServices: '',
      maxTraffic: ''
    };
  }
  componentDidMount() {
    const { fetchGetNamespaceIfNeeded, match } = this.props;
    fetchGetNamespaceIfNeeded(match.params.idName);
  }
  componentWillUpdate(nextProps) {
    const { getProfileReducer, getNamespaceReducer, history } = this.props;
    if (
      getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      // console.log(nextProps.getProfileReducer.data.role);
      if (nextProps.getProfileReducer.data.role !== 'admin') {
        history.push(routerLinks.namespaces);
      }
    }
    if (
      getNamespaceReducer.readyStatus !==
        nextProps.getNamespaceReducer.readyStatus &&
      nextProps.getNamespaceReducer.readyStatus === GET_NAMESPACE_SUCCESS
    ) {
      const { cpu, memory } = nextProps.getNamespaceReducer.data.resources.hard;
      this.setState({
        ...this.state,
        label: nextProps.getNamespaceReducer.data.name,
        cpu,
        memory,
        maxExtServices: '',
        maxIntServices: '',
        maxTraffic: ''
      });
    }
  }
  handleSubmitUpdateCustomNamespace = e => {
    e.preventDefault();
    const { fetchUpdateCustomNamespaceIfNeeded } = this.props;
    fetchUpdateCustomNamespaceIfNeeded(this.state);
  };
  handleChangeInput = (type, value) => {
    this.setState({
      ...this.state,
      [`${type}`]: value
    });
  };

  renderUpdateCustomNamespaceSidebar = () => {
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
  renderUpdateCustomNamespace = () => {
    const { getNamespaceReducer } = this.props;
    if (
      !getNamespaceReducer.readyStatus ||
      getNamespaceReducer.readyStatus === GET_NAMESPACE_INVALID ||
      getNamespaceReducer.readyStatus === GET_NAMESPACE_REQUESTING
    ) {
      return (
        <div className="row">
          {new Array(8).fill().map(() => (
            <div key={_.uniqueId()} className="col-md-3">
              <div className="namespace-plan-block-placeholder">
                <img
                  src={require('../../images/add-ns-block.svg')}
                  alt="add-ns"
                />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (getNamespaceReducer.readyStatus === GET_NAMESPACE_FAILURE) {
      return <p>Oops, Failed to load data of Namespace!</p>;
    }

    const {
      label,
      cpu,
      memory,
      maxExtServices,
      maxIntServices,
      maxTraffic
    } = this.state;
    return (
      <UpdateCustomNamespaceInfo
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
    const { updateCustomNamespaceReducer } = this.props;
    return (
      <div>
        <Helmet title="Update Custom Namespace" />
        <div className="container-fluid breadcrumbNavigation">
          <NavigationHeaderItem IdUpdate="namespace" />
        </div>
        <Notification
          status={updateCustomNamespaceReducer.status}
          name={updateCustomNamespaceReducer.idDep}
          method={updateCustomNamespaceReducer.method}
          errorMessage={updateCustomNamespaceReducer.err}
        />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            <div className="row pageWidth">
              <div
                className="col-md-3 sideMenu"
                style={{ padding: '20px 0px' }}
              >
                {this.renderUpdateCustomNamespaceSidebar()}
              </div>
              <div className="col-md-9 pageContent">
                <form onSubmit={e => this.handleSubmitUpdateCustomNamespace(e)}>
                  <div className="blockContainer blockAddContainerPadin">
                    <div className="col-md-12">
                      {this.renderUpdateCustomNamespace()}
                    </div>
                  </div>
                  <LoadButton
                    type="submit"
                    buttonText="Update namespace"
                    isFetching={updateCustomNamespaceReducer.isFetching}
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
  ({
    updateCustomNamespaceReducer,
    getNamespaceReducer,
    getProfileReducer
  }: ReduxState) => ({
    updateCustomNamespaceReducer,
    getNamespaceReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespaceIfNeeded: (idName: string) =>
      dispatch(actionGetNamespace.fetchGetNamespaceIfNeeded(idName)),
    fetchUpdateCustomNamespaceIfNeeded: (data: Object) =>
      dispatch(
        actionUpdateCustomNamespace.fetchUpdateCustomNamespaceIfNeeded(data)
      )
  })
);

export default connector(UpdateCustomNamespace);
