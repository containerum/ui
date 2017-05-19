import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { getPod } from '../../actions/PodActions';

import Info from './Info';
import Conditions from './Conditions';
import Containers from './Containers';
import TabOfObject from '../../components/TabOfObject';
import Namespaces from '../../components/Namespaces';
import CreateInstance from '../../components/CreateInstance';

class Pod extends Component {
    // componentWillMount() {
    //     const { dispatch } = this.props;
    //     dispatch(getPod());
    // }
    render() {
        console.log(this.props.params)
        return (
            <div>
                <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                    <Namespaces idDep={this.props.params.idDep} idPod={this.props.params.idPod} />
                    <CreateInstance />
                </div>
                <TabOfObject />
                <Info />
                <Conditions />
                <Containers />
            </div>
        );
    }
}

Pod.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps (state) {
    const { PodReducer } = state;
    const { errorMessage } = PodReducer;

    return {
        errorMessage,
        PodReducer
    }
}

export default connect(mapStateToProps)(Pod)
