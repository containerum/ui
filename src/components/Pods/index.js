import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Spinner from '../Spinner';
import PodsContains from './PodsContains';
import { getPods } from '../../actions/PodsActions';
import { deletePod } from '../../actions/PodActions/deletePodAction';
import Notification from '../Notification';

class Pods extends Component {
    componentDidMount() {
        // if (!this.props.PodsReducer.data.length) {
            this.props.onGetPods(this.props.params.idName, this.props.params.idDep);
        // }
    }
    handleDeletePod(idPod) {
        // console.log(this.props.params.idName, idPod);
        this.props.onDeletePod(this.props.params.idName, idPod);
    }
    render() {
        return (
            <div>
                <Notification
                    status={this.props.DeletePodReducer.status}
                    name={this.props.DeletePodReducer.podName}
                    errorMessage={this.props.DeletePodReducer.errorMessage}
                />
                <PodsContains
                    idName={this.props.params.idName}
                    idDep={this.props.params.idDep}
                    onDeletePod={this.handleDeletePod.bind(this)}
                />
            </div>
        );
    }
}

Pods.propTypes = {
    params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        PodsReducer: state.PodsReducer,
        DeletePodReducer: state.DeletePodReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetPods: (idName, idDep) => {
            dispatch(getPods(idName, idDep));
        },
        onDeletePod: (idName, idPod) => {
            dispatch(deletePod(idName, idPod));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pods);
