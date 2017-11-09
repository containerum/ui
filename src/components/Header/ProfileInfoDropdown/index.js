import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Blockies from 'react-blockies';

import NavLink from '../../../containers/NavLink';
// import profile from '../../../images/profile.png';

import '../../../localization/en/header';
import '../../../localization/ru/header';

class ProfileInfoDropdown extends Component {
    render() {
        const email = this.props.userEmail ? this.props.userEmail : '';
        const balance = this.props.userBalance ? parseFloat(this.props.userBalance).toFixed(2) : 0;
        return (
            <div>
                <div className="header-top-account">
                    <div className="header-top-account__avatar">
                        <Blockies
                            seed={email}
                            size={10}
                            scale={3}
                            bgColor="#fff"
                        />
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
                        <div className="header-top-account__deposit">${balance}</div>
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
