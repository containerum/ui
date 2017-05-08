import React, { Component } from 'react';
import { connect } from 'react-redux';
import Translate   from 'react-translate-component';

import { logoutUser } from '../../actions/LogoutActions';
import logo from '../../images/Containerum_logo_new.png';
import NavLink from '../NavLink/index';
import ProfileInfoEmail from '../ProfileInfoEmail';

import '../../localization/en/header';
import '../../localization/ru/header';

class Header extends Component {
    render() {
        return (
            <div className="navbar navbar-inverse navbar-toggleable-md c-navbar">
                <NavLink to="/" className="navbar-brand">
                    <img className="d-inline-block align-top i-sizes-img-logo" src={logo} alt="Logo"/>
                </NavLink>
                <div className="collapse navbar-collapse justify-content-end">
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn c-nav-menu-btn text-white"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fa fa-bars" aria-hidden="true"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <NavLink className="dropdown-item" to="/Dashboard">
                                <Translate content='header.dashboard'>Dashboard</Translate>
                            </NavLink>
                            <NavLink className="dropdown-item" to="/Volumes">
                                <Translate content='header.volumes'>Volumes</Translate>
                            </NavLink>
                            <NavLink className="dropdown-item" to="/Images">
                                <Translate content='header.images'>Images</Translate>
                            </NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink className="dropdown-item" to="/Blog">
                                <Translate content='header.blog'>Blog</Translate>
                            </NavLink>
                            <NavLink className="dropdown-item" to="/Documentation">
                                <Translate content='header.documentation'>Documentation</Translate>
                            </NavLink>
                            <NavLink className="dropdown-item" to="/Tutorials">
                                <Translate content='header.tutorials'>Tutorials</Translate>
                            </NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink className="dropdown-item" to="/Support">
                                <Translate content='header.support'>Support</Translate>
                            </NavLink>
                        </div>
                    </div>
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn c-nav-user-btn"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <img className="c-nav-user-img" src="https://avatars2.githubusercontent.com/u/6412038?v=3&amp;s=200" alt="Avatar" />
                                <div className="c-nav-user-data">
                                    <ProfileInfoEmail />
                                    <span className="c-nav-user-name">
                                        <Translate content='header.balance'>balance</Translate>: 35$
                                    </span>
                                </div>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
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
                            <NavLink className="dropdown-item" to="/Login" onClick={() => this.props.onLogoutClick()}>
                                <Translate content='header.logOut'>Log out</Translate>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { logoutReducer } = state;
    const { errorMessage } = logoutReducer;

    return {
        errorMessage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutClick: () => {
            dispatch(logoutUser())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)
