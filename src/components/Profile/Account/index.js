import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import Email from './Email';
import Password from './Password';
import Profile from './Profile';

import './Account.css';

class Account extends Component {
    render() {
        return (
            <div>
                <div className="card mt-3">
                    <Profile />

                    <Email />

                    <Password />
                </div>
            </div>
        );
    }
}

// Account.propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     errorMessage: PropTypes.string
// };

export default Account
