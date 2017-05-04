import React, { Component } from 'react';
import { connect } from 'react-redux'

import { logoutUser } from '../../actions/LogoutActions';
import logo from '../../images/Containerum_logo_new.png';
import NavLink from '../NavLink/index';

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
                            <NavLink className="dropdown-item" to="/Dashboard">Dashboard</NavLink>
                            <NavLink className="dropdown-item" to="/Volumes">Volumes</NavLink>
                            <NavLink className="dropdown-item" to="/Images">Images</NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink className="dropdown-item" to="/Blog">Blog</NavLink>
                            <NavLink className="dropdown-item" to="/Documentation">Documentation</NavLink>
                            <NavLink className="dropdown-item" to="/Tutorials">Tutorials</NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink className="dropdown-item" to="/Support">Support</NavLink>
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
                                <span className="c-nav-user-name">kfeofantov</span>
                                <span className="c-nav-user-name">balance: 35$</span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <NavLink className="dropdown-item" to="/Profile">Profile</NavLink>
                            <NavLink className="dropdown-item" to="/Billing">Billing</NavLink>
                            <NavLink className="dropdown-item" to="/Referrals">Referrals</NavLink>
                            <div className="dropdown-divider"></div>
                            <NavLink className="dropdown-item" to="/Login" onClick={() => this.props.onLogoutClick()}>Log out</NavLink>
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
