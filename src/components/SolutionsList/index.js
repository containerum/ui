/* @flow */

import React from 'react';
import _ from 'lodash/fp';

import githubIcon from '../../images/githubIcon.svg';
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
  <div className="row">
    {data.map(solution => {
      // console.log(solution);
      const { Name: name, URL: url, CPU: cpu, RAM: ram } = solution;
      let srcLogo = redis;
      let logoHeight = null;
      if (name.toLowerCase().indexOf('redmine-postgresql-solution') + 1) {
        srcLogo = redminePG;
        logoHeight = '100px';
      } else if (name.toLowerCase().indexOf('redmine-mariadb-solution') + 1) {
        srcLogo = redmineMariadb;
        logoHeight = '100px';
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
        <div key={_.uniqueId()} className="col-md-4">
          <div className="content-block-container-solution">
            <div className="content-block-volume-header">
              <img
                className="volume-header-img"
                src={srcLogo}
                alt={name}
                style={{ height: logoHeight }}
              />
            </div>
            <div
              className="content-block-volume-footer"
              style={{ padding: '25px' }}
            >
              <div
                className="volume-footer-header"
                style={{ maxHeight: '30px' }}
              >
                {name}
              </div>
              <div className="volume-footer-info">
                <span className="volume-footer-info-item">CPU: {cpu}</span>
                <span className="volume-footer-info-item">RAM: {ram}</span>
              </div>

              <div className="volume-footer-links-wrap">
                <div className="volume-footer-links-deploy">
                  <a
                    className="footer-links-deploy-btn"
                    // data-toggle="modal"
                    // data-target="#redis"
                    href={url}
                    target="_blank"
                  >
                    deploy
                  </a>
                </div>
                <div className="volume-footer-links-github">
                  <a
                    className="footer-links-github-text"
                    href={url}
                    target="_blank"
                  >
                    Look on GitHub
                    <img
                      className="icon icons8-GitHub"
                      src={githubIcon}
                      alt="githubIcon"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default SolutionsDashboardList;
