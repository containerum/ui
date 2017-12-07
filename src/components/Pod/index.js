import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPod } from '../../actions/PodActions/getPodAction';
import { deletePod } from '../../actions/PodActions/deletePodAction';
// import Spinner from '../Spinner';
import HeaderDropDown from '../../components/HeaderDropDown';
import PodInfo from './PodInfo';
import PodContainer from './PodContainer';
import Notification from '../Notification';

class Pod extends Component {
    componentDidMount() {
        this.props.onGetPod(this.props.params.idName, this.props.params.idPod);
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
                <HeaderDropDown
                    idName={this.props.params.idName}
                    idDep={this.props.params.idDep}
                    idPod={this.props.params.idPod}
                />
                <PodInfo
                    idName={this.props.params.idName}
                    idPod={this.props.params.idPod}
                    idDep={this.props.params.idDep}
                    onDeletePod={this.handleDeletePod.bind(this)}
                />
                <PodContainer
                    idName={this.props.params.idName}
                    idPod={this.props.params.idPod}
                    idDep={this.props.params.idDep}
                />
            </div>
        );
    }
}

Pod.propTypes = {
    onGetPod: PropTypes.func.isRequired,
    params: PropTypes.object,
    GetPodReducer: PropTypes.object,
    DeletePodReducer: PropTypes.object,
    errorMessage: PropTypes.string
};

function mapStateToProps(state) {
    const { GetPodReducer } = state;
    const { errorMessage } = GetPodReducer;

    return {
        errorMessage,
        GetPodReducer,
        DeletePodReducer: state.DeletePodReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetPod: (idName, idPod) => {
            dispatch(getPod(idName, idPod));
        },
        onDeletePod: (idName, idPod) => {
            dispatch(deletePod(idName, idPod));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pod);
