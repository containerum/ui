import React, { Component } from 'react';
import Translate from 'react-translate-component';

import NavLink from '../../NavLink/index';

import '../../../localization/en/header';
import '../../../localization/ru/header';

class CommonInfoDropdown extends Component {
    render() {
        return (
            <div className="btn-group">
                <button
                    type="button"
                    className="btn c-nav-menu-btn c-nav-menu-btn-top text-white"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <i className="md-icon">apps</i>
                </button>
                <div className="dropdown-menu dropdown-menu-right i-dropdown-box-shadow">
                    <NavLink className="dropdown-item" to={window.location.pathname}>
                        <Translate content="header.dashboard">Dashboard</Translate>
                    </NavLink>
                    <NavLink className="dropdown-item" to={window.location.pathname}>
                        <Translate content="header.volumes">Volumes</Translate>
                    </NavLink>
                    <NavLink className="dropdown-item" to={window.location.pathname}>
                        <Translate content="header.images">Images</Translate>
                    </NavLink>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" target="_blank" href="http://blog.containerum.io/">
                        <Translate content="header.blog">Blog</Translate>
                    </a>
                    <a className="dropdown-item" target="_blank" href="http://containerum.io/documentation/start-guide">
                        <Translate content="header.documentation">Documentation</Translate>
                    </a>
                    <a className="dropdown-item" target="_blank" href="http://blog.containerum.io/">
                        <Translate content="header.tutorials">Tutorials</Translate>
                    </a>
                    <div className="dropdown-divider"></div>
                    <NavLink className="dropdown-item" to="/Support">
                        <Translate content="header.support">Support</Translate>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default CommonInfoDropdown;
