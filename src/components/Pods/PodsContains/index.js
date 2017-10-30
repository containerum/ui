import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { timeago } from '../../../functions/timeago';

import pod from '../../../images/pod-3.png';
import NotFoundPods from '../NotFoundPods';
import Spinner from '../../Spinner';

class PodsContains extends Component {
    constructor() {
        super();
        this.state = {
            countOfPods: 0
        }
    }
    componentDidMount() {
        this.setState({
            countOfPods: this.props.PodsReducer.data ?
                this.props.PodsReducer.data.length : 0
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.DeletePodReducer.isFetching === false &&
            nextProps.DeletePodReducer.status === 202 &&
            nextProps.DeletePodReducer.podName) {
            this.setState({
                countOfPods: this.state.countOfPods - 1
            });
            const id = `item_${nextProps.DeletePodReducer.podName}`;
            if (typeof window !== 'undefined') {
                const el = document.getElementById(id);
                el ? el.remove() : el;
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
        // console.log(this.props.PodsReducer);
        const ta = timeago();
        let isPodsEmpty = '';
        if (this.state.countOfPods) {
            isPodsEmpty =
                <div className="content-block-content full">
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
                </div>
        } else {
            isPodsEmpty = <NotFoundPods/>
        }
        let isFetchingDeletePod = '';
        if (this.props.DeletePodReducer.isFetching) {
            isFetchingDeletePod = <Spinner />;
        }
        return (
            <div>
                { isFetchingDeletePod }
                { isPodsEmpty }
            </div>
        );
    }
}

PodsContains.propTypes = {
    onDeletePod: PropTypes.func.isRequired,
    DeletePodReducer: PropTypes.object,
    PodsReducer: PropTypes.object,
    idName: PropTypes.string,
    idDep: PropTypes.string
};

function mapStateToProps(state) {
    const { DeletePodReducer } = state;
    const { errorMessage } = DeletePodReducer;

    return {
        errorMessage,
        DeletePodReducer,
        PodsReducer: state.PodsReducer
    };
}

export default connect(mapStateToProps)(PodsContains);
