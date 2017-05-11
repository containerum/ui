import React, { Component } from 'react';
import Translate from 'react-translate-component';
import PropTypes from 'prop-types';

import NavLink from '../../NavLink/index';

import '../../../localization/en/header';
import '../../../localization/ru/header';

class ProfileInfoDropdown extends Component {
    render() {
        return (
            <div className="btn-group">
                <button
                    type="button"
                    className="btn c-nav-user-btn"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <img className="c-nav-user-img" src="https://www.gravatar.com/avatar/3e2e9bb0425bbbd60b03f2b62a4d821d?s=328&d=identicon&r=PG&f=1" alt="Avatar" />
                    <div className="c-nav-user-data">
                                    <span className="c-nav-user-name">
                                        { this.props.userEmail }
                                    </span>
                        <span className="c-nav-user-name">
                                        <Translate content='header.balance'>balance</Translate>: 35$
                                    </span>
                    </div>
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                    <div className="c-nav-user-wrap">
                        <img className="c-nav-user-img" src="https://www.gravatar.com/avatar/3e2e9bb0425bbbd60b03f2b62a4d821d?s=328&amp;d=identicon&amp;r=PG&amp;f=1" alt="" />
                        <span className="c-nav-user-name">
                                    { this.props.userEmail }
                                </span>
                    </div>
                    <span className="c-nav-user-email text-muted">{ this.props.userEmail }</span>
                    <div className="dropdown-divider"></div>
                    <NavLink className="dropdown-item" to="/Profile">
                        <Translate content='header.profile'>Profile</Translate>
                    </NavLink>
                    <NavLink className="dropdown-item" to="/Billing">
                        <Translate content='header.billing'>Billing</Translate>
                    </NavLink>
                    <NavLink className="dropdown-item" to="/Referrals">
                        <Translate content='header.referrals'>Referrals</Translate>
                    </NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink className="dropdown-item text-danger" to="/Login" onClick={() => this.props.onLogoutClick()}>
                        <Translate content='header.logOut'>Log out</Translate>
                    </NavLink>
                </div>
            </div>
        );
    }
}

ProfileInfoDropdown.propTypes = {
    userEmail: PropTypes.string,
    onLogoutClick: PropTypes.func
};

export default ProfileInfoDropdown;
