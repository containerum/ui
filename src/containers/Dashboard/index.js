/* @flow */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import _ from 'lodash/fp';
import classNames from 'classnames/bind';

import { sourceType } from '../../config';
import type { Dispatch, ReduxState } from '../../types';
import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';
import * as actionGetSolutions from '../../actions/solutionsActions/getSolutions';
import * as actionGetResources from '../../actions/statisticsActions/getResources';
import {
  GET_SOLUTIONS_INVALID,
  GET_SOLUTIONS_REQUESTING,
  GET_SOLUTIONS_FAILURE,
  GET_SOLUTIONS_SUCCESS
} from '../../constants/solutionsConstants/getSolutions';
import {
  GET_BALANCE_INVALID,
  GET_BALANCE_FAILURE,
  GET_BALANCE_REQUESTING
} from '../../constants/billingConstants/getBalance';
import {
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_SUCCESS
} from '../../constants/namespacesConstants/getNamespaces';
import {
  GET_RESOURCES_INVALID,
  GET_RESOURCES_REQUESTING,
  GET_RESOURCES_FAILURE
} from '../../constants/statisticsConstants/getResourcesConstants';
import {
  RUN_SOLUTION_INVALID,
  RUN_SOLUTION_SUCCESS,
  RUN_SOLUTION_FAILURE
} from '../../constants/solutionConstants/runSolution';
import NamespacesDashboardList from '../../components/NamespacesDashboardList';
import SolutionsDashboardList from '../../components/SolutionsDashboardList';
import CountDeploymentsInfo from '../../components/CountDeploymentsInfo';
import CountServicesInfo from '../../components/CountServicesInfo';
import CountPodsInfo from '../../components/CountPodsInfo';
import DashboardBlockInfo from '../../components/DashboardBlockInfo';
import DashboardBlockTourAndNews from '../../components/DashboardBlockTourAndNews';
import RunSolutionItem from '../RunSolution';

import globalStyles from '../../theme/global.scss';
import styles from './index.scss';
import solutionStyles from '../Solutions/index.scss';
import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_INVALID,
  GET_PROFILE_REQUESTING
} from '../../constants/profileConstants/getProfile';

type Props = {
  history: Object,
  getProfileReducer: Object,
  getNamespacesReducer: Object,
  getBalanceReducer: Object,
  getSolutionsReducer: Object,
  getResourcesReducer: Object,
  fetchGetNamespacesIfNeeded: () => void,
  fetchGetSolutionsIfNeeded: () => void,
  fetchGetResourcesIfNeeded: () => void
};

const isOnline = sourceType === 'ONLINE';

// Export this for unit testing more easily
const dashboardClassName = classNames.bind(styles);

export class Dashboard extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      idName: null,
      displayedNamespaces: [],
      currentSolution: null,
      isOpenedSelectNamespace: false,
      statusOfRunSolution: RUN_SOLUTION_INVALID
    };
  }
  componentDidMount() {
    const {
      fetchGetNamespacesIfNeeded,
      fetchGetSolutionsIfNeeded,
      fetchGetResourcesIfNeeded
    } = this.props;
    fetchGetNamespacesIfNeeded();
    fetchGetSolutionsIfNeeded();
    fetchGetResourcesIfNeeded();
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getNamespacesReducer.readyStatus !==
        nextProps.getNamespacesReducer.readyStatus &&
      nextProps.getNamespacesReducer.readyStatus === GET_NAMESPACES_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedNamespaces: nextProps.getNamespacesReducer.data,
        idName: nextProps.getNamespacesReducer.data.length
          ? nextProps.getNamespacesReducer.data[0]
          : null
      });
    }
  }

  handleClickRunSolution = solutionName => {
    this.setState({
      ...this.state,
      currentSolution: solutionName,
      isOpenedSelectNamespace: true
    });
  };
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpenedSelectNamespace: !this.state.isOpenedSelectNamespace,
      idName: this.state.displayedNamespaces.length
        ? this.state.displayedNamespaces[0]
        : null,
      statusOfRunSolution: RUN_SOLUTION_INVALID
    });
  };
  handleSelectNamespace = value => {
    const currentNamespace = this.state.displayedNamespaces.filter(
      ns => ns.name === value
    );
    this.setState({
      ...this.state,
      idName: currentNamespace ? currentNamespace[0] : null
    });
  };
  handleSolutionSuccess = () => {
    this.setState({
      ...this.state,
      statusOfRunSolution: RUN_SOLUTION_SUCCESS
    });
  };
  handleSolutionFailure = () => {
    this.setState({
      ...this.state,
      statusOfRunSolution: RUN_SOLUTION_FAILURE
    });
  };

  renderNamespacesList = () => {
    const { getNamespacesReducer, getProfileReducer, history } = this.props;
    if (
      !getNamespacesReducer.readyStatus ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
      getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
      !getProfileReducer.readyStatus ||
      getProfileReducer.readyStatus === GET_PROFILE_INVALID ||
      getProfileReducer.readyStatus === GET_PROFILE_REQUESTING
    ) {
      return (
        <div
          style={{
            height: '130px',
            margin: '10px 10px',
            borderRadius: '2px',
            backgroundColor: '#f6f6f6'
          }}
        />
      );
    }
    if (
      getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE ||
      getProfileReducer.readyStatus === GET_PROFILE_FAILURE
    ) {
      return <p>Oops, Failed to load data of Namespaces!</p>;
    }
    return (
      <NamespacesDashboardList
        role={getProfileReducer.data.role}
        data={getNamespacesReducer.data}
        history={history}
      />
    );
  };
  renderSolutionsList = () => {
    const { getSolutionsReducer, history } = this.props;
    const solutionClassName = classNames.bind(solutionStyles);
    const solutionContainer = solutionClassName(
      'solutionContainer',
      'preSolutionContainer'
    );
    if (
      !getSolutionsReducer.readyStatus ||
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_INVALID ||
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_REQUESTING
    ) {
      return (
        <div
          className={`${solutionStyles.solutionContainerWrapper} ${
            globalStyles.marginTop30
          }`}
        >
          {new Array(8).fill().map(() => (
            <div
              key={_.uniqueId()}
              className={solutionContainer}
              style={{
                height: '240px',
                backgroundColor: '#f6f6f6'
              }}
            />
          ))}
        </div>
      );
    }
    if (getSolutionsReducer.readyStatus === GET_SOLUTIONS_FAILURE) {
      return <p>Oops, Failed to load data of Solutions!</p>;
    }
    return (
      <SolutionsDashboardList
        data={getSolutionsReducer.data}
        history={history}
        handleClickRunSolution={solutionName =>
          this.handleClickRunSolution(solutionName)
        }
      />
    );
  };
  renderCountDeploymentsInfo = () => {
    const { getResourcesReducer } = this.props;

    const className = classNames.bind(styles);

    const topBlock = className('blockContainer', 'topBlock');
    if (
      !getResourcesReducer.readyStatus ||
      getResourcesReducer.readyStatus === GET_RESOURCES_INVALID ||
      getResourcesReducer.readyStatus === GET_RESOURCES_REQUESTING
    ) {
      return (
        <div className="col-md-4">
          <div className={topBlock}>
            <div
              style={{
                height: '67px',
                width: '100%',
                borderRadius: '2px',
                backgroundColor: 'rgb(246, 246, 246)'
              }}
            />
          </div>
        </div>
      );
    }
    if (getResourcesReducer.readyStatus === GET_RESOURCES_FAILURE) {
      return <p>Oops, Failed to load data of Deployments!</p>;
    }
    return (
      <CountDeploymentsInfo count={getResourcesReducer.data.deployments} />
    );
  };
  renderCountServicesInfo = () => {
    const { getResourcesReducer } = this.props;
    const className = classNames.bind(styles);

    const topBlock = className('blockContainer', 'topBlock');
    if (
      !getResourcesReducer.readyStatus ||
      getResourcesReducer.readyStatus === GET_RESOURCES_INVALID ||
      getResourcesReducer.readyStatus === GET_RESOURCES_REQUESTING
    ) {
      return (
        <div className="col-md-4">
          <div className={topBlock}>
            <div
              style={{
                height: '67px',
                width: '100%',
                borderRadius: '2px',
                backgroundColor: 'rgb(246, 246, 246)'
              }}
            />
          </div>
        </div>
      );
    }
    if (getResourcesReducer.readyStatus === GET_RESOURCES_FAILURE) {
      return <p>Oops, Failed to load data of Services!</p>;
    }
    return (
      <CountServicesInfo
        count={
          Number.isInteger(getResourcesReducer.data.external_services)
            ? getResourcesReducer.data.external_services +
              getResourcesReducer.data.internal_services
            : getResourcesReducer.data.external_services
        }
      />
    );
  };
  renderCountPodsInfo = () => {
    const { getResourcesReducer } = this.props;
    const className = classNames.bind(styles);

    const topBlock = className('blockContainer', 'topBlock');
    if (
      !getResourcesReducer.readyStatus ||
      getResourcesReducer.readyStatus === GET_RESOURCES_INVALID ||
      getResourcesReducer.readyStatus === GET_RESOURCES_REQUESTING
    ) {
      return (
        <div className="col-md-4">
          <div className={topBlock}>
            <div
              style={{
                height: '67px',
                width: '100%',
                borderRadius: '2px',
                backgroundColor: 'rgb(246, 246, 246)'
              }}
            />
          </div>
        </div>
      );
    }
    if (getResourcesReducer.readyStatus === GET_RESOURCES_FAILURE) {
      return <p>Oops, Failed to load data of Pods!</p>;
    }
    return <CountPodsInfo count={getResourcesReducer.data.pods} />;
  };
  renderDashboardBlockTourAndNews = () => {
    const {
      getResourcesReducer,
      getBalanceReducer,
      getNamespacesReducer
    } = this.props;
    if (
      (isOnline &&
        (!getNamespacesReducer.readyStatus ||
          getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
          getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
          !getBalanceReducer.readyStatus ||
          getBalanceReducer.readyStatus === GET_BALANCE_INVALID ||
          getBalanceReducer.readyStatus === GET_BALANCE_REQUESTING ||
          !getResourcesReducer.readyStatus ||
          getResourcesReducer.readyStatus === GET_RESOURCES_INVALID ||
          getResourcesReducer.readyStatus === GET_RESOURCES_REQUESTING)) ||
      (!isOnline &&
        (!getNamespacesReducer.readyStatus ||
          getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
          getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
          !getResourcesReducer.readyStatus ||
          getResourcesReducer.readyStatus === GET_RESOURCES_INVALID ||
          getResourcesReducer.readyStatus === GET_RESOURCES_REQUESTING))
    ) {
      return (
        <div className="col-md-3 pr-0">
          <div
            className="block-container"
            style={{
              padding: 23
            }}
          >
            <div
              style={{
                height: 298,
                width: '100%',
                borderRadius: '2px',
                backgroundColor: 'rgb(246, 246, 246)'
              }}
            />
          </div>
        </div>
      );
    }
    if (
      (isOnline &&
        (getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE ||
          getBalanceReducer.readyStatus === GET_BALANCE_FAILURE ||
          getResourcesReducer.readyStatus === GET_RESOURCES_FAILURE)) ||
      (!isOnline &&
        (getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE ||
          getResourcesReducer.readyStatus === GET_RESOURCES_FAILURE))
    ) {
      return <p>Oops, Failed to load data of Tour!</p>;
    }
    return (
      <DashboardBlockTourAndNews
        resources={getResourcesReducer.data}
        balance={isOnline ? getBalanceReducer.data.balance : null}
        namespaces={getNamespacesReducer.data}
        linkToDeployment={
          getNamespacesReducer.data.length
            ? getNamespacesReducer.data[0].id
            : ''
        }
        linkToManageTeam={
          getNamespacesReducer.data.length
            ? getNamespacesReducer.data.find(
                ns => (ns.access === 'owner' ? ns.access : '')
              )
            : ''
        }
      />
    );
  };

  renderRunSolutionModal = () => {
    const { getNamespacesReducer, getSolutionsReducer } = this.props;

    if (
      getNamespacesReducer.readyStatus === GET_NAMESPACES_SUCCESS &&
      getSolutionsReducer.readyStatus === GET_SOLUTIONS_SUCCESS
    ) {
      const {
        currentSolution,
        isOpenedSelectNamespace,
        idName,
        displayedNamespaces,
        statusOfRunSolution
      } = this.state;

      return (
        <RunSolutionItem
          idName={idName}
          currentSolution={currentSolution}
          displayedNamespaces={displayedNamespaces}
          isOpenedSelectNamespace={isOpenedSelectNamespace}
          statusOfRunSolution={statusOfRunSolution}
          handleOpenCloseModal={this.handleOpenCloseModal}
          handleSelectNamespace={value => this.handleSelectNamespace(value)}
          handleSolutionFailure={this.handleSolutionFailure}
          handleSolutionSuccess={this.handleSolutionSuccess}
        />
      );
    }
    return null;
  };

  render() {
    // const { getNamespacesReducer } = this.props;

    const blockContainer = dashboardClassName('blockContainer', 'blockH');

    const blockContainerTabs = dashboardClassName(
      'blockContainer',
      'blockContainerTabs'
    );

    return (
      <div>
        <div>
          <Helmet title="Dashboard" />
          {this.renderRunSolutionModal()}
          <div
            className={`container ${styles.dashboardWrap}`}
            style={{ background: 'none !important', boxShadow: 'none' }}
          >
            <div className="row">
              <div className="col-md-9 pl-0">
                <div className="row">
                  {this.renderCountDeploymentsInfo()}

                  {this.renderCountServicesInfo()}

                  {this.renderCountPodsInfo()}

                  <DashboardBlockInfo />

                  <div className={`col-md-10 ${globalStyles.colNamespaces}`}>
                    <div className={blockContainer}>
                      <div className={styles.topBlockHeader}>Namespaces</div>
                      {this.renderNamespacesList()}
                    </div>
                  </div>
                </div>
              </div>

              {this.renderDashboardBlockTourAndNews()}
            </div>

            {sourceType === 'ONLINE' && (
              <div className="row">
                <div className="col-md-12 pl-0 pr-0">
                  <div className={blockContainerTabs}>
                    <div className={styles.blockContainerTabsHeader}>
                      PRE-BUILT SOLUTIONS
                    </div>
                    <ul
                      className="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <NavLink
                          className={`${styles.customSolutionNavLink} nav-link`}
                          id="first-tab"
                          data-toggle="pill"
                          to="/dashboard"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          All
                        </NavLink>
                      </li>
                    </ul>

                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="first"
                        role="tabpanel"
                        aria-labelledby="first-tab"
                      >
                        {this.renderSolutionsList()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getProfileReducer,
    getNamespacesReducer,
    getBalanceReducer,
    getSolutionsReducer,
    getResourcesReducer
  }: ReduxState) => ({
    getProfileReducer,
    getNamespacesReducer,
    getBalanceReducer,
    getSolutionsReducer,
    getResourcesReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespacesIfNeeded: () =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded()),
    fetchGetSolutionsIfNeeded: () =>
      dispatch(actionGetSolutions.fetchGetSolutionsIfNeeded()),
    fetchGetResourcesIfNeeded: () =>
      dispatch(actionGetResources.fetchGetResourcesIfNeeded())
  })
);

export default connector(Dashboard);
