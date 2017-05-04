import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavLink from '../../components/NavLink';

class NamespacesContainer extends Component {
    render() {
        return (
            <div className="dropdown-menu">
                {
                    this.props.namespacesDataReducer.map(function(item, index) {
                        return (
                            <NavLink key={index} className="dropdown-item" to={`/Namespaces/${item.label}`}>{item.label}</NavLink>
                        );
                    })
                }
                <div className="dropdown-divider"></div>
                <NavLink className="dropdown-item" to="/CreateNewSpace">Create new space</NavLink>
            </div>
        );
    }
}

NamespacesContainer.propTypes = {
    namespacesDataReducer: PropTypes.array
};

export default NamespacesContainer;
