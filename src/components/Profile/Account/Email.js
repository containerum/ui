import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InputEmail from '../../auth/InputEmail';
import './Account.css';

class Email extends Component {
    render() {
        return (
            <div className="card-block c-table-card-block">
                <table className="table i-table-card">
                    <tbody>
                    <tr>
                        <td style={{width: '230px'}}>
                            <h2 id="email">
                                <a name="email" className="anchor" href="#email">Email</a>
                            </h2> <br/>
                            <p>Email changing</p>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td style={{width: '400px'}}>
                            <div className="form-group i-mb-20 c-has-feedback-left">
                                <InputEmail />
                            </div>
                            <div className="form-group i-mb-20 c-has-feedback-left">
                                <InputEmail />
                            </div>
                            <button className="btn btn-block c-btn-green">Update Email</button>
                        </td>
                        <td>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

Email.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps (state) {
    return {
    }
}

export default connect(mapStateToProps)(Email)
