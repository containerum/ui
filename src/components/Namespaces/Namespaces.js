import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getNamespaces } from '../../actions/NamespacesActions';
import NamespacesContainer from '../../containers/NamespacesContainer';

class Namespaces extends Component {
    constructor() {
        super();
        this.state = {
            toggleBtnNamespaces: false
        };
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getNamespaces());
    }
    onToggleGetNamespaces() {
        this.setState({
            toggleBtnNamespaces: !this.state.toggleBtnNamespaces
        });
    }
    onBlurGetNamespaces() {
        this.setState({
            toggleBtnNamespaces: false
        });
    }
    render() {
        let isFetchingComponent = <div>Loading</div>;
        if (this.props.NamespacesReducer.isFetching === false) {
            isFetchingComponent =
                <NamespacesContainer
                    stateBtnToggle={this.state.toggleBtnNamespaces}
                    namespacesDataReducer={this.props.NamespacesReducer.data}
                />
        }

        return (
            <div className="p-2" onBlur={this.onBlurGetNamespaces.bind(this)}>
                <button
                    className="navbar-toggler navbar-toggler-margin-top"
                    onClick={this.onToggleGetNamespaces.bind(this)}
                    type="button"
                >Personal Space
                </button>
                { isFetchingComponent }
            </div>
        );
    }
}

Namespaces.propTypes = {
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

export default connect(mapStateToProps)(Namespaces)
