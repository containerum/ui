import redis from '../images/redis_logo.png';
import magento from '../images/magento-logo.png';
import mariadb from '../images/mariadb.svg';
import redmineMariadb from '../images/redmine-mariadb.svg';
import postgresql from '../images/postgresql-logo.svg';
import redminePG from '../images/redmine-pg.svg';
import grafana from '../images/grafana.png';
import rabbitmq from '../images/rabbitmq-manager.png';
import webpack from '../images/webpack-logo.png';

const getSolutionImage = (solutionName, heightOfImage) => {
  let srcLogo = redis;
  let logoHeight = null;
  if (solutionName) {
    if (solutionName.toLowerCase().indexOf('redmine-postgresql-solution') + 1) {
      srcLogo = redminePG;
      logoHeight = heightOfImage;
    } else if (
      solutionName.toLowerCase().indexOf('redmine-mariadb-solution') + 1
    ) {
      srcLogo = redmineMariadb;
      logoHeight = '100px';
    } else if (solutionName.toLowerCase().indexOf('magento-solution') + 1) {
      srcLogo = magento;
    } else if (solutionName.toLowerCase().indexOf('mariadb-solution') + 1) {
      srcLogo = mariadb;
    } else if (solutionName.toLowerCase().indexOf('postgresql-solution') + 1) {
      srcLogo = postgresql;
    } else if (solutionName.toLowerCase().indexOf('grafana-xxl-solution') + 1) {
      srcLogo = grafana;
    } else if (
      solutionName.toLowerCase().indexOf('rabbitmq-manager-solution') + 1
    ) {
      srcLogo = rabbitmq;
    } else if (
      solutionName.toLowerCase().indexOf('webpack-3.8-ssh-solution') + 1
    ) {
      srcLogo = webpack;
    }
  }
  return { srcLogo, logoHeight };
};

export default getSolutionImage;
