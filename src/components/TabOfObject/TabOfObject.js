import React, { Component } from 'react';
import NavLink from '../NavLink/index';

class TabOfObject extends Component {
    render() {
        return (
            <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                <div className="dropdown-divider"></div>
                <div className="btn-group">
                    <NavLink to="/Deployments/demo/Object" className="navbar-brand">
                        <button type="button" className="btn c-nav-menu-btn">
                            Object
                        </button>
                    </NavLink>
                </div>
                <div className="btn-group">
                    <NavLink to="/Deployments/demo/Settings" className="navbar-brand">
                        <button type="button" className="btn c-nav-menu-btn">
                            Settings
                        </button>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default TabOfObject
