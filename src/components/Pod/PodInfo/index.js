import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import r from '../../../images/r.png';

class PodInfo extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.DeletePodReducer.status === 202 &&
	        nextProps.DeletePodReducer.podName !== this.props.DeletePodReducer.podName &&
	        !nextProps.DeletePodReducer.isFetching) {
	        browserHistory.push('/Namespaces/' + this.props.idName + '/Deployments/' + this.props.idDep);
        }
    }
    handleClickDeletingPod(name) {
        this.props.onDeletePod(name);
    }
    render() {
	    let isPodsEmpty = '';
	    const labelsArray = Object.keys(this.props.GetPodReducer.data).length ? Object.keys(this.props.GetPodReducer.data.labels) : [];
	    const name = this.props.GetPodReducer.data.name ? this.props.GetPodReducer.data.name : '';
	    // const podStatus = this.props.GetPodReducer.data.status ? this.props.GetPodReducer.data.status : 'Failed';
	    if (!this.props.GetPodReducer.isFetching &&
		    !this.props.DeletePodReducer.isFetching) {
		    isPodsEmpty =
                <div className="content-block-container content-block_common-statistic container ">
                    <div className="content-block-header">
                        <div className="content-block-header-label">
                            <div className="content-block-header-label__text content-block-header-label_main">{name}</div>
                            <div className="content-block-header-label__descript">pod</div>
                        </div>
                        <div className="content-block-header-extra-panel">
                            <div className="content-block-header-extra-panel dropdown no-arrow">
                                <i
                                    className="content-block-header__more ion-more dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                > </i>
                                <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                    <button
                                        className="dropdown-item text-danger"
                                        onClick={name => this.handleClickDeletingPod(this.props.GetPodReducer.data.name)}
                                    >Delete</button>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="content-block-content ">
                        <div className="content-block__r-img"><img src={r} /></div>
                        <div className="content-block__info-item">
                            <div className="content-block__info-name">RAM ( Usage ) : </div>
                            <div className="content-block__info-text">{this.props.GetPodReducer.data.ram} MB</div>
                        </div>
                        <div className="content-block__info-item">
                            <div className="content-block__info-name">CPU ( Usage ) : </div>
                            <div className="content-block__info-text">{this.props.GetPodReducer.data.cpu} m</div>
                        </div>
					    {/*<div className="content-block__info-item">*/}
					    {/*<div className="content-block__info-name">Volume ( Usage / Total ):</div>*/}
					    {/*<div className="content-block__info-text">500 / 631 GB</div>*/}
					    {/*</div>*/}
                        <div className="content-block__info-item">
                            <div className="content-block__info-name">Status: </div>
                            <div className="content-block__info-text">{this.props.GetPodReducer.data.status}</div>
                        </div>

                        <div className="clearfix mt-2"> </div>

                        <div className="content-block__info-item i-1">
                            <div className="content-block__info-name">Labels: </div>
                            <div className="content-block__info-text">
							    {labelsArray.map((item, index) =>  {
								    return (
									    labelsArray[labelsArray.length - 1] === item ?
                                            <span key={index} className="padding">{item}: {this.props.GetPodReducer.data.labels[item]}</span> :
                                            <span key={index} className="padding">{item}: {this.props.GetPodReducer.data.labels[item]}, </span>
								    );
							    })}
                            </div>
                        </div>
                    </div>
                </div>
	    } else {
		    isPodsEmpty =
                <div
                    className="container"
                    style={{
					    padding: '0',
					    marginTop: '17px',
					    marginBottom: '30px',
					    backgroundColor: 'transparent'
				    }}>
                    <img src={require('../../../images/ns-dep.svg')} style={{width: '100%'}}/>
                </div>
	    }
        // console.log(this.props.GetPodReducer.data);
        return (
            <div>
                <div className="content-block">
                    { isPodsEmpty }
                </div>
            </div>
        );
    }
}

PodInfo.propTypes = {
    onDeletePod: PropTypes.func.isRequired,
    DeletePodReducer: PropTypes.object,
    GetPodReducer: PropTypes.object,
    idName: PropTypes.string,
    idDep: PropTypes.string,
    idPod: PropTypes.string
};

function mapStateToProps(state) {
    const { DeletePodReducer } = state;
    const { errorMessage } = DeletePodReducer;

    return {
        errorMessage,
        DeletePodReducer,
        GetPodReducer: state.GetPodReducer
    };
}

export default connect(mapStateToProps)(PodInfo);
