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
        );
    }
}

export default CommonInfoDropdown;
