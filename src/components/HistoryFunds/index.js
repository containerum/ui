/* @flow */

import React from 'react';
import _ from 'lodash/fp';
import className from 'classnames/bind';

import Paginator from '../Paginator';
import { routerLinks } from '../../config';
import globalStyles from '../../theme/global.scss';
import billingStyles from '../../containers/Billing/index.scss';

const globalClassName = className.bind(globalStyles);

const historyClassName = globalClassName(
  'contentBlockTable',
  'table',
  'blockItemHistoryTable'
);

type Props = {
  operations: Array<Object>,
  countPages: number,
  currentPage: number
};

const HistoryFunds = ({ operations, countPages, currentPage }: Props) => (
  <div className={globalStyles.blockItem} id="history">
    <div className={globalStyles.blockItemTitle}>History</div>
    <div className="row">
      <div className="col-md-12">
        <table className={`${historyClassName} table`}>
          <tbody>
            {operations.length ? (
              operations.map(operation => {
                const { amount, date, info } = operation;
                return (
                  <tr key={_.uniqueId()}>
                    <td
                      className={`${billingStyles.billingTableTdPadding} w-25`}
                    >
                      {date}
                    </td>
                    <td
                      className={`${billingStyles.billingTableTdPadding} w-50`}
                    >
                      {info}
                    </td>
                    <td
                      className={`${billingStyles.billingTableTdPadding} w-25`}
                    >
                      {amount}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className={globalStyles.textLight}>
                <td>Your billing history will be displayed here</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <nav>
        {operations.length && countPages > 1 ? (
          <Paginator
            countPage={countPages > 25 ? 25 : countPages}
            currentPage={currentPage}
            routeTo={routerLinks.billing}
          />
        ) : (
          ''
        )}
      </nav>
    </div>
  </div>
);

export default HistoryFunds;
