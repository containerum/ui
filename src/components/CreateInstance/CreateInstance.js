import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavLink from '../../components/NavLink';

class CreateInstance extends Component {
    render() {
        return (
            <div className="btn-group">
                <button
                    type="button"
                    className="btn dropdown-toggle c-nav-menu-btn"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Create
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                    <NavLink className="dropdown-item" to='/CreateNewDeployment'>Deployment</NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink className="dropdown-item" to='/CreateNewSecret'>Secret</NavLink>
                </div>
            </div>
        );
    }
}

CreateInstance.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps (state) {
    const { NamespacesReducer } = state;
    const { errorMessage } = NamespacesReducer;

    return {
        errorMessage,
        NamespacesReducer
    }
}

export default connect(mapStateToProps)(CreateInstance)
