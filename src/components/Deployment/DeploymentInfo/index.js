import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import r from '../../../images/r.png';

class DeploymentInfo extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.DeleteDeploymentReducer.status === 202 && nextProps.DeleteDeploymentReducer.deploymentName) {
            browserHistory.push('/Namespaces/' + this.props.idName);
        }
    }
    handleClickDeletingDeployment(idDep) {
        this.props.onDeleteDeployment(idDep);
    }
    render() {
        // console.log(this.props.GetDeploymentReducer);
        const depName = Object.keys(this.props.GetDeploymentReducer.data).length ? this.props.GetDeploymentReducer.data.name : '';
        const cpu = Object.keys(this.props.GetDeploymentReducer.data).length ? this.props.GetDeploymentReducer.data.cpu : '';
        const ram = Object.keys(this.props.GetDeploymentReducer.data).length ? this.props.GetDeploymentReducer.data.ram : '';
        const status = Object.keys(this.props.GetDeploymentReducer.data).length ? this.props.GetDeploymentReducer.data.status : {};
        return (
            <div className="content-block ">
                <div className="content-block-container content-block_common-statistic container ">
                    <div className="content-block-header">
                        <div className="content-block-header-label">
                            <div className="content-block-header-label__text content-block-header-label_main">{depName}</div>
                            <div className="content-block-header-label__descript">deploy</div>
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
                                        onClick={idDep => this.handleClickDeletingDeployment(depName)}
                                    >Delete</button>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="content-block-content collapsed">
                        <div className="content-block__r-img"><img src={r} /></div>
                        <div className="content-block__info-item">
                            <div className="content-block__info-name">RAM ( Usage / Total ) : </div>
                            <div className="content-block__info-text">{ram} MB</div>
                        </div>
                        <div className="content-block__info-item">
                            <div className="content-block__info-name">CPU ( Usage / Total ) : </div>
                            <div className="content-block__info-text">{cpu} m</div>
                        </div>
                        <div className="content-block__info-item">
                            <div className="content-block__info-name">Status: </div>
                            <div className="content-block__info-text">
                                {
                                    Object.keys(status).map((item, index) => {
                                        const statusArray = Object.keys(status);
                                        return (
                                            statusArray[statusArray.length - 1] === item ?
                                                <span key={index}>{status[item]}&nbsp;{item}</span> :
                                                index % 2 === 0 ?
                                                <span key={index}>{status[item]}&nbsp;{item}, </span> :
                                                <span key={index}>{status[item]}&nbsp;{item},<br/></span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DeploymentInfo.propTypes = {
    idName: PropTypes.string,
    onDeleteDeployment: PropTypes.func
};

function mapStateToProps(state) {
    return {
        GetDeploymentReducer: state.GetDeploymentReducer,
        DeleteDeploymentReducer: state.DeleteDeploymentReducer
    };

}

export default connect(mapStateToProps)(DeploymentInfo);
