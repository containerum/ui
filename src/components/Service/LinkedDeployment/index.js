import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

// import Spinner from '../../Spinner';
import deploy from '../../../images/deploy.png';

import { getDeployments } from '../../../actions/DeploymentsActions';
import { deleteDeployment } from '../../../actions/DeploymentActions/deleteDeploymentAction';

class LinkedDeployment extends Component {
    constructor() {
        super();
        this.state = {
	        linkedDep: ''
        }
    }
    componentDidMount() {
	    this.props.onGetDeployments(this.props.params.idName);
    }
	componentWillReceiveProps(nextProps) {
		const linkedDepName = Object.keys(nextProps.GetServiceReducer.data).length ? nextProps.GetServiceReducer.data.deployment : null;
		nextProps.DeploymentsReducer.data.find(item => {
			if (item.name === linkedDepName) {
				this.setState({
					linkedDep: item
				})
			}
		});
    }
    handleClickDeployment(name) {
        if (typeof window !== 'undefined') {
            browserHistory.push('/Namespaces/' + this.props.params.idName + '/Deployments/' + name);
        }
    }
    render() {
	    // console.log(this.state.linkedDep);
        let isFetchingDeploymentsContains = '';
        if (Object.keys(this.state.linkedDep).length) {
            const depName = this.state.linkedDep ? this.state.linkedDep.name : '';
            const cpu = this.state.linkedDep ? this.state.linkedDep.cpu : '';
            const ram = this.state.linkedDep ? this.state.linkedDep.ram : '';
            const id = this.state.linkedDep ? `item_${depName}` : '';
            isFetchingDeploymentsContains =
                <table className="content-block__table table" width="1170">
                    <thead>
                        <tr>
                            <td className="td-1"> </td>
                            <td className="td-2">Name</td>
                            <td className="td-3">Pods</td>
                            <td className="td-4">RAM (MB)</td>
                            <td className="td-5">CPU (m)</td>
                            <td className="td-6">Age</td>
                            <td className="td-7"> </td>
                            <td className="td-7"> </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            className="tr-table-hover"
                            id={id}
                            onClick={name => this.handleClickDeployment(depName)}
                        >
                            <td className="td-1"><img src={deploy} /></td>
                            <td className="td-2">{depName}</td>
                            <td className="td-3">Terminated</td>
                            <td className="td-4">{ram}</td>
                            <td className="td-5">{cpu}</td>
                            <td className="td-6">11h</td>
                            <td className="td-7">
                                {/*<div className="warning"> </div>*/}
                            </td>
                            <td
                                className="td-7 dropdown no-arrow"
                                // onClick={this.handleClose.bind(this)}
                            >
                                {/*<i*/}
                                {/*className="content-block-table__more ion-more dropdown-toggle"*/}
                                {/*data-toggle="dropdown"*/}
                                {/*aria-haspopup="true"*/}
                                {/*aria-expanded="false"*/}
                                {/*> </i>*/}
                                {/*<ul className="dropdown-menu dropdown-menu-right" role="menu">*/}
                                {/*<button*/}
                                {/*className="dropdown-item text-danger"*/}
                                {/*onClick={name => this.handleClickDeletingDeployment(depName)}*/}
                                {/*>Delete</button>*/}
                                {/*</ul>*/}
                            </td>
                        </tr>
                    </tbody>
                </table>;
        } else if (this.props.DeploymentsReducer.isFetching) {
            isFetchingDeploymentsContains =
                <div style={{
                    height: '100px',
                    margin: '0 30px',
                    borderRadius: '2px',
                    backgroundColor: '#f6f6f6'
                }} />;
        } else {
            isFetchingDeploymentsContains =
                <table className="content-block__table table" width="1170">
                    <tr>
                        <td className="td-1">No have linked Deployment</td>
                    </tr>
                </table>;
        }
        return (
            <div className="content-block-content full">
                <div className="tab-content">
                    <div className="tab-pane fade show deployments active">
	                    {isFetchingDeploymentsContains}
                    </div>
                </div>
            </div>
        );
    }
}

LinkedDeployment.propTypes = {
    // idDep: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        GetServiceReducer: state.GetServiceReducer,
        DeploymentsReducer: state.DeploymentsReducer
    };

}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetDeployments: (idName) => {
            dispatch(getDeployments(idName));
        },
        onDeleteDeployment: (idName, idDep) => {
            dispatch(deleteDeployment(idName, idDep));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDeployment);
