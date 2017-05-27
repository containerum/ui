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
                <div className="dropdown-menu dropdown-menu-right i-dropdown-box-shadow">
                    <NavLink className="dropdown-item c-dropdown-item-wrap" to='/CreateNewDeployment'>
                        <img className="c-dropdown-item-img" src="https://avatars0.githubusercontent.com/u/107673?v=3&amp;s=400" alt="" />
                        <span className="c-dropdown-item-name">Deployment</span>
                    </NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink className="dropdown-item c-dropdown-item-wrap" to='/CreateNewService'>
                        <img className="c-dropdown-item-img" src="https://avatars0.githubusercontent.com/u/107673?v=3&amp;s=400" alt="" />
                        <span className="c-dropdown-item-name">Service</span>
                    </NavLink>
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
