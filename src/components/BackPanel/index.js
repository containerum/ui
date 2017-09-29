import React, { Component } from 'react';
import NavLink from '../../containers/NavLink'

class BackPanel extends Component {
    render() {
        return (
            <div className="header-bottom ">
                <div className="header-bottom-container container">
                    <ul className="breadcrumbs nav">
                        <li className="breadcrumbs__li nav-item">
                            <NavLink to="/Namespaces/default" className="breadcrumbs__link">Back Panel</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default BackPanel;
