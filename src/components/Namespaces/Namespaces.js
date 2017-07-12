import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Posts from './Posts';
import Spinner from '../Spinner';

class Namespaces extends Component {
    render() {
        let isFetchingComponent = '';
        if (this.props.NamespacesReducer.isFetching === false) {
            isFetchingComponent =
                <Posts
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
    NamespacesReducer: PropTypes.object
};

export default Namespaces;
