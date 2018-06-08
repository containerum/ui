/* @flow */

import _ from 'lodash/fp';

import {
  SEND_SUPPORT_TICKET_INVALID,
  SEND_SUPPORT_TICKET_REQUESTING,
  SEND_SUPPORT_TICKET_SUCCESS,
  SEND_SUPPORT_TICKET_FAILURE
} from '../../constants/supportConstants/sendSupportTicketConstants';
import type { Action } from '../../types';

const initialState = {
  readyStatus: SEND_SUPPORT_TICKET_INVALID,
  isFetching: false,
  data: null,
  err: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SEND_SUPPORT_TICKET_REQUESTING:
      return _.assign(state, {
        readyStatus: SEND_SUPPORT_TICKET_REQUESTING,
        isFetching: action.isFetching,
        data: null,
        err: null
      });
    case SEND_SUPPORT_TICKET_SUCCESS:
      return _.assign(state, {
        readyStatus: SEND_SUPPORT_TICKET_SUCCESS,
        isFetching: action.isFetching,
        data: action.data,
        err: null
      });
    case SEND_SUPPORT_TICKET_FAILURE:
      return _.assign(state, {
        readyStatus: SEND_SUPPORT_TICKET_FAILURE,
        isFetching: action.isFetching,
        data: null,
        err: action.err
      });
    default:
      return state;
  }
};
