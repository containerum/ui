import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPod } from '../../actions/PodActions/getPodAction';
import Spinner from '../Spinner';

import PostPodContainer from '../../containers/PostPodContainer';
import NamespacesDropDown from '../../components/NamespacesDropDown';
// import CreateInstance from '../../components/CreateInstance';

class Pod extends Component {
    componentDidMount() {
        this.props.onGetPod(this.props.params.idName, this.props.params.idPod);
    }
    render() {
        let isFetchingComponent = '';
        if (this.props.GetPodReducer.isFetching === false) {
            isFetchingComponent =
                <div>
                    <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                        <NamespacesDropDown
                            idDep={this.props.params.idDep}
                            idPod={this.props.params.idPod}
                            idName={this.props.params.idName}
                        />
                        {/*<CreateInstance idName={this.props.params.idName} />*/}
                    </div>
                    <PostPodContainer
                        GetPodReducer={this.props.GetPodReducer}
                        idName={this.props.params.idName}
                        idPod={this.props.params.idPod}
                        idDep={this.props.params.idDep}
                    />
                </div>;
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

Pod.propTypes = {
    onGetPod: PropTypes.func.isRequired,
    params: PropTypes.object,
    GetPodReducer: PropTypes.object,
    errorMessage: PropTypes.string
};

function mapStateToProps(state) {
    const { GetPodReducer } = state;
    const { errorMessage } = GetPodReducer;

    return {
        errorMessage,
        GetPodReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetPod: (idName, idPod) => {
            dispatch(getPod(idName, idPod));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pod);
