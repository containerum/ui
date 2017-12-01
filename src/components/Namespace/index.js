import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';

import HeaderDropDown from '../HeaderDropDown';
import NamespaceInfo from './NamespaceInfo';
import NamespaceContains from './NamespaceContains';
// import Spinner from '../Spinner';
import { getNamespaces } from '../../actions/NamespacesActions';

class Namespace extends Component {
    componentDidMount() {
        this.props.onGetNamespaces();
        ReactGA.event({
            category: 'UI',
            action: 'UI_ns_open'
        });
    }
    // componentWillReceiveProps(nextProps) {
    //     if (this.props.params.idName !== nextProps.params.idName) {
	 //        this.props.onGetNamespaces();
    //     }
    // }
    render() {
        return (
            <div>
                <HeaderDropDown idName={this.props.params.idName} />
                <NamespaceInfo idName={this.props.params.idName} />
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
