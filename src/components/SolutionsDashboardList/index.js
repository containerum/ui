/* @flow */

import React from 'react';
import _ from 'lodash/fp';

import redis from '../../images/redis_logo.png';
import magento from '../../images/magento-logo.png';
import mariadb from '../../images/mariadb.svg';
import redmineMariadb from '../../images/redmine-mariadb.svg';
import postgresql from '../../images/postgresql-logo.svg';
import redminePG from '../../images/redmine-pg.svg';
import grafana from '../../images/grafana.png';
import rabbitmq from '../../images/rabbitmq-manager.png';
import webpack from '../../images/webpack-logo.png';

type Props = {
  data: Array<Object>
};

const SolutionsDashboardList = ({ data }: Props) => (
  <div className="solution-containers-wrapper mt-30">
    {data.map(solution => {
      const { Name: name, URL: url } = solution;
      let srcLogo = redis;
      let logoMaxHeight = null;
      if (name.toLowerCase().indexOf('redmine-postgresql-solution') + 1) {
        srcLogo = redminePG;
        logoMaxHeight = '85px';
      } else if (name.toLowerCase().indexOf('redmine-mariadb-solution') + 1) {
        srcLogo = redmineMariadb;
        logoMaxHeight = '85px';
      } else if (name.toLowerCase().indexOf('magento-solution') + 1) {
        srcLogo = magento;
      } else if (name.toLowerCase().indexOf('mariadb-solution') + 1) {
        srcLogo = mariadb;
      } else if (name.toLowerCase().indexOf('postgresql-solution') + 1) {
        srcLogo = postgresql;
      } else if (name.toLowerCase().indexOf('grafana-xxl-solution') + 1) {
        srcLogo = grafana;
      } else if (name.toLowerCase().indexOf('rabbitmq-manager-solution') + 1) {
        srcLogo = rabbitmq;
      } else if (name.toLowerCase().indexOf('webpack-3.8-ssh-solution') + 1) {
        srcLogo = webpack;
      }
      return (
        <div
          key={_.uniqueId()}
          className="solution-container pre-solution-container"
        >
          <div className="solution-container-img-block pre-solution-container-img-block">
            <img
              src={srcLogo}
              alt={name}
              style={{ maxHeight: logoMaxHeight }}
            />
          </div>
          <div className="pre-solution-container-info">{name}</div>
          <a
            href={url}
            className="button button_blue btn btn-outline-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deploy
          </a>
        </div>
      );
    })}
  </div>
);

export default SolutionsDashboardList;
