/* @flow */

import React from 'react';

type Props = {
  statusUser: string,
  formatDateToActive: string,
  balance: string,
  monthUsage: string,
  dailyUsage: string
};

const BillingInfo = ({
  statusUser,
  formatDateToActive,
  balance,
  monthUsage,
  dailyUsage
}: Props) => (
  <div className="block-item" id="information">
    <div className="block-item__title">Information</div>
    <div className="row billing-content-row">
      <div className="col-md-4">
        <div className="billing-content-text inline">Status:&nbsp;</div>
        <div className="billing-information-status-info inline">
          {statusUser}
        </div>
      </div>

      <div className="col-md-8">
        <div className="row">
          <div className="col-md-3">
            <div className="billing-information-data">Balance</div>
            <div className="billing-information-data">Month usage</div>
            <div className="billing-information-data">Daily usage</div>
            {formatDateToActive && (
              <div className="billing-information-data">Paid up to</div>
            )}
          </div>
          <div className="col-md-9">
            <div className="billing-information-data fw-normal">
              ${balance ? balance.toFixed(2) : 0}
            </div>
            <div className="billing-information-data">
              ${monthUsage ? monthUsage.toFixed(2) : 0}
            </div>
            <div className="billing-information-data">
              ${dailyUsage ? dailyUsage.toFixed(2) : 0}
            </div>
            {formatDateToActive && (
              <div className="billing-information-data">
                {formatDateToActive}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BillingInfo;
