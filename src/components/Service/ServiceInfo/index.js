import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import s from '../../../images/s.png';

class ServiceInfo extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.DeleteServiceReducer.status === 202 && nextProps.DeleteServiceReducer.serviceName) {
            browserHistory.push('/Namespaces/' + this.props.idName);
        }
    }
    handleClickDeletingService(name) {
        this.props.onDeleteService(name);
    }
    render() {
        // console.log(this.props.GetServiceReducer);
        const serviceName = Object.keys(this.props.GetServiceReducer.data).length ? this.props.GetServiceReducer.data.name : '';
        const clusterIp = Object.keys(this.props.GetServiceReducer.data).length ? this.props.GetServiceReducer.data.cluster_ip : '';
        const domainHosts = Object.keys(this.props.GetServiceReducer.data).length ? this.props.GetServiceReducer.data.domain_hosts : [];
        const isExternal = Object.keys(this.props.GetServiceReducer.data).length ? this.props.GetServiceReducer.data.labels.external : '';
        const type = '' + isExternal === 'true' ? 'External' : 'Internal';
        const labels = Object.keys(this.props.GetServiceReducer.data).length ? this.props.GetServiceReducer.data.labels : [];
        const labelsArray = Object.keys(labels);
        return (
            <div className="content-block ">
                <div className="content-block-container content-block_common-statistic container ">
                    <div className="content-block-header">
                        <div className="content-block-header-label">
                            <div className="content-block-header-label__text content-block-header-label_main">{serviceName}</div>
                            <div className="content-block-header-label__descript">service</div>
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
                                        onClick={name => this.handleClickDeletingService(serviceName)}
                                    >Delete</button>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="content-block-content">
                        <div className="content-block__r-img"><img src={s} /></div>
                        <div className="content-block__info-item">
                            <div className="content-block__info-name">Type: </div>
                            <div className="content-block__info-text">{type}</div>
                        </div>
                        <div className="content-block__info-item">
                            <div className="content-block__info-name">IP: </div>
                            <div className="content-block__info-text">{clusterIp}</div>
                        </div>
                        <div className="content-block__info-item">
                            <div className="content-block__info-name">Domain:</div>
                            <div className="content-block__info-text">
                                {
                                    domainHosts.length ? domainHosts.map((item, index) => {
                                        return (
                                            <span key={index}>{item}</span>
                                        )
                                    }) : '-'
                                }
                            </div>
                        </div>
                        <div className="clearfix mt-2"> </div>
                        <div className="content-block__info-item i-1">
                            <div className="content-block__info-name">Labels: </div>
                            <div className="content-block__info-text">
                                {labelsArray.map((item, index) => {
                                    return (
                                        labelsArray[labelsArray.length - 1] === item ?
                                            <span key={index} className="padding">{item}: {labels[item]}</span> :
                                            <span key={index} className="padding">{item}: {labels[item]}, </span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ServiceInfo.propTypes = {
    idName: PropTypes.string,
    onDeleteService: PropTypes.func
};

function mapStateToProps(state) {
    return {
        GetServiceReducer: state.GetServiceReducer,
        DeleteServiceReducer: state.DeleteServiceReducer
    };

}

export default connect(mapStateToProps)(ServiceInfo);
