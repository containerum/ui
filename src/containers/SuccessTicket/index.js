/* @flow */

import React, { PureComponent } from 'react';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { routerLinks } from '../../config';
import { SEND_SUPPORT_TICKET_SUCCESS } from '../../constants/supportConstants/sendSupportTicketConstants';
import supportCloud from '../../images/support-cloud.png';
import supportMan from '../../images/support-man.png';

type Props = {
  sendSupportTicketReducer: Object,
  history: Object
};

class SuccessTicket extends PureComponent<Props> {
  componentDidMount() {
    const { history, sendSupportTicketReducer } = this.props;
    if (sendSupportTicketReducer.readyStatus !== SEND_SUPPORT_TICKET_SUCCESS) {
      history.push(routerLinks.support);
    }
  }
  render() {
    return (
      <div>
        <Helmet title="Success Ticket" />
        <div className="support-feedback">
          <div className="support-feedback-content">
            <div className="support-feedback__cloud">
              <img src={supportCloud} alt="" />
              <div className="support-feedback__text">
                Ok, we’ve received your message.
              </div>
              <div className="support-feedback__note">
                * We`ll reach out to you by email in less than 24 hours.
              </div>
            </div>
            <div className="support-feedback__man">
              <img src={supportMan} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ sendSupportTicketReducer }) => ({
    sendSupportTicketReducer
  })
);

export default connector(SuccessTicket);
