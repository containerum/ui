/* @flow */

import React from 'react';
import _ from 'lodash/fp';

import Paginator from '../Paginator';

type Props = {
  operations: Array<Object>,
  countPages: number,
  currentPage: number
};

const HistoryFunds = ({ operations, countPages, currentPage }: Props) => (
  <div className="block-item" id="history">
    <div className="block-item__title">History</div>
    <div className="row">
      <div className="block-item__history col-md-12">
        <table className="block-item__history-table content-block__table table">
          <tbody>
            {operations.length ? (
              operations.map(operation => {
                const { amount, date, info } = operation;
                return (
                  <tr key={_.uniqueId()}>
                    <td className="w-25 table-border">{date}</td>
                    <td className="w-50 table-border">{info}</td>
                    <td className="w-25 table-border">{amount}</td>
                  </tr>
                );
              })
            ) : (
              <tr className="light-text">
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
          />
        ) : (
          ''
        )}
      </nav>
    </div>
  </div>
);

export default HistoryFunds;
