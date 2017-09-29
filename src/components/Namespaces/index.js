import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getNamespaces } from '../../actions/NamespacesActions';
import NamespacesRoute from './NamespacesRoute';
import Spinner from '../Spinner';

class Namespaces extends Component {
    componentDidMount() {
        // if (!this.props.NamespacesReducer.data.length) {
            this.props.onGetNamespaces();
        // }
    }
    render() {
        let isFetchingComponent = '';
        if (this.props.NamespacesReducer.isFetching === false) {
            isFetchingComponent =
                <NamespacesRoute
                    namespacesDataReducer={this.props.NamespacesReducer.data}
                    namespacesErrorMessageReducer={this.props.NamespacesReducer.errorMessage}
                    namespacesStatusErrorReducer={this.props.NamespacesReducer.statusError}
                />;
        } else {
            isFetchingComponent = <Spinner />;
        }

        return (
            <div>
                { isFetchingComponent }
            </div>
        );
    }
}

Namespaces.propTypes = {
    errorMessage: PropTypes.string,
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
        onGetNamespaces: () => {
            dispatch(getNamespaces());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Namespaces);
