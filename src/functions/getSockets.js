import cookie from 'react-cookies';

import { wsApi } from '../config';

const initSocket = (idName, idPod) => {
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  // console.log(idName, idPod);
  if (typeof window !== 'undefined' && window.WebSocket) {
    return new WebSocket(
      // `${wsApi}/namespaces/hosting/pods/kube-api-6b768f94d7-78hpz/log?follow=true&User-Token=${cookie.load(
      //   'accessToken'
      // )}&User-Client=${browser}`
      `${wsApi}/namespaces/${idName}/pods/${idPod}/log?follow=true&User-Token=${cookie.load(
        'accessToken'
      )}&User-Client=${browser}`
    );
  }
  return 'Your browser does not support WebSockets';
};

export default initSocket;
