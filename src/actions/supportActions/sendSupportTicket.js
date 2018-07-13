/* @flow */

import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types';
import {
  SEND_SUPPORT_TICKET_REQUESTING,
  SEND_SUPPORT_TICKET_SUCCESS,
  SEND_SUPPORT_TICKET_FAILURE
} from '../../constants/supportConstants/sendSupportTicketConstants';

// const isServer = typeof window === 'undefined';
// const ReactGA = isServer ? require('react-ga') : null;

const sendSupportTicketRequest = () => ({
  type: SEND_SUPPORT_TICKET_REQUESTING,
  isFetching: true
});

const sendSupportTicketSuccess = data => ({
  type: SEND_SUPPORT_TICKET_SUCCESS,
  isFetching: false,
  data
});

const sendSupportTicketFailure = err => ({
  type: SEND_SUPPORT_TICKET_FAILURE,
  isFetching: false,
  err
});

export const fetchSendSupportTicket = (
  data: Object,
  axios: any,
  URL: string = 'https://web.containerum.io'
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');
  dispatch(sendSupportTicketRequest());

  const response = await axios.post(`${URL}/omnidesk`, data, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken,
      Accept: '*/*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control':
        'no-cache, no-store, must-revalidate, max-age=-1, private'
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data: dataResponse } = response;
  switch (status) {
    case 200: {
      dispatch(sendSupportTicketSuccess(dataResponse));
      break;
    }
    default: {
      dispatch(
        sendSupportTicketFailure('An unexpected error! Please try again later.')
      );
    }
  }
};

export const fetchSendSupportTicketIfNeeded = (data: Object): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchSendSupportTicket(data, axios));
