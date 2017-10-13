import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Spinner from '../../Spinner';
import deploy from '../../../images/deploy.png';

import { getDeployments } from '../../../actions/DeploymentsActions';
import { deleteDeployment } from '../../../actions/DeploymentActions/deleteDeploymentAction';

class LinkedDeployment extends Component {
    componentDidMount() {
        if (!this.props.DeploymentsReducer.data.length) {
            // console.log(this.props.DeploymentsReducer.data);
            this.props.onGetNamespaces(this.props.params.idName);
        }
    }
    handleClickDeployment(name) {
        browserHistory.push('/Namespaces/' + this.props.params.idName + '/Deployments/' + name);
    }
    // handleClose(e) {
    //     e.stopPropagation();
    // }
    // handleClickDeletingDeployment(name) {
    //     this.props.onDeleteDeployment(name);
    // }
    render() {
        // console.log(this.props);
        const linkedDepName = Object.keys(this.props.GetServiceReducer.data).length ? this.props.GetServiceReducer.data.deployment : null;
        let isFetchingDeploymentsContains = '';
        if (this.props.DeploymentsReducer.isFetching === false) {
            const linkedDep = this.props.DeploymentsReducer.data.find(item => {
                if (item.name === linkedDepName) {
                    return item;
                }
            });
            const depName = linkedDep ? linkedDep.name : '';
            const cpu = linkedDep ? linkedDep.cpu : '';
            const ram = linkedDep ? linkedDep.ram : '';
            const id = linkedDep ? `item_${depName}` : '';
            isFetchingDeploymentsContains =
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
                </tr>;
        } else {
            isFetchingDeploymentsContains = <Spinner />;
        }
        return (
            <div className="content-block-content full">
                <div className="tab-content">
                    <div className="tab-pane fade show deployments active">
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
                                {isFetchingDeploymentsContains}
                            </tbody>
                        </table>
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
        DeploymentsReducer: state.DeploymentsReducer,
        DeleteDeploymentReducer: state.DeleteDeploymentReducer
    };

}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetNamespaces: (idName) => {
            dispatch(getDeployments(idName));
        },
        onDeleteDeployment: (idName, idDep) => {
            dispatch(deleteDeployment(idName, idDep));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDeployment);
