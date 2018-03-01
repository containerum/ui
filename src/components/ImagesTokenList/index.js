/* @flow */

import React from 'react';
import _ from 'lodash/fp';

type Props = {
  data: Object,
  handleDeleteImageToken: (label: string) => void
};

const ImagesTokenList = ({ data, handleDeleteImageToken }: Props) => (
  <div>
    {data.length >= 1 && (
      <div className="row">
        <div className="block-item__tokens col-md-12">
          <table className="block-item__tokens-table content-block__table table">
            <tbody>
              {data.map(image => {
                const { label, regexp, token } = image;
                return (
                  <tr key={_.uniqueId()}>
                    <td className="td-label-wrapper">{label}</td>
                    <td className="td-label-wrapper">{regexp}</td>
                    <td>{token}</td>
                    <td className=" dropdown no-arrow">
                      <i
                        className="content-block-table__more ion-more dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      />
                      <ul
                        className="dropdown-menu dropdown-menu-right"
                        role="menu"
                      >
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleDeleteImageToken(label)}
                        >
                          Delete
                        </button>
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
);

export default ImagesTokenList;
