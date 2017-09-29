import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavLink from '../../../containers/NavLink';
import profile from '../../../images/profile.png';

import '../../../localization/en/header';
import '../../../localization/ru/header';

class ProfileInfoDropdown extends Component {
    render() {
        return (
            <div>
                <div className="header-top-account">
                    <div className="header-top-account__avatar"><img src={profile} /></div>
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
                                <NavLink className="dropdown-item text-danger" to="/Login" onClick={() => this.props.onLogoutClick()}>Log out</NavLink>
                            </ul>
                        </div>
                        {/*<div className="header-top-account__deposit">12 $</div>*/}
                    </div>
                </div>
                <div className="clearfix"> </div>
            </div>
        );
    }
}

ProfileInfoDropdown.propTypes = {
    userEmail: PropTypes.string,
    onLogoutClick: PropTypes.func
};

export default ProfileInfoDropdown;
