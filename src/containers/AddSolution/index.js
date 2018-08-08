/* @flow */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';
import type { Dispatch, ReduxState } from '../../types';
import * as actionAddSolution from '../../actions/solutionActions/addSolution';
import NavigationHeaderItem from '../NavigationHeader';
import Notification from '../Notification';
import InputControl from '../../components/InputControl';
import LoadButton from '../../components/LoadButton';
import BackButton from '../../components/BackButton';
import globalStyles from '../../theme/global.scss';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';

type Props = {
  history: Object,
  getProfileReducer: Object,
  addSolutionReducer: Object,
  fetchAddSolutionIfNeeded: (data: Object) => void
};

export class Solution extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      url: '',
      cpu: 100,
      memory: 100
    };
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentWillUpdate(nextProps) {
    const { history } = this.props;
    if (
      this.props.getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      if (nextProps.getProfileReducer.data.role !== 'admin') {
        history.push(routerLinks.namespaces);
      }
    }
  }

  handleChangeInput = (type, value) => {
    this.setState({
      ...this.state,
      [`${type}`]: value
    });
  };
  handleSubmitAddSolution = e => {
    e.preventDefault();
    this.props.fetchAddSolutionIfNeeded(this.state);
  };

  render() {
    const { addSolutionReducer } = this.props;
    const { label, url, cpu, memory } = this.state;
    return (
      <React.Fragment>
        <Helmet title="Add solution" />
        <div className="container-fluid breadcrumbNavigation">
          <NavigationHeaderItem IdCreate="solution" idName="new" />
        </div>
        <Notification
          status={addSolutionReducer.status}
          name={addSolutionReducer.label}
          method={addSolutionReducer.method}
          errorMessage={addSolutionReducer.err}
        />
        <div className={globalStyles.contentBlock}>
          <div className={globalStyles.contentBlock}>
            <div className={`container ${globalStyles.containerNoBackground}`}>
              <div className="row pageWidth">
                <div
                  className="col-md-3 sideMenu"
                  style={{ padding: '20px 0px' }}
                >
                  <BackButton path={routerLinks.solutions} />
                </div>
                <div className="col-md-9 pageContent" style={{ marginTop: 5 }}>
                  <form onSubmit={e => this.handleSubmitAddSolution(e)}>
                    <div className="blockContainer blockAddContainerPadin">
                      <div className="col-md-12">
                        <div>
                          <div
                            className="row rowLine"
                            style={{ borderBottom: 'none', paddingBottom: 0 }}
                            id="name"
                          >
                            <div className="col-md-7">
                              <div
                                className="containerTitle"
                                style={{ marginBottom: 30 }}
                              >
                                Add Solution
                              </div>
                              <InputControl
                                value={label}
                                id="solutionName"
                                type="text"
                                pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                                required
                                baseClassName="form-group__input-text form-control customInput"
                                baseClassNameLabel={`form-group__label ${label &&
                                  'form-group__label-always-onfocus'}`}
                                labelText="Name"
                                textHelper="Solution name can only contain letters, numbers and characters"
                                baseClassNameHelper="form-group__helper"
                                handleChangeInput={e =>
                                  this.handleChangeInput(
                                    'label',
                                    e.target.value
                                  )
                                }
                              />
                              <br />
                              <InputControl
                                value={url}
                                id="solutionUrl"
                                type="text"
                                pattern="^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?$"
                                title="Example: https://github.com/containerum/redmine-mariadb-solution"
                                maxLength={150}
                                required
                                baseClassName="form-group__input-text form-control customInput"
                                baseClassNameLabel={`form-group__label ${url &&
                                  'form-group__label-always-onfocus'}`}
                                labelText="Url"
                                textHelper="Example: https://github.com/containerum/redmine-mariadb-solution"
                                baseClassNameHelper="form-group__helper"
                                handleChangeInput={e =>
                                  this.handleChangeInput('url', e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div
                            className="row rowLine"
                            style={{ borderBottom: 'none' }}
                            id="parameters"
                          >
                            <div className="col-md-12">
                              <div className="containerTitle containerBlockTitle">
                                <span>*</span> Parameters
                              </div>
                            </div>
                            <div
                              className="col-md-5 myColumn"
                              style={{ marginBottom: 20 }}
                            >
                              <InputControl
                                value={cpu}
                                id="cpu"
                                type="number"
                                required
                                min="1"
                                baseClassName="form-group__input-text form-control customInput"
                                baseClassNameLabel={`form-group__label ${
                                  cpu || cpu === 0
                                    ? 'form-group__label-always-onfocus'
                                    : ''
                                }`}
                                labelText="CPU"
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
                                required
                                min="1"
                                baseClassName="form-group__input-text form-control customInput"
                                baseClassNameLabel={`form-group__label ${
                                  memory || memory === 0
                                    ? 'form-group__label-always-onfocus'
                                    : ''
                                }`}
                                labelText="RAM"
                                handleChangeInput={e => {
                                  const cpuValue = parseInt(e.target.value, 10);
                                  this.handleChangeInput(
                                    'memory',
                                    Number.isInteger(cpuValue) ? cpuValue : ''
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <LoadButton
                      type="submit"
                      buttonText="Add solution"
                      isFetching={addSolutionReducer.isFetching}
                      baseClassButton="btnDeployment btnService"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getProfileReducer, addSolutionReducer }: ReduxState) => ({
    getProfileReducer,
    addSolutionReducer
  }),
  (dispatch: Dispatch) => ({
    fetchAddSolutionIfNeeded: (data: Object) =>
      dispatch(actionAddSolution.fetchAddSolutionIfNeeded(data))
  })
);

export default connector(Solution);
