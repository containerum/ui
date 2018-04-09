export const GET_SOLUTIONS_INVALID = 'GET_SOLUTIONS_INVALID';
export const GET_SOLUTIONS_REQUESTING = 'GET_SOLUTIONS_REQUESTING';
export const GET_SOLUTIONS_SUCCESS = 'GET_SOLUTIONS_SUCCESS';
export const GET_SOLUTIONS_FAILURE = 'GET_SOLUTIONS_FAILURE';

export const solutionsArray = [
  {
    URL: 'https://github.com/containerum/redmine-postgresql-solution%20',
    CPU: '300m',
    Images: 'redmine;postgres',
    RAM: '256Mi',
    Name: 'redmine-postgresql-solution'
  },
  {
    URL: 'https://github.com/containerum/redmine-mariadb-solution',
    CPU: '1000m',
    Images: 'redmine;mariadb',
    RAM: '1024Mi',
    Name: 'redmine-mariadb-solution'
  },
  {
    URL: 'https://github.com/containerum/magento-solution',
    CPU: '1000m',
    Images: 'mysql;magento2',
    RAM: '1024Mi',
    Name: 'magento-solution'
  },
  {
    URL: 'https://github.com/containerum/MariaDB-solution',
    CPU: '500m',
    Images: 'mariadb',
    RAM: '512Mi',
    Name: 'MariaDB-solution'
  },
  {
    URL: 'https://github.com/containerum/postgresql-solution',
    CPU: '500m',
    Images: 'postgres',
    RAM: '512Mi',
    Name: 'postgresql-solution'
  },
  {
    URL: 'https://github.com/containerum/grafana-xxl-solution',
    CPU: '500m',
    Images: 'grafana-xxl',
    RAM: '512Mi',
    Name: 'grafana-xxl-solution'
  },
  {
    URL: 'https://github.com/containerum/rabbitmq-manager-solution',
    CPU: '500m',
    Images: 'rabbitmq',
    RAM: '500Mi',
    Name: 'rabbitmq-manager-solution'
  },
  {
    URL: 'https://github.com/containerum/webpack-3.8-ssh-solution',
    CPU: '500m',
    Images: 'webpack-3.8-ssh-solution',
    RAM: '500Mi',
    Name: 'webpack-3.8-ssh-solution'
  }
];
