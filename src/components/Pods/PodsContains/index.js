import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { timeago } from '../../../functions/timeago';

import pod from '../../../images/pod-3.png';
import NotFoundPods from '../NotFoundPods';
// import Spinner from '../../Spinner';
import { getPods } from '../../../actions/PodsActions';

class PodsContains extends Component {
    constructor() {
        super();
        this.state = {
            countOfPods: 0
        }
    }
    componentWillReceiveProps(nextProps) {
	    if (this.props.idDep !== nextProps.idDep &&
            this.props.idName !== nextProps.idName) {
		    this.props.onGetPods(nextProps.idName, nextProps.idDep);
		    this.setState({
			    ...this.state,
			    countOfPods: 0
		    })
	    }
        if (nextProps.DeletePodReducer.isFetching === false &&
            nextProps.DeletePodReducer.status === 202 &&
            nextProps.DeletePodReducer.podName) {
            const id = `item_${nextProps.DeletePodReducer.podName}`;
            if (typeof window !== 'undefined') {
                const el = document.getElementById(id);
                el ? el.remove() : el;
                el ? this.setState({
	                countOfPods: this.state.countOfPods + 1
                }) : null;
            }
        }
    }
    handleClickPod(name) {
        if (typeof window !== 'undefined') {
            browserHistory.push('/Namespaces/' + this.props.idName + '/Deployments/' + this.props.idDep + '/Pods/' + name);
        }
    }
    handleClose(e) {
        e.stopPropagation();
    }
    handleClickDeletingPod(name) {
        this.props.onDeletePod(name);
    }
    render() {
	    // console.log(this.state.countOfPods);
	    // console.log(this.props.PodsReducer);
        const ta = timeago();
        let isPodsEmpty = '';
        if (this.props.PodsReducer.data.length &&
	        this.state.countOfPods !==
	        this.props.PodsReducer.data.length &&
	        !this.props.DeleteDeploymentReducer.isFetching) {
            isPodsEmpty =
                <table className="content-block__table table" width="1170">
                    <thead>
                    <tr>
                        <td className="td-1"> </td>
                        <td className="td-2">Name</td>
                        <td className="td-3">Status</td>
                        <td className="td-4">Restarts</td>
                        <td className="td-5">Containers</td>
                        <td className="td-6">Age</td>
                        <td className="td-7"> </td>
                    </tr>
                    </thead>
                    <tbody>
		            {
			            this.props.PodsReducer.data.map((item, index) => {
				            const id = `item_${item.name}`;
				            const milliseconds = Date.parse(item.created_at);
				            const dateHours = new Date(milliseconds);
				            const dateValue = ta.ago(dateHours, true);
				            const activeContainers = item.active_containers;
				            const totalContainers = item.total_containers;
				            return (
                                <tr
                                    id={id}
                                    key={index}
                                    className="tr-table-hover"
                                    onClick={name => this.handleClickPod(item.name)}
                                >
                                    <td className="td-1"><img src={pod} /></td>
                                    <td className="td-2">{item.name}</td>
                                    <td className="td-3">{item.status}</td>
                                    <td className="td-4">{item.restarts} restarts</td>
                                    <td className="td-5">{activeContainers} / {totalContainers}</td>
                                    <td className="td-6">{dateValue}</td>
                                    <td className="td-7 dropdown no-arrow" onClick={this.handleClose.bind(this)}>
                                        <i
                                            className="content-block-table__more ion-more dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        > </i>
                                        <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                            <button
                                                className="dropdown-item text-danger"
                                                onClick={name => this.handleClickDeletingPod(item.name)}
                                            >Delete</button>
                                        </ul>
                                    </td>
                                </tr>
				            );
			            })
		            }
                    </tbody>
                </table>
        } else if (this.props.PodsReducer.isFetching) {
	        isPodsEmpty =
                <div style={{
			        height: '270px',
			        margin: '0 30px',
			        borderRadius: '2px',
			        backgroundColor: '#f6f6f6'
		        }} />
        } else if (this.props.DeleteDeploymentReducer.isFetching) {
	        isPodsEmpty =
                <div style={{
			        height: '270px',
			        margin: '0 30px',
			        borderRadius: '2px',
			        backgroundColor: '#f6f6f6'
		        }} />
        }
        else {
            isPodsEmpty = <NotFoundPods/>
        }
        return (
            <div>
                <div className="content-block-content full">
	                { isPodsEmpty }
                </div>
            </div>
        );
    }
}

PodsContains.propTypes = {
    onDeletePod: PropTypes.func.isRequired,
    DeletePodReducer: PropTypes.object,
    PodsReducer: PropTypes.object,
	DeleteDeploymentReducer: PropTypes.object,
    idName: PropTypes.string,
    idDep: PropTypes.string
};

function mapStateToProps(state) {
    const { DeletePodReducer } = state;
    const { errorMessage } = DeletePodReducer;

    return {
        errorMessage,
        DeletePodReducer,
        PodsReducer: state.PodsReducer,
	    DeleteDeploymentReducer: state.DeleteDeploymentReducer
    };
}

const mapDispatchToProps = (dispatch) => {
	return {
		onGetPods: (idName, idDep) => {
			dispatch(getPods(idName, idDep));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PodsContains);
