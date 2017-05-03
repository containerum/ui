import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavLink from '../../components/NavLink';

class CreateInstance extends Component {
    constructor() {
        super();
        this.state = {
            isToggleCreateInstance: false
        };
    }
    onToggleCreateInstance() {
        this.setState({
            isToggleCreateInstance: !this.state.isToggleCreateInstance
        });
    }
    render() {
        return (
            <div className="p-2" onBlur={this.onToggleCreateInstance.bind(this)}>
                <button
                    className="navbar-toggler navbar-toggler-margin-top"
                    onClick={this.onToggleCreateInstance.bind(this)}
                    type="button"
                >Create
                </button>
                <div className={this.state.isToggleCreateInstance ? "dropdown-menu show-dropdown-create" : "dropdown-menu"}>
                    <NavLink className="dropdown-item" to='/Deployment'>Deployment</NavLink>
                    <NavLink className="dropdown-item" to='/Secrets'>Secrets</NavLink>
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
