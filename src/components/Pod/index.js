import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPod } from '../../actions/PodActions';
import Spinner from '../Spinner';

import PostPodContainer from '../../containers/PostPodContainer';
import Namespaces from '../../components/Namespaces';
import CreateInstance from '../../components/CreateInstance';

class Pod extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getPod('default', this.props.params.idPod));
    }
    render() {
        let isFetchingComponent = "";
        if (this.props.PodReducer.isFetching === false) {
            isFetchingComponent =
                <div>
                    <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                        <Namespaces idDep={this.props.params.idDep} idPod={this.props.params.idPod} />
                        <CreateInstance />
                    </div>
                    <PostPodContainer PodReducer={this.props.PodReducer} />
                </div>
        } else {
            isFetchingComponent = <Spinner />
        }
        return (
            <div>
                { isFetchingComponent }
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
