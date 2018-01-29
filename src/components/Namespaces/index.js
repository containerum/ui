import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getNamespaces } from '../../actions/NamespacesActions';
import { getProfileBalance } from '../../actions/BillingActions/getProfileBalanceAction';
import NamespacesRoute from './NamespacesRoute';
import Notification from '../Notification';
// import Spinner from '../Spinner';

class Namespaces extends Component {
    componentDidMount() {
        this.props.onGetNamespaces();
	    this.props.onGetProfileBalance();
    }
    render() {
	    // console.log('this.props.CreateIntServiceReducer', this.props.CreateIntServiceReducer);
	    // console.log('this.props.CreateExtServiceReducer', this.props.CreateExtServiceReducer);
        return (
            <div>
	            <Notification
		            status={this.props.CreateIntServiceReducer.status}
		            name={this.props.CreateIntServiceReducer.idServ}
		            errorMessage={this.props.CreateIntServiceReducer.errorMessage}
	            />
	            <Notification
		            status={this.props.CreateExtServiceReducer.status}
		            name={this.props.CreateExtServiceReducer.idServ}
		            errorMessage={this.props.CreateExtServiceReducer.errorMessage}
	            />
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
    NamespacesReducer: PropTypes.object,
	CreateIntServiceReducer: PropTypes.object,
	CreateExtServiceReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        NamespacesReducer: state.NamespacesReducer,
	    CreateIntServiceReducer: state.CreateIntServiceReducer,
	    CreateExtServiceReducer: state.CreateExtServiceReducer,
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
