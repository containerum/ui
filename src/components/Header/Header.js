import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import PropTypes from 'prop-types';

import { logoutUser } from '../../actions/LogoutActions';
import { getProfile } from '../../actions/ProfileActions/getProfileAction';
import { getProfileBalance } from '../../actions/BillingActions/getProfileBalanceAction';
import ProfileInfoDropdown from './ProfileInfoDropdown';
import Spinner from '../Spinner';
import NavLink from '../../containers/NavLink';
import logo from '../../images/logo.png';

import '../../styles/bootstrap.min.css';
import '../../styles/bootstrap-grid.min.css';
import '../../styles/style.css';
import '../../styles/style-custom.css';
import '../../styles/custom.css';
import '../../styles/individual.css';

class Header extends Component {
    componentDidMount() {
        this.props.onLoadProfileData();
        this.props.onGetProfileBalance();
    }
    render() {
        // console.log(this.props.GetProfileReducer.data);
        let isFetchingProfile = '';
        if (this.props.GetProfileReducer.isFetching === false &&
            this.props.GetProfileBalanceReducer.isFetching === false) {
            const userEmail = this.props.GetProfileReducer.data.login ? this.props.GetProfileReducer.data.login : 'no data';
            const userBalance = this.props.GetProfileBalanceReducer.data.balance ? parseFloat(this.props.GetProfileBalanceReducer.data.balance) : 0;
            isFetchingProfile =
                <header className="header ">
                    <div className="header-top ">
                        <div className="header-top-container container">
                            <div className="header__logo">
                                <NavLink to="/Namespaces" className=""><img src={logo} alt="" /></NavLink>
                            </div>
                            <ul className="header-top-menu nav">
                                <li className="header-top-menu__li nav-item">
                                    <NavLink to="/Namespaces" className="header-top-menu__link">Namespaces</NavLink>
                                </li>
                                <li className="header-top-menu__li nav-item">
                                    <NavLink to="/Volumes" className="header-top-menu__link">Volumes</NavLink>
                                </li>
                                <li className="header-top-menu__li header-top-menu__li_last nav-item">
                                    <NavLink to="/Support" className="header-top-menu__link">Support</NavLink>
                                </li>
                            </ul>
                            {/*<div className="header-top-admin-mode">*/}
                            {/*<div className="header-top-admin-mode__label">Admin<br />mode</div>*/}
                            {/*<div className="header-top-admin-mode__switcher "></div>*/}
                            {/*</div>*/}
                            <ProfileInfoDropdown
                                onLogoutClick={this.props.onLogoutClick}
                                userEmail={userEmail}
                                userBalance={userBalance}
                            />
                        </div>
                    </div>
                </header>;
        } else {
            isFetchingProfile = <Spinner />;
        }
        return (
            <div>
                { isFetchingProfile }
            </div>
        );
    }
}

Header.propTypes = {
    idName: PropTypes.string,
    onLogoutClick: PropTypes.func,
    onLoadProfileData: PropTypes.func,
    GetProfileBalanceReducer: PropTypes.object,
    GetProfileReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        LogoutReducer: state.LogoutReducer,
        GetProfileReducer: state.GetProfileReducer,
        GetProfileBalanceReducer: state.GetProfileBalanceReducer,
        errorMessage: state.errorMessage
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutClick: () => {
            dispatch(logoutUser());
        },
        onLoadProfileData: () => {
            dispatch(getProfile());
        },
        onGetProfileBalance: () => {
            dispatch(getProfileBalance());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
