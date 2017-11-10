import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderDropDown from '../HeaderDropDown';
import NamespaceInfo from './NamespaceInfo';
import NamespaceContains from './NamespaceContains';
import Spinner from '../Spinner';
import { getNamespaces } from '../../actions/NamespacesActions';
import { getVolume } from '../../actions/VolumeActions/getVolumeAction';

class Namespace extends Component {
    componentDidMount() {
        // if (!this.props.NamespacesReducer.data.length) {
        this.props.onGetNamespaces();
        this.props.onGetVolume(`${this.props.params.idName}-volume`);
        // }
    }
    componentWillReceiveProps(nextProps) {
        // if (nextProps.DeleteDeploymentReducer.status === 202 &&
        //     this.props.DeleteDeploymentReducer.deploymentName !==
        //     nextProps.DeleteDeploymentReducer.deploymentName) {
        //     this.props.onGetNamespaces();
        // }
        if (nextProps.params.idName !== this.props.params.idName) {
            this.props.onGetVolume(`${nextProps.params.idName}-volume`);
        }
    }
    render() {
        // console.log(this.props.GetVolumeReducer);
        let isFetchingNamespaceInfo = '';
        if (this.props.NamespacesReducer.isFetching === false &&
            this.props.GetVolumeReducer.isFetching === false) {
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
        },
        onGetVolume: (idVolume) => {
            dispatch(getVolume(idVolume));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Namespace);
