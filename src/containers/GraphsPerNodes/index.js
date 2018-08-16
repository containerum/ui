import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import type { Connector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import cookie from 'react-cookies';
import * as Recharts from 'recharts';

import { routerLinks } from '../../config';
import type { Dispatch, ReduxState } from '../../types';
import styles from '../Dashboard/index.scss';
import BackButton from '../../components/BackButton';
import * as actionGetCpuHistoryPerNodesStatistic from '../../actions/statisticsActions/getCpuHistoryPerNodesStatistic';
import * as actionGetMemoryHistoryPerNodesStatistic from '../../actions/statisticsActions/getMemoryHistoryPerNodesStatistic';

import globalStyles from '../../theme/global.scss';
import {
  GET_CPU_HISTORY_PER_NODES_STATISTIC_FAILURE,
  GET_CPU_HISTORY_PER_NODES_STATISTIC_INVALID,
  GET_CPU_HISTORY_PER_NODES_STATISTIC_REQUESTING
} from '../../constants/statisticsConstants/getCpuHistoryPerNodesStatistic';
import {
  GET_MEMORY_HISTORY_PER_NODES_STATISTIC_FAILURE,
  GET_MEMORY_HISTORY_PER_NODES_STATISTIC_INVALID,
  GET_MEMORY_HISTORY_PER_NODES_STATISTIC_REQUESTING
} from '../../constants/statisticsConstants/getMemoryHistoryPerNodesStatistic';

const {
  AreaChart,
  Area,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush
} = Recharts;

const globalClass = className.bind(globalStyles);

const containerClassName = globalClass(
  'contentBlockContainer',
  'contentBlockContainerMembership'
);
const labelClassName = globalClass(
  'contentBlockHeaderLabelText',
  'contentBlockHeaderLabelMembership',
  'contentBlockHeaderLabelMain',
  'contentBlockHeaderLabelNamespaceInfo'
);

type Props = {
  history: Object,
  getCpuHistoryPerNodesStatisticReducer: Object,
  getMemoryHistoryPerNodesStatisticReducer: Object,
  fetchGetCpuHistoryPerNodesStatisticIfNeeded: () => void,
  fetchGetMemoryHistoryPerNodesStatisticIfNeeded: () => void
};

class GraphsPerNodes extends PureComponent<Props> {
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentDidMount() {
    this.props.fetchGetCpuHistoryPerNodesStatisticIfNeeded();
    this.props.fetchGetMemoryHistoryPerNodesStatisticIfNeeded();
  }

  renderGraphsCpuPerNodesList = () => {
    const { getCpuHistoryPerNodesStatisticReducer } = this.props;
    if (
      !getCpuHistoryPerNodesStatisticReducer.readyStatus ||
      getCpuHistoryPerNodesStatisticReducer.readyStatus ===
        GET_CPU_HISTORY_PER_NODES_STATISTIC_INVALID ||
      getCpuHistoryPerNodesStatisticReducer.readyStatus ===
        GET_CPU_HISTORY_PER_NODES_STATISTIC_REQUESTING
    ) {
      return (
        <div
          style={{
            height: '200px',
            margin: '10px 0',
            borderRadius: '2px',
            backgroundColor: '#f6f6f6'
          }}
        />
      );
    }

    if (
      getCpuHistoryPerNodesStatisticReducer.readyStatus ===
      GET_CPU_HISTORY_PER_NODES_STATISTIC_FAILURE
    ) {
      return <p>Oops, Failed to load data of Users!</p>;
    }

    const { data: cpuReducer } = getCpuHistoryPerNodesStatisticReducer;
    return (
      <div>
        {Object.keys(cpuReducer).map(node => {
          const dataOfCpuHistory = cpuReducer[node].values.map(
            (statistic, index) => {
              const date = new Date(Date.parse(cpuReducer[node].labels[index]));
              const hours = date.getHours();
              const minutes = date.getMinutes();
              return {
                cpu: statistic,
                name: `${`${hours < 10 ? `0${hours}` : hours}:${
                  minutes < 10 ? `0${minutes}` : minutes
                }`}`
              };
            }
          );
          return (
            <div>
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <NavLink
                    className={`${styles.customSolutionNavLink} nav-link`}
                    to={routerLinks.graphsPerNodes}
                  >
                    {node.substring(0, node.lastIndexOf(':'))}
                  </NavLink>
                </li>
              </ul>
              <AreaChart
                width={400}
                height={210}
                data={dataOfCpuHistory}
                margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[0, 100]} unit=" %" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="cpu"
                  stroke="#29abe2"
                  fill="#29abe2"
                  fillOpacity="0.2"
                />
                <Legend />
                <Brush dataKey="name" height={30} stroke="#29abe2" />
              </AreaChart>
            </div>
          );
        })}
      </div>
    );
  };
  renderGraphsRamPerNodesList = () => {
    const { getMemoryHistoryPerNodesStatisticReducer } = this.props;
    if (
      !getMemoryHistoryPerNodesStatisticReducer.readyStatus ||
      getMemoryHistoryPerNodesStatisticReducer.readyStatus ===
        GET_MEMORY_HISTORY_PER_NODES_STATISTIC_INVALID ||
      getMemoryHistoryPerNodesStatisticReducer.readyStatus ===
        GET_MEMORY_HISTORY_PER_NODES_STATISTIC_REQUESTING
    ) {
      return (
        <div
          style={{
            height: '200px',
            margin: '10px 0',
            borderRadius: '2px',
            backgroundColor: '#f6f6f6'
          }}
        />
      );
    }

    if (
      getMemoryHistoryPerNodesStatisticReducer.readyStatus ===
      GET_MEMORY_HISTORY_PER_NODES_STATISTIC_FAILURE
    ) {
      return <p>Oops, Failed to load data of Users!</p>;
    }

    const { data: memoryReducer } = getMemoryHistoryPerNodesStatisticReducer;
    console.log(memoryReducer);
    return (
      <div>
        {Object.keys(memoryReducer).map(node => {
          const dataOfMemoryHistory = memoryReducer[node].values.map(
            (statistic, index) => {
              const date = new Date(
                Date.parse(memoryReducer[node].labels[index])
              );
              const hours = date.getHours();
              const minutes = date.getMinutes();
              return {
                memory: statistic,
                name: `${`${hours < 10 ? `0${hours}` : hours}:${
                  minutes < 10 ? `0${minutes}` : minutes
                }`}`
              };
            }
          );
          return (
            <div>
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <div className="nav-link">&nbsp;</div>
                </li>
              </ul>
              <AreaChart
                width={400}
                height={210}
                data={dataOfMemoryHistory}
                margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[0, 100]} unit=" %" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="memory"
                  stroke="#29abe2"
                  fill="#29abe2"
                  fillOpacity="0.2"
                />
                <Legend />
                <Brush dataKey="name" height={30} stroke="#29abe2" />
              </AreaChart>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div>
        <Helmet title="Graphs Per Nodes" />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2">
                <BackButton path={routerLinks.dashboard} />
              </div>
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className={globalStyles.contentBlock}>
                  <div className={`${containerClassName} container`}>
                    <div className={globalStyles.contentBlockHeader}>
                      <div className={labelClassName}>Graphs Per Nodes</div>
                      <div style={{ marginBottom: 20 }}>
                        <div
                          className="col-md-6"
                          style={{ display: 'inline-block', padding: 0 }}
                        >
                          {this.renderGraphsCpuPerNodesList()}
                        </div>
                        <div
                          className="col-md-6"
                          style={{ display: 'inline-block', padding: 0 }}
                        >
                          {this.renderGraphsRamPerNodesList()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
    getCpuHistoryPerNodesStatisticReducer,
    getMemoryHistoryPerNodesStatisticReducer
  }: ReduxState) => ({
    getCpuHistoryPerNodesStatisticReducer,
    getMemoryHistoryPerNodesStatisticReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetCpuHistoryPerNodesStatisticIfNeeded: () =>
      dispatch(
        actionGetCpuHistoryPerNodesStatistic.fetchGetCpuHistoryPerNodesStatisticIfNeeded()
      ),
    fetchGetMemoryHistoryPerNodesStatisticIfNeeded: () =>
      dispatch(
        actionGetMemoryHistoryPerNodesStatistic.fetchGetMemoryHistoryPerNodesStatisticIfNeeded()
      )
  })
);

export default connector(GraphsPerNodes);
