import React, { Component } from 'react';

import logo from '../../images/Containerum_logo_new.png';

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
                    <a href="#" className="navbar-brand">
                        <img className="c-logo-main" src={logo} alt="Logo"/>
                    </a>
                    <div className="d-flex flex-row-reverse">
                        <div className="p-2">
                            <nav className="navbar" onClick={this.onToggleProfileHandler.bind(this)}>
                                <a className="navbar-brand" href="#">
                                    <img src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="" />
                                </a>
                                <div className="navbar-brand">
                                    <span>Kfeofantov</span><br />
                                    <span>Balance: 35$</span>
                                </div>
                            </nav>
                            <div className={this.state.toggleBtnProfile ? "dropdown-menu show-dropdown-menu" : "dropdown-menu"}>
                                <a className="dropdown-item" href="#">Dashboard</a>
                                <a className="dropdown-item" href="#">Volumes</a>
                                <a className="dropdown-item" href="#">Images</a>
                                <hr />
                                <a className="dropdown-item" href="#">Blog</a>
                                <a className="dropdown-item" href="#">Documentation</a>
                                <a className="dropdown-item" href="#">Tutorials</a>
                                <hr />
                                <a className="dropdown-item" href="#">Support</a>
                            </div>
                        </div>
                        <div className="p-2">
                            <button
                                className="navbar-toggler navbar-toggler-margin-top"
                                onClick={this.onToggleMainHandler.bind(this)}
                                type="button"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className={this.state.toggleBtnMain ? "dropdown-menu show-dropdown-menu" : "dropdown-menu"}>
                                <a className="dropdown-item" href="#">Dashboard</a>
                                <a className="dropdown-item" href="#">Volumes</a>
                                <a className="dropdown-item" href="#">Images</a>
                                <hr />
                                <a className="dropdown-item" href="#">Blog</a>
                                <a className="dropdown-item" href="#">Documentation</a>
                                <a className="dropdown-item" href="#">Tutorials</a>
                                <hr />
                                <a className="dropdown-item" href="#">Support</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;