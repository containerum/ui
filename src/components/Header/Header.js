import React, { Component } from 'react';
import { connect } from 'react-redux'

import { logoutUser } from '../../actions/LogoutActions';
import logo from '../../images/Containerum_logo_new.png';
import NavLink from "../NavLink/index";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            toggleBtnMain: false,
            toggleBtnProfile: false
        };
    }
    onToggleMainHandler() {
        this.setState({
            ...this.state,
            toggleBtnMain: !this.state.toggleBtnMain
        });
    }
    onToggleProfileHandler() {
        this.setState({
            ...this.state,
            toggleBtnProfile: !this.state.toggleBtnProfile
        });
    }
    render() {
        return (
            <div className="navbar navbar-inverse main-header">
                <div className="container d-flex justify-content-between">
                    <NavLink to="" className="navbar-brand">
                        <img className="c-logo-main" src={logo} alt="Logo"/>
                    </NavLink>
                    <div className="d-flex flex-row-reverse">
                        <div className="p-2">
                            <nav className="navbar" style={{display: 'block'}} onClick={this.onToggleMainHandler.bind(this)}>
                                <NavLink className="navbar-brand" to="" style={{display: 'inline-flex'}}>
                                    <img src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="" />
                                </NavLink>
                                <div style={{display: 'inline-block'}}>
                                    <span>Kfeofantov</span><br />
                                    <span>Balance: 35$</span>
                                </div>
                            </nav>
                            <div className={this.state.toggleBtnProfile ? "dropdown-menu show-dropdown-menu" : "dropdown-menu"}>
                                <NavLink className="dropdown-item" to="/Dashboard">Dashboard</NavLink>
                                <NavLink className="dropdown-item" to="/Volumes">Volumes</NavLink>
                                <NavLink className="dropdown-item" to="/Images">Images</NavLink>
                                <hr />
                                <NavLink className="dropdown-item" to="/Blog">Blog</NavLink>
                                <NavLink className="dropdown-item" to="/Documentation">Documentation</NavLink>
                                <NavLink className="dropdown-item" to="/Tutorials">Tutorials</NavLink>
                                <hr />
                                <NavLink className="dropdown-item" to="/Support">Support</NavLink>
                            </div>
                        </div>
                        <div className="p-2">
                            <button
                                className="navbar-toggler navbar-toggler-margin-top"
                                onClick={this.onToggleProfileHandler.bind(this)}
                                type="button"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className={this.state.toggleBtnMain ? "dropdown-menu show-dropdown-profile" : "dropdown-menu"}>
                                <div>
                                    <img src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="" />Kfeofantov
                                    <div>kfeofantov@gmail.com</div>
                                </div>
                                <hr />
                                <NavLink className="dropdown-item" to="/Profile">Profile</NavLink>
                                <NavLink className="dropdown-item" to="/Billing">Billing</NavLink>
                                <NavLink className="dropdown-item" to="/Referrals">Referrals</NavLink>
                                <NavLink className="dropdown-item" to="/Login" onClick={() => this.props.onLogoutClick()}>Logout</NavLink>
                            </div>
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
