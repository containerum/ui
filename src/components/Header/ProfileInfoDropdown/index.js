import React, { Component } from 'react';
import PropTypes from 'prop-types';
import identicons from 'identicons';

import NavLink from '../../../containers/NavLink';
// import profile from '../../../images/profile.png';

import '../../../localization/en/header';
import '../../../localization/ru/header';

class ProfileInfoDropdown extends Component {
    render() {
        const email = this.props.userEmail ? this.props.userEmail : '';
        const profileSvg = localStorage.getItem('icon_profile') ? localStorage.getItem('icon_profile') : identicons.generateSVGDataURIString(email, { width: 28, size: 4 });
        return (
            <div>
                <div className="header-top-account">
                    <div className="header-top-account__avatar">
                        <img src={ profileSvg } />
                    </div>
                    <div className="header-top-account__info">
                        <div className="header-top-account__name dropdown">
                            <a
                                href="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >{this.props.userEmail}</a>
                            <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                <NavLink className="dropdown-item" to="/Account">Account</NavLink>
                                <NavLink className="dropdown-item" to="/Billing">Billing</NavLink>
                                <NavLink className="dropdown-item text-danger" to="/Login" onClick={() => this.props.onLogoutClick()}>Log out</NavLink>
                            </ul>
                        </div>
                        <div className="header-top-account__deposit">{this.props.userBalance} $</div>
                    </div>
                </div>
                <div className="clearfix"> </div>
            </div>
        );
    }
}

ProfileInfoDropdown.propTypes = {
    userEmail: PropTypes.string,
    userBalance: PropTypes.number,
    onLogoutClick: PropTypes.func
};

export default ProfileInfoDropdown;
