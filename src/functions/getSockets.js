import WebSocket from 'ws';
// import io from 'socket.io-client';

const initSocket = () => {
  const ws = new WebSocket(
    'ws://192.168.88.200:1214/namespaces/hosting/pods/kube-api-779bf59b6f-tkb69/log?follow=true',
    {
      perMessageDeflate: false,
      headers: {
        'X-User-Role': 'admin',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
  // ws.on('open', res => console.log('open', res));
  // ws.on('message', data => {
  //   console.log(data);
  // });
  return ws;
};

export default initSocket;
