/* @flow */

import React from 'react';

import globalStyles from '../../theme/global.scss';
import billingStyles from '../../containers/Billing/index.scss';

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
  <div className={globalStyles.blockItem} id="information">
    <div className={globalStyles.blockItemTitle}>Information</div>
    <div className="row">
      <div className="col-md-4">
        <div className={billingStyles.billingContentText}>Status:&nbsp;</div>
        <div className={billingStyles.billingInformationStatusInfo}>
          {statusUser}
        </div>
      </div>

      <div className="col-md-8">
        <div className="row">
          <div className="col-md-3">
            <div className={billingStyles.billingInformationData}>Balance</div>
            <div className={billingStyles.billingInformationData}>
              Month usage
            </div>
            <div className={billingStyles.billingInformationData}>
              Daily usage
            </div>
            {formatDateToActive && (
              <div className={billingStyles.billingInformationData}>
                Paid up to
              </div>
            )}
          </div>
          <div className="col-md-9">
            <div className={billingStyles.billingInformationData}>
              ${balance ? balance.toFixed(2) : 0}
            </div>
            <div className={billingStyles.billingInformationData}>
              ${monthUsage ? monthUsage.toFixed(2) : 0}
            </div>
            <div className={billingStyles.billingInformationData}>
              ${dailyUsage ? dailyUsage.toFixed(2) : 0}
            </div>
            {formatDateToActive && (
              <div className={billingStyles.billingInformationData}>
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
