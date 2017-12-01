import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Blockies from 'react-blockies';

// import NavLink from '../../../containers/NavLink';
import imageLogo from '../../../images/imageLogo.svg';
import profilePlace from '../../../images/profilePlace.svg';

import '../../../localization/en/header';
import '../../../localization/ru/header';

class ProfileInfoDropdown extends Component {
    render() {
        const email = this.props.userEmail ? this.props.userEmail : '';
        const balance = this.props.userBalance ? parseFloat(this.props.userBalance).toFixed(2) : 0;
        let isFetchingImage = '';
        let isFetchingProfile = '';
	    if (this.props.isFetchingProfileReducer === false &&
		    this.props.isFetchingBalanceReducer === false) {
		    isFetchingImage =
                <Blockies
                    seed={email}
                    size={9}
                    scale={3}
                    bgColor="#fff"
                />;
            isFetchingProfile =
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
                            <Link className="dropdown-item" to="/Account">Account</Link>
                            <Link className="dropdown-item" to="/Billing">Billing</Link>
                            <Link className="dropdown-item text-danger" to="/Login" onClick={() => this.props.onLogoutClick()}>Log out</Link>
                        </ul>
                    </div>
                    <div className="header-top-account__deposit">${balance}</div>
                </div>;
        } else {
		    isFetchingImage = <img src={imageLogo} alt="ava"/>;
		    isFetchingProfile = <span style={{marginLeft: "10px"}}><img src={profilePlace} alt="profile"/></span>;
        }
        return (
            <div>
                <div className="header-top-account">
                    <div className="header-top-account__avatar">
                        { isFetchingImage }
                    </div>
                    { isFetchingProfile }
                </div>
                <div className="clearfix"> </div>
            </div>
        );
    }
}

ProfileInfoDropdown.propTypes = {
    userEmail: PropTypes.string,
    userBalance: PropTypes.number,
    onLogoutClick: PropTypes.func,
	isFetchingProfileReducer: PropTypes.bool,
	isFetchingBalanceReducer: PropTypes.bool
};

export default ProfileInfoDropdown;
