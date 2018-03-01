import React from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash/fp';

type Props = {
  countPage: number,
  currentPage: number
};

const Paginator = ({ countPage, currentPage }: Props) => {
  // console.log(currentPage);
  const arrayOfPage = Array(countPage)
    .fill()
    .map((v, i) => i + 1);
  return (
    <ul className="pagination pagination-sm">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
        <NavLink
          to={
            currentPage === 1 ? '/billing' : `/billing?page=${currentPage - 1}`
          }
          disabled={currentPage === 1}
          className="page-link"
        >
          Previous
        </NavLink>
      </li>
      {arrayOfPage.map(item => (
        <li
          className={item === currentPage ? 'page-item active' : 'page-item'}
          key={_.uniqueId()}
        >
          <NavLink to={`/billing?page=${item}`} className="page-link">
            {item}
          </NavLink>
        </li>
      ))}
      <li
        className={
          currentPage === countPage ? 'page-item disabled' : 'page-item'
        }
      >
        <NavLink
          to={
            currentPage === countPage
              ? '/billing'
              : `/billing?page=${currentPage + 1}`
          }
          disabled={currentPage === countPage}
          className="page-link"
        >
          Next
        </NavLink>
      </li>
    </ul>
  );
};

export default Paginator;
