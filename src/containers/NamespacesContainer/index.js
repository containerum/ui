import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavLink from '../../components/NavLink';

class NamespacesContainer extends Component {
    render() {
        return (
            <div className="navbar-brand">
                <div className={this.props.stateBtnToggle ? "dropdown-menu show-dropdown-namespaces" : "dropdown-menu"}>
                    {
                        this.props.namespacesDataReducer.map(function(item, index) {
                            return (
                                <NavLink key={index} className="dropdown-item" to={`/Namespaces/${item.label}`}>{item.label}</NavLink>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

NamespacesContainer.propTypes = {
    namespacesDataReducer: PropTypes.array,
    stateBtnToggle: PropTypes.bool
};

export default NamespacesContainer;
