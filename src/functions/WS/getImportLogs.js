import cookie from 'react-cookies';

import { wsApi } from '../../config/index';

const getImportLogs = () => {
  const browser = cookie.load('browser');
  if (typeof window !== 'undefined' && window.WebSocket) {
    return new WebSocket(
      `${wsApi}/all/ws?User-Token=${cookie.load(
        'accessToken'
      )}&User-Client=${browser}`
    );
  }
  return 'Your browser does not support WebSockets';
};

export default getImportLogs;
