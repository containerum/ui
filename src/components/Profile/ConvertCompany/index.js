import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { convertToCompany } from '../../../actions/ConvertToCompanyActions';

class ConvertCompany extends Component {
    handleOnSubmitConvert(e) {
        e.preventDefault();
        console.log(this.refs.code.value, this.refs.company.value);
        const convertCompany = {
            code: this.refs.code.value,
            company: this.refs.company.value
        }
        const { dispatch } = this.props;
        dispatch(convertToCompany(convertCompany));
    }
    render() {
        return (
            <div className="card mt-3">
                <div className="card-block c-table-card-block">
                    <table className="table i-table-card">
                        <tbody>
                        <tr>
                            <td className="first-td-width">
                                <h2 id="convert-to-company">
                                    <a name="convert-to-company" className="anchor" href="#convert-to-company">Convert to company</a>
                                </h2> <br/>
                                <p>Warning: Convert to company</p>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                            <td style={{width: '400px'}}>
                                <form onSubmit={this.handleOnSubmitConvert.bind(this)}>
                                    <div className="form-group i-mb-20 c-has-feedback-left">
                                        <div className='form-group i-mb-20 c-has-feedback-left'>
                                            <input
                                                ref='company'
                                                id='company'
                                                required='required'
                                                type='company'
                                                className='form-control'
                                                placeholder='Company Name'
                                            />
                                            <i className='c-form-control-icon fa fa-tag fa-1'></i>
                                        </div>
                                    </div>
                                    <div className="form-group i-mb-20 c-has-feedback-left">
                                        <div className='form-group i-mb-20 c-has-feedback-left'>
                                            <input
                                                ref='code'
                                                id='code'
                                                required='required'
                                                type='code'
                                                className='form-control'
                                                placeholder='Tax Code'
                                            />
                                            <i className='c-form-control-icon fa fa-tag fa-1'></i>
                                        </div>
                                    </div>
                                    <button className="btn btn-block c-btn-green" type="submit">Convert</button>
                                </form>
                            </td>
                            <td>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

ConvertCompany.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps (state) {
    return {
        ConvertToCompanyReducer: state.ConvertToCompanyReducer
    }
}

export default connect(mapStateToProps)(ConvertCompany)
