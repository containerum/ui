/* @flow */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import _ from 'lodash/fp';
import classNames from 'classnames/bind';
import cookie from 'react-cookies';
import * as Recharts from 'recharts';

import { routerLinks, sourceType } from '../../config';
import type { Dispatch, ReduxState } from '../../types';
import * as actionGetNamespaces from '../../actions/namespacesActions/getNamespaces';
import * as actionGetSolutions from '../../actions/solutionsActions/getSolutions';
import * as actionGetResources from '../../actions/statisticsActions/getResources';
import * as actionGetCpuStatistic from '../../actions/statisticsActions/getCpuStatistic';
import * as actionGetCpuHistoryStatistic from '../../actions/statisticsActions/getCpuHistoryStatistic';
import * as actionGetMemoryStatistic from '../../actions/statisticsActions/getMemoryStatistic';
import {
  GET_SOLUTIONS_INVALID,
  GET_SOLUTIONS_REQUESTING,
  GET_SOLUTIONS_FAILURE
} from '../../constants/solutionsConstants/getSolutions';
import {
  GET_BALANCE_INVALID,
  GET_BALANCE_FAILURE,
  GET_BALANCE_REQUESTING
} from '../../constants/billingConstants/getBalance';
import {
  GET_NAMESPACES_INVALID,
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_FAILURE
} from '../../constants/namespacesConstants/getNamespaces';
import {
  GET_RESOURCES_INVALID,
  GET_RESOURCES_REQUESTING,
  GET_RESOURCES_FAILURE
} from '../../constants/statisticsConstants/getResourcesConstants';
import NamespacesDashboardList from '../../components/NamespacesDashboardList';
import SolutionsDashboardList from '../../components/SolutionsDashboardList';
import CountDeploymentsInfo from '../../components/CountDeploymentsInfo';
import CountServicesInfo from '../../components/CountServicesInfo';
import CountPodsInfo from '../../components/CountPodsInfo';
import DashboardBlockInfo from '../../components/DashboardBlockInfo';
import DashboardBlockTourAndNews from '../../components/DashboardBlockTourAndNews';
import RunSolutionModal from '../RunSolution';
import SideBarGetStartedModal from '../../components/SideBarGetStartedModal';
import HideWidgetModal from '../../components/CustomerModal/HideWidgetModal';

import globalStyles from '../../theme/global.scss';
import styles from './index.scss';
import solutionStyles from '../Solutions/index.scss';
import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_INVALID,
  GET_PROFILE_REQUESTING
} from '../../constants/profileConstants/getProfile';
import * as actionGetConfigMaps from '../../actions/configMapActions/getConfigMaps';
import {
  GET_CPU_STATISTIC_FAILURE,
  GET_CPU_STATISTIC_INVALID,
  GET_CPU_STATISTIC_REQUESTING,
  GET_CPU_STATISTIC_SUCCESS
} from '../../constants/statisticsConstants/getCpuStatistic';
import {
  GET_MEMORY_STATISTIC_FAILURE,
  GET_MEMORY_STATISTIC_INVALID,
  GET_MEMORY_STATISTIC_REQUESTING,
  GET_MEMORY_STATISTIC_SUCCESS
} from '../../constants/statisticsConstants/getMemoryStatistic';

const {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} = Recharts;

type Props = {
  location: Object,
  history: Object,
  getProfileReducer: Object,
  getNamespacesReducer: Object,
  getBalanceReducer: Object,
  getSolutionsReducer: Object,
  getResourcesReducer: Object,
  getConfigMapsReducer: Object,
  getCpuStatisticReducer: Object,
  getMemoryStatisticReducer: Object,
  fetchGetConfigMapsIfNeeded: () => void,
  fetchGetNamespacesIfNeeded: () => void,
  fetchGetSolutionsIfNeeded: () => void,
  fetchGetResourcesIfNeeded: () => void,
  fetchGetCpuStatisticIfNeeded: () => void,
  fetchGetCpuHistoryStatisticIfNeeded: () => void,
  fetchGetMemoryStatisticIfNeeded: () => void
};

const isOnline = sourceType === 'ONLINE';

const dashboardClassName = classNames.bind(styles);

const data = [
  { name: 'Page A', cpu: 2400 },
  { name: 'Page B', cpu: 1398 },
  { name: 'Page C', cpu: 9800 },
  { name: 'Page D', cpu: 3908 },
  { name: 'Page E', cpu: 4800 },
  { name: 'Page F', cpu: 3800 },
  { name: 'Page G', cpu: 4300 }
];

const d = new Date();
const ms = Date.parse(d.toISOString());
const date = new Date(ms - 432000000); // 120 hours
console.log(date.toISOString());

export class Dashboard extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isOpenedSideBarGetStarted: false,
      isOpenedRunSolution: false,
      isOpenedHideWidget: false,
      isViewWidget: true,
      currentSolutionTemplate: null,
      dataOfCpu: [{ name: 'cpu', value: 0 }],
      dataOfMemory: [{ name: 'memory', value: 0 }]
    };
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentDidMount() {
    const {
      fetchGetSolutionsIfNeeded,
      fetchGetResourcesIfNeeded,
      fetchGetConfigMapsIfNeeded,
      fetchGetCpuStatisticIfNeeded,
      fetchGetMemoryStatisticIfNeeded,
      fetchGetCpuHistoryStatisticIfNeeded
    } = this.props;
    isOnline && fetchGetSolutionsIfNeeded();
    fetchGetResourcesIfNeeded();
    fetchGetConfigMapsIfNeeded();
    !isOnline && fetchGetCpuStatisticIfNeeded();
    !isOnline && fetchGetMemoryStatisticIfNeeded();
    !isOnline && fetchGetCpuHistoryStatisticIfNeeded();
    const widget = cookie.load('widget');
    if (widget === 'hide') {
      this.setState({
        ...this.state,
        isViewWidget: false
      });
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (
      this.props.getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      this.props.fetchGetNamespacesIfNeeded(
        nextProps.getProfileReducer.data.role
      );
    }
    if (
      this.props.getCpuStatisticReducer.readyStatus !==
        nextProps.getCpuStatisticReducer.readyStatus &&
      nextProps.getCpuStatisticReducer.readyStatus === GET_CPU_STATISTIC_SUCCESS
    ) {
      this.setState({
        ...this.state,
        dataOfCpu: [
          { name: 'cpu', value: nextProps.getCpuStatisticReducer.data.cpu }
        ]
      });
    }
    if (
      this.props.getMemoryStatisticReducer.readyStatus !==
        nextProps.getMemoryStatisticReducer.readyStatus &&
      nextProps.getMemoryStatisticReducer.readyStatus ===
        GET_MEMORY_STATISTIC_SUCCESS
    ) {
      const valueOfMemory =
        nextProps.getMemoryStatisticReducer.data.cpu === 1
          ? 1
          : nextProps.getMemoryStatisticReducer.data.cpu * 100 / 32768;
      this.setState({
        ...this.state,
        dataOfMemory: [
          {
            name: 'memory',
            value: valueOfMemory
          }
        ]
      });
    }
    if (nextState.isOpenedSideBarGetStarted && typeof document === 'object') {
      const getHtml = document.querySelector('html');
      getHtml.style.overflow = 'hidden';
    } else if (
      !nextState.isOpenedSideBarGetStarted &&
      typeof document === 'object'
    ) {
      const getHtml = document.querySelector('html');
      getHtml.style.overflow = 'auto';
    }
    if (nextState.isOpenedRunSolution && typeof document === 'object') {
      const getHtml = document.querySelector('html');
      getHtml.style.overflow = 'hidden';
    } else if (!nextState.isOpenedRunSolution && typeof document === 'object') {
      const getHtml = document.querySelector('html');
      getHtml.style.overflow = 'auto';
    }
  }
  componentWillUnmount() {
    if (typeof document === 'object') {
      const getHtml = document.querySelector('html');
      getHtml.style.overflow = 'auto';
    }
  }

  handleClickRunSolution = solutionTemplate => {
    this.setState({
      ...this.state,
      isOpenedRunSolution: true,
      currentSolutionTemplate: solutionTemplate
    });
    // this.props.history.push(`/solutions/${solutionTemplate}/runSolution`);
  };
  handleOpenClose = () => {
    this.setState({
      ...this.state,
      isOpenedRunSolution: false,
      currentSolutionTemplate: null
    });
  };
  handleOpenCloseSidebar = () => {
    this.setState({
      ...this.state,
      isOpenedSideBarGetStarted: false
    });
  };
  handleClickDontShow = () => {
    this.setState({
      ...this.state,
      isOpenedSideBarGetStarted: false,
      isOpenedHideWidget: true
    });
  };
  handleOpenCloseHideWidgetModal = () => {
    this.setState({
      ...this.state,
      isOpenedHideWidget: !this.state.isOpenedHideWidget
    });
  };
  handleSubmitHideWidget = () => {
    cookie.save('widget', 'hide', { path: '/' });
    this.setState({
      ...this.state,
      isOpenedHideWidget: false,
      isViewWidget: false
    });
  };
  simplePieChart = (dataType, angel) => (
    <PieChart width={160} height={160} onMouseEnter={this.onPieEnter}>
      <Pie
        data={dataType}
        cx={75}
        cy={75}
        labelLine={false}
        label={this.renderCustomizedLabel}
        startAngle={angel}
        endAngle={0}
        outerRadius={80}
        innerRadius={60}
        fill="#8884d8"
      >
        <Cell fill="#29abe2" />
      </Pie>
    </PieChart>
  );
  renderCustomizedLabel = percentages => (
    <text
      x="51%"
      y="51%"
      alignmentBaseline="middle"
      textAnchor="middle"
      fontSize={percentages.payload.value === 1 ? '30' : '40'}
    >
      {`${
        percentages.payload.value === 1
          ? 'no data'
          : `${percentages.payload.value.toFixed(0)}%`
      }`}
    </text>
  );

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
      return <p>Oops, Failed to load data of Projects!</p>;
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
      getNamespacesReducer,
      getProfileReducer,
      getConfigMapsReducer
    } = this.props;
    if (
      (isOnline &&
        (!getNamespacesReducer.readyStatus ||
          getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
          getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
          !getBalanceReducer.readyStatus ||
          getBalanceReducer.readyStatus === GET_BALANCE_INVALID ||
          getBalanceReducer.readyStatus === GET_BALANCE_REQUESTING ||
          !getProfileReducer.readyStatus ||
          getProfileReducer.readyStatus === GET_PROFILE_INVALID ||
          getProfileReducer.readyStatus === GET_PROFILE_REQUESTING ||
          !getResourcesReducer.readyStatus ||
          getResourcesReducer.readyStatus === GET_RESOURCES_INVALID ||
          getResourcesReducer.readyStatus === GET_RESOURCES_REQUESTING)) ||
      (!isOnline &&
        (!getNamespacesReducer.readyStatus ||
          getNamespacesReducer.readyStatus === GET_NAMESPACES_INVALID ||
          getNamespacesReducer.readyStatus === GET_NAMESPACES_REQUESTING ||
          !getProfileReducer.readyStatus ||
          getProfileReducer.readyStatus === GET_PROFILE_INVALID ||
          getProfileReducer.readyStatus === GET_PROFILE_REQUESTING ||
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
          getProfileReducer.readyStatus === GET_PROFILE_FAILURE ||
          getResourcesReducer.readyStatus === GET_RESOURCES_FAILURE)) ||
      (!isOnline &&
        (getNamespacesReducer.readyStatus === GET_NAMESPACES_FAILURE ||
          getProfileReducer.readyStatus === GET_PROFILE_FAILURE ||
          getResourcesReducer.readyStatus === GET_RESOURCES_FAILURE))
    ) {
      return <p>Oops, Failed to load data of Tour!</p>;
    }

    const currentNS = getNamespacesReducer.data.find(
      ns => ns.access !== 'read'
    );
    let linkTo = false;
    if (getProfileReducer.data.role === 'admin') {
      linkTo = true;
    }
    return (
      <DashboardBlockTourAndNews
        configmaps={getConfigMapsReducer}
        resources={getResourcesReducer.data}
        balance={isOnline ? getBalanceReducer.data.balance : null}
        linkToDeployment={
          getNamespacesReducer.data.length && currentNS ? currentNS.id : ''
        }
        linkToManageTeam={
          getNamespacesReducer.data.length
            ? getNamespacesReducer.data.find(
                ns => (ns.access === 'owner' ? ns.access : '')
              )
            : ''
        }
        linkToManageTeamAdmin={linkTo}
      />
    );
  };
  renderStatistics = () => {
    const { getCpuStatisticReducer, getMemoryStatisticReducer } = this.props;
    if (
      !getCpuStatisticReducer.readyStatus ||
      getCpuStatisticReducer.readyStatus === GET_CPU_STATISTIC_INVALID ||
      getCpuStatisticReducer.readyStatus === GET_CPU_STATISTIC_REQUESTING ||
      !getMemoryStatisticReducer.readyStatus ||
      getMemoryStatisticReducer.readyStatus === GET_MEMORY_STATISTIC_INVALID ||
      getMemoryStatisticReducer.readyStatus === GET_MEMORY_STATISTIC_REQUESTING
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
      getCpuStatisticReducer.readyStatus === GET_CPU_STATISTIC_FAILURE ||
      getMemoryStatisticReducer.readyStatus === GET_MEMORY_STATISTIC_FAILURE
    ) {
      return <p>Oops, Failed to load data of cpu statistic!</p>;
    }

    const cpuRadius =
      getCpuStatisticReducer.data.cpu === 1
        ? 360
        : getCpuStatisticReducer.data.cpu * 3.6;
    const memoryRadius =
      getMemoryStatisticReducer.data.cpu === 1
        ? 360
        : getMemoryStatisticReducer.data.cpu * 100 / 32768 * 3.6;
    return (
      <div>
        <div
          style={{
            textAlign: 'center',
            width: '33%',
            display: 'inline-block'
          }}
        >
          <div className="nav-item">
            <div
              className={`${styles.customSolutionNavLink} nav-link`}
              style={{
                width: 60,
                margin: '0 auto',
                marginBottom: 30
              }}
            >
              CPU
            </div>
          </div>
          {this.simplePieChart(this.state.dataOfCpu, cpuRadius)}
        </div>
        <div
          style={{
            textAlign: 'center',
            width: '33%',
            display: 'inline-block'
          }}
        >
          <div className="nav-item">
            <div
              className={`${styles.customSolutionNavLink} nav-link`}
              style={{
                width: 60,
                margin: '0 auto',
                marginBottom: 30
              }}
            >
              Memory
            </div>
          </div>
          {this.simplePieChart(this.state.dataOfMemory, memoryRadius)}
        </div>
      </div>
    );
  };

  render() {
    const blockContainer = dashboardClassName('blockContainer', 'blockH');
    const blockContainerTabs = dashboardClassName(
      'blockContainer',
      'blockContainerTabs'
    );

    const { history, location } = this.props;
    const {
      isOpenedSideBarGetStarted,
      isOpenedRunSolution,
      currentSolutionTemplate,
      isOpenedHideWidget,
      isViewWidget
    } = this.state;
    return (
      <div>
        {!isOpenedSideBarGetStarted &&
          isViewWidget &&
          isOnline && (
            <div
              className={styles.GetStartedWrapper}
              onClick={() =>
                this.setState({
                  ...this.state,
                  isOpenedSideBarGetStarted: !isOpenedSideBarGetStarted
                })
              }
            >
              <span className={styles.GetStarted}>Get Started</span>
            </div>
          )}
        {isOpenedSideBarGetStarted && (
          <SideBarGetStartedModal
            handleOpenCloseSidebar={this.handleOpenCloseSidebar}
            isOpenedSideBarGetStarted={isOpenedSideBarGetStarted}
            handleClickDontShow={this.handleClickDontShow}
          />
        )}
        {isOpenedHideWidget && (
          <HideWidgetModal
            isOpened={isOpenedHideWidget}
            handleOpenCloseHideWidgetModal={this.handleOpenCloseHideWidgetModal}
            onHandleHide={this.handleSubmitHideWidget}
          />
        )}
        <div>
          {currentSolutionTemplate ? (
            <Helmet title={`Run ${currentSolutionTemplate}`} />
          ) : (
            <Helmet title="Dashboard" />
          )}
          {isOpenedRunSolution && (
            <RunSolutionModal
              history={history}
              location={location}
              isOpenedRunSolution={isOpenedRunSolution}
              currentSolutionTemplate={currentSolutionTemplate}
              handleOpenClose={this.handleOpenClose}
            />
          )}
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
                      <div className={styles.topBlockHeader}>Projects</div>
                      {this.renderNamespacesList()}
                    </div>
                  </div>
                </div>
              </div>

              {this.renderDashboardBlockTourAndNews()}
            </div>
            {!isOnline && (
              <div className="row">
                <div className="col-md-12 pl-0 pr-0">
                  <div className={blockContainerTabs}>
                    <div className={styles.blockContainerTabsHeader}>
                      Statistics
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
                          to={routerLinks.dashboard}
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
                        <div style={{ margin: 40, textAlign: 'justify' }}>
                          <div>{this.renderStatistics()}</div>
                          <div style={{ marginTop: 60 }}>
                            <LineChart
                              width={600}
                              height={300}
                              data={data}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                              }}
                            >
                              <XAxis dataKey="name" />
                              <YAxis />
                              <CartesianGrid strokeDasharray="3 3" />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="cpu"
                                stroke="#29abe2"
                                activeDot={{ r: 8 }}
                              />
                            </LineChart>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isOnline && (
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
                          to={routerLinks.dashboard}
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
    getResourcesReducer,
    getConfigMapsReducer,
    getCpuStatisticReducer,
    getMemoryStatisticReducer
  }: ReduxState) => ({
    getProfileReducer,
    getNamespacesReducer,
    getBalanceReducer,
    getSolutionsReducer,
    getResourcesReducer,
    getConfigMapsReducer,
    getCpuStatisticReducer,
    getMemoryStatisticReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespacesIfNeeded: (role: string) =>
      dispatch(actionGetNamespaces.fetchGetNamespacesIfNeeded(role)),
    fetchGetSolutionsIfNeeded: () =>
      dispatch(actionGetSolutions.fetchGetSolutionsIfNeeded()),
    fetchGetResourcesIfNeeded: () =>
      dispatch(actionGetResources.fetchGetResourcesIfNeeded()),
    fetchGetConfigMapsIfNeeded: () =>
      dispatch(actionGetConfigMaps.fetchGetConfigMapsIfNeeded()),
    fetchGetCpuStatisticIfNeeded: () =>
      dispatch(actionGetCpuStatistic.fetchGetCpuStatisticIfNeeded()),
    fetchGetCpuHistoryStatisticIfNeeded: () =>
      dispatch(
        actionGetCpuHistoryStatistic.fetchGetCpuHistoryStatisticIfNeeded()
      ),
    fetchGetMemoryStatisticIfNeeded: () =>
      dispatch(actionGetMemoryStatistic.fetchGetMemoryStatisticIfNeeded())
  })
);

export default connector(Dashboard);
