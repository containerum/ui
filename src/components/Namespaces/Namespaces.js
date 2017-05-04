import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getNamespaces } from '../../actions/NamespacesActions';
import NamespacesContainer from '../../containers/NamespacesContainer';

class Namespaces extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getNamespaces());
    }
    render() {
        let isFetchingComponent = "";
        if (this.props.NamespacesReducer.isFetching === false) {
            isFetchingComponent =
                <NamespacesContainer
                    namespacesDataReducer={this.props.NamespacesReducer.data}
                />
        }

        return (
            <div className="btn-group mr-auto">
                <button
                    type="button"
                    className="btn dropdown-toggle c-nav-menu-btn"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Personal space
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
