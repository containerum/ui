import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getNamespaces } from '../../actions/NamespacesActions';
import { getProfileBalance } from '../../actions/BillingActions/getProfileBalanceAction';
import NamespacesRoute from './NamespacesRoute';
// import Spinner from '../Spinner';

class Namespaces extends Component {
    componentDidMount() {
        this.props.onGetNamespaces();
	    this.props.onGetProfileBalance();
    }
    render() {
        return (
            <div>
                <NamespacesRoute
                    namespacesDataReducer={this.props.NamespacesReducer.data}
                    namespacesErrorMessageReducer={this.props.NamespacesReducer.errorMessage}
                    namespacesStatusErrorReducer={this.props.NamespacesReducer.statusError}
                />
            </div>
        );
    }
}

Namespaces.propTypes = {
    errorMessage: PropTypes.string,
	onGetProfileBalance: PropTypes.func,
    onGetNamespaces: PropTypes.func.isRequired,
    NamespacesReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        NamespacesReducer: state.NamespacesReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
	    onGetProfileBalance: () => {
		    dispatch(getProfileBalance());
	    },
        onGetNamespaces: () => {
            dispatch(getNamespaces());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Namespaces);
