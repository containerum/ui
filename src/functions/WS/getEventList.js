import cookie from 'react-cookies';

import { wsApi } from '../../config/index';

const getEventList = () => {
  // const now = new Date();
  const browser = cookie.load('browser');
  if (typeof window !== 'undefined' && window.WebSocket) {
    return new WebSocket(
      `${wsApi}/events/all?User-Token=${cookie.load(
        'accessToken'
      )}&User-Client=${browser}&limit=20`
    );
  }
  return 'Your browser does not support WebSockets';
};

export default getEventList;
