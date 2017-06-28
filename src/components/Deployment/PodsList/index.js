import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deletePod } from '../../../actions/PodActions/deletePodAction';
import Notification from '../../Notification';

class PodsList extends Component {
    constructor() {
        super();
        this.handleClickTR = this.handleClickTR.bind(this);
    }
    handleClickDeletingPod(name) {
        const { dispatch } = this.props;
        dispatch(deletePod(this.props.idName, name));
    }
    handleClickTR(href) {
        browserHistory.push('/Namespaces/' + this.props.idName + '/Deployments/' + this.props.idDep + '/Pods/' + href);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.DeletePodReducer.status === 202 && nextProps.DeletePodReducer.podName) {
            const id = `item_${nextProps.DeletePodReducer.podName}`;
            const el = document.getElementById(id);
            el.remove();
        }
    }
    render() {
        const sortPodsReducer = this.props.PodsReducer.data.sort(function (a) {
            return a.status.toUpperCase() === 'Running'.toUpperCase();
        });
        return (
            <div>
                <Notification
                    status={this.props.DeletePodReducer.status}
                    name={this.props.DeletePodReducer.podName}
                    errorMessage={this.props.DeletePodReducer.errorMessage}
                />
                <div className="container-fluid pt-3 pb-5">
                    <h5>Pods</h5>
                    <div className="row">
                        <div className="col-12">
                            <div className="card i-card-border mt-3">
                                <div className="card-block c-table-card-block">
                                    <div className="table table-hover c-table-card i-table-card">
                                        <div className="i-table-tbody">
                                            {
                                                sortPodsReducer.map((item, index) => {
                                                    const name = item.name;
                                                    const nameFirstChar = name.substring(0, 1).toUpperCase();
                                                    const id = `item_${name}`;
                                                    const imageColor = item.status.toUpperCase() === 'Running'.toUpperCase() ? '#009688' : '#D64242';
                                                    return (
                                                        <div className="i-row-table tr-hover" key={index} id={id}>
                                                            <div className="i-td-table i-td-table-first-width-pods" onClick={href => this.handleClickTR(item.name)}>
                                                                <svg className="c-table-card-img mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.78 33.25">
                                                                    <g>
                                                                        <path fill={imageColor} d="M5383.94,530.28l8.57-14.84a2,2,0,0,0,0-1.78l-8.56-14.85a2,2,0,0,0-1.54-.89h-17.14a2,2,0,0,0-1.54.89l-8.57,14.84a2,2,0,0,0,0,1.78l8.56,14.84a2,2,0,0,0,1.54.89h17.14A2,2,0,0,0,5383.94,530.28Z" transform="translate(-5354.94 -497.92)"/>
                                                                    </g>
                                                                    <text className="cls-2" textAnchor="middle" x="50%" y="70%">{nameFirstChar}</text>
                                                                </svg>
                                                                {name}
                                                            </div>
                                                            <div className="i-td-table i-td-table-pd-top" onClick={href => this.handleClickTR(item.name)}>{item.status}</div>
                                                            <div className="i-td-table i-td-table-pd-top" onClick={href => this.handleClickTR(item.name)}>{item.ram} MB RAM</div>
                                                            <div className="i-td-table i-td-table-pd-top" onClick={href => this.handleClickTR(item.name)}>{item.cpu} CPU</div>
                                                            <div className="i-td-table i-td-table-pd-top" onClick={href => this.handleClickTR(item.name)}>{item.created_at}</div>
                                                            <div className="i-td-table i-td-table-pd-top" onClick={href => this.handleClickTR(item.name)}>{item.restarts} restarts</div>
                                                            <div className="i-td-table text-right">
                                                                <div className="btn-group">
                                                                    <button className="btn btn-sm c-table-card-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i className="md-icon">more_horiz</i>
                                                                    </button>
                                                                    <div className="dropdown-menu dropdown-menu-right i-dropdown-box-shadow" aria-labelledby="dropdownMenu2">
                                                                        <button className="dropdown-item text-danger" type="button" onClick={name => this.handleClickDeletingPod(item.name)}>Delete</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PodsList.propTypes = {
    idName: PropTypes.string,
    idDep: PropTypes.string
};

function mapStateToProps (state) {
    const { PodsReducer } = state;
    const { DeletePodReducer } = state;
    const { errorMessage } = PodsReducer;

    return {
        errorMessage,
        DeletePodReducer,
        PodsReducer
    }
}

export default connect(mapStateToProps)(PodsList)
