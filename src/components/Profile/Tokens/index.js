import React, { Component } from 'react';

export default class Tokens extends Component {
    render() {
        return (
            <div className="card mt-3">
                <div className="card-block c-table-card-block">
                    <table className="table i-table-card">
                        <tbody>
                        <tr>
                            <td className="first-td-width">
                                <h2 id="tokens">
                                    <a name="tokens" className="anchor" href="#tokens">Token`s</a>
                                </h2> <br/>
                                <p>Token provide an another way to logging into a virtual private Namespace</p>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                            <td style={{width: '400px'}}>
                                <div className="form-group i-mb-20 c-has-feedback-left">
                                    <div>
                                        <div>Name1</div>
                                        <div>FEYTFyetfkyufgtfqweiyfguwefgwefejtydvkwufvevkfdvwdkue</div>
                                    </div>
                                    <label className='sr-only' htmlFor='inlineFormInputCompanyName'>Add new Token</label>
                                    <div className='form-group i-mb-20 c-has-feedback-left'>
                                        <input
                                            ref='code'
                                            id='code'
                                            required='required'
                                            type='code'
                                            className='form-control'
                                            placeholder='Name'
                                        />
                                        <i className='c-form-control-icon fa fa-tag fa-1'></i>
                                    </div>
                                </div>
                                <button className="btn btn-block c-btn-green">Add new Token</button>
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
