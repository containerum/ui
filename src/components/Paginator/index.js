import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Paginator extends Component {
    render() {
        const arrayOfPage = [];
        for (let i = 1; i <= this.props.countPage; i++) {
            arrayOfPage.push(i);
        }
        return (
            <ul className="pagination pagination-sm">
                <li className={this.props.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                    <Link
                        to={this.props.currentPage === 1 ?
                            null :
                            `/Billing?page=${this.props.currentPage - 1}`}
                        disabled={this.props.currentPage === 1}
                        className="page-link"
                    >Previous</Link>
                </li>
                {arrayOfPage.map((item, index) => {
                    return (
                        <li
                            className={item === this.props.currentPage ? 'page-item active' : 'page-item'}
                            key={index}
                        >
                            <Link
                                to={`/Billing?page=${item}`}
                                className="page-link"
                            >{item}</Link>
                        </li>
                    );
                })}
                <li className={this.props.currentPage === this.props.countPage ? 'page-item disabled' : 'page-item'}>
                    <Link
                        to={this.props.currentPage === this.props.countPage ?
                            null :
                            `/Billing?page=${this.props.currentPage + 1}`}
                        disabled={this.props.currentPage === this.props.countPage}
                        className="page-link"
                    >Next</Link>
                </li>
            </ul>
        );
    }
}

Paginator.propTypes = {
    countPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Paginator;
