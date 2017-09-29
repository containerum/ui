import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderDropDown from '../HeaderDropDown';
import NamespaceInfo from './NamespaceInfo';
import NamespaceContains from './NamespaceContains';
import Spinner from '../Spinner';
import { getNamespaces } from '../../actions/NamespacesActions';

class Namespace extends Component {
    componentDidMount() {
        if (!this.props.NamespacesReducer.data.length) {
            this.props.onGetNamespaces();
        }
    }
    render() {
        let isFetchingNamespaceInfo = '';
        if (this.props.NamespacesReducer.isFetching === false) {
            isFetchingNamespaceInfo =
                <NamespaceInfo idName={this.props.params.idName} />;
        } else {
            isFetchingNamespaceInfo = <Spinner />;
        }
        return (
            <div>
                <HeaderDropDown idName={this.props.params.idName} />
                {isFetchingNamespaceInfo}
                <NamespaceContains
                    children={this.props.children}
                    idName={this.props.params.idName}
                />
            </div>
        );
    }
}

Namespace.propTypes = {
    params: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(Namespace);
