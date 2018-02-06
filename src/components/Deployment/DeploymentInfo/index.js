import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import DeleteModal from '../../CustomerModal/DeleteModal';
import NavLink from '../../../containers/NavLink';
import r from '../../../images/r.png';
import Notification from '../../Notification';

class DeploymentInfo extends Component {
    constructor() {
        super();
        this.state = {
            isOpened: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.DeleteDeploymentReducer) {
            this.setState({
                ...this.state,
                isOpened: false
            });
        }
        if (nextProps.DeleteDeploymentReducer.status === 202 &&
	        nextProps.DeleteDeploymentReducer.deploymentName !==
            this.props.DeleteDeploymentReducer.deploymentName &&
	        !nextProps.DeleteDeploymentReducer.isFetching) {
	        browserHistory.push('/Namespaces/' + this.props.idName);
        }
    }
    handleClickDeletingDeployment() {
        this.setState({
            ...this.state,
            isOpened: true
        });
    }
    // handleClickDeletingDeployment(idDep) {
    //     this.props.onDeleteDeployment(idDep);
    // }
    render() {
	    let isFetchingComponent = '';
	    const depName = Object.keys(this.props.GetDeploymentReducer.data).length ? this.props.GetDeploymentReducer.data.name : '';
	    const cpu = Object.keys(this.props.GetDeploymentReducer.data).length ? this.props.GetDeploymentReducer.data.cpu : '';
	    const ram = Object.keys(this.props.GetDeploymentReducer.data).length ? this.props.GetDeploymentReducer.data.ram : '';
	    const status = Object.keys(this.props.GetDeploymentReducer.data).length ? this.props.GetDeploymentReducer.data.status : {};
	    if (!this.props.GetDeploymentReducer.isFetching &&
		    !this.props.DeleteDeploymentReducer.isFetching) {
		    isFetchingComponent =
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
	                                {/*<NavLink*/}
		                                {/*className="dropdown-item"*/}
		                                {/*to={`/Namespaces/${this.props.idName}/UpdateDeployment`}*/}
	                                {/*>Update</NavLink>*/}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="content-block-content collapsed">
                        <div className="content-block__r-img"><img src={r} /></div>
                        <div className="content-block__info-item">
                            <div className="content-block__info-name">RAM ( Usage ) : </div>
                            <div className="content-block__info-text">{ram} MB</div>
                        </div>
                        <div className="content-block__info-item">
                            <div className="content-block__info-name">CPU ( Usage ) : </div>
                            <div className="content-block__info-text">{cpu} m</div>
                        </div>
                        <div className="content-block__info-item">
                            <div className="content-block__info-name">Status ( Available / Total ) : </div>
                            <div className="content-block__info-text">{status.available} / {status.total}</div>
                        </div>
                    </div>
                </div>
        } else {
		    isFetchingComponent =
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
        // console.log(this.props.GetDeploymentReducer);
        return (
            <div className="content-block">
                <Notification
                    status={this.props.DeleteDeploymentReducer.status}
                    name={this.props.DeleteDeploymentReducer.deploymentName}
                    errorMessage={this.props.DeleteDeploymentReducer.errorMessage}
                />
                { isFetchingComponent }
                <DeleteModal
                    type="Deployment"
                    name={depName}
                    isOpened={this.state.isOpened}
                    onHandleDelete={this.props.onDeleteDeployment}
                />
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
