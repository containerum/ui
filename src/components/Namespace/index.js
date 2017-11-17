import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';

import HeaderDropDown from '../HeaderDropDown';
import NamespaceInfo from './NamespaceInfo';
import NamespaceContains from './NamespaceContains';
import Spinner from '../Spinner';
import { getNamespaces } from '../../actions/NamespacesActions';

class Namespace extends Component {
    componentDidMount() {
        // if (!this.props.NamespacesReducer.data.length) {
        this.props.onGetNamespaces();
        ReactGA.event({
            category: 'UI',
            action: 'UI_ns_open'
        });
    }
    componentWillReceiveProps(nextProps) {
        // if (nextProps.DeleteDeploymentReducer.status === 202 &&
        //     this.props.DeleteDeploymentReducer.deploymentName !==
        //     nextProps.DeleteDeploymentReducer.deploymentName) {
        //     this.props.onGetNamespaces();
        // }
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
        NamespacesReducer: state.NamespacesReducer,
        GetVolumeReducer: state.GetVolumeReducer,
        DeleteDeploymentReducer: state.DeleteDeploymentReducer
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
