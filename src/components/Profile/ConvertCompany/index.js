import React, { Component } from 'react';

export default class ConvertCompany extends Component {
    render() {
        return (
            <div className="card mt-3">
                <div className="card-block c-table-card-block">
                    <table className="table i-table-card">
                        <tbody>
                        <tr>
                            <td style={{width: '250px'}}>
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
                                <button className="btn btn-block c-btn-green">Convert</button>
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
