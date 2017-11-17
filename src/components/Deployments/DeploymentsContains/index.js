import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { timeago } from '../../../functions/timeago';

import deploy from '../../../images/deploy.png';
import NotFoundDeployments from '../NotFoundDeployments';
import DeleteModal from '../../CustomerModal/DeleteModal';
import Spinner from '../../Spinner';

class DeploymentsContains extends Component {
    constructor() {
        super();
        this.state = {
            isOpened: false,
            depName: '',
            countOfDeployments: 0
        }
    }
    componentDidMount() {
        this.setState({
            ...this.state,
            countOfDeployments: this.props.DeploymentsReducer.data ?
                this.props.DeploymentsReducer.data.length : 0
        })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.DeleteDeploymentReducer) {
            this.setState({
                ...this.state,
                depName: '',
                isOpened: false
            });
        }
        if (nextProps.DeleteDeploymentReducer.isFetching === false &&
            nextProps.DeleteDeploymentReducer.status === 202 &&
            nextProps.DeleteDeploymentReducer.deploymentName) {
            this.setState({
                ...this.state,
                countOfDeployments: this.state.countOfDeployments - 1
            });
            const id = `item_${nextProps.DeleteDeploymentReducer.deploymentName}`;
            if (typeof window !== 'undefined') {
                const el = document.getElementById(id);
                el ? el.remove() : el;
            }
        }
    }
    handleClickDeployment(name) {
        if (typeof window !== 'undefined') {
            browserHistory.push('/Namespaces/' + this.props.idName + '/Deployments/' + name);
        }
    }
    handleClose(e) {
        e.stopPropagation();
    }
    handleClickDeletingDeployment(name) {
        this.setState({
            ...this.state,
            depName: name,
            isOpened: true
        });
    }
    render() {
        const ta = timeago();
        // console.log(this.props.DeploymentsReducer.data);
        // console.log(this.state.countOfDeployments);
        let isDeploymentsEmpty = '';
        let isFetchingDeleteDep = '';
        if (this.props.DeleteDeploymentReducer.isFetching) {
            isFetchingDeleteDep = <Spinner />;
        }
        if (this.state.countOfDeployments) {
            isDeploymentsEmpty =
                <div className="content-block-content full">
                    <div className="tab-content">
                        <div className="tab-pane deployments active">
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
                                {
                                    this.props.DeploymentsReducer.data.map((item, index) => {
                                        const milliseconds = Date.parse(item.created_at);
                                        const dateHours = new Date(milliseconds);
                                        const dateValue = ta.ago(dateHours, true);
                                        const cpu = item.cpu;
                                        const id = `item_${item.name}`;
                                        const podsActive = item.pods_active;
                                        const podsLimit = item.pods_limit;
                                        return (
                                            <tr
                                                key={index}
                                                className="tr-table-hover"
                                                id={id}
                                                onClick={name => this.handleClickDeployment(item.name)}
                                            >
                                                <td className="td-1"><img src={deploy} /></td>
                                                <td className="td-2">{item.name}</td>
                                                <td className="td-3">{podsActive} / {podsLimit}</td>
                                                <td className="td-4">{item.ram}</td>
                                                <td className="td-5">{cpu}</td>
                                                <td className="td-6">{dateValue}</td>
                                                <td className="td-7">
                                                    {/*<div className="warning"> </div>*/}
                                                </td>
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
                                                            onClick={name => this.handleClickDeletingDeployment(item.name)}
                                                        >Delete</button>
                                                    </ul>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>

                            <DeleteModal
                                type="Deployment"
                                name={this.state.depName}
                                isOpened={this.state.isOpened}
                                onHandleDelete={this.props.onDeleteDeployment}
                            />
                        </div>
                    </div>
                </div>
        } else {
            isDeploymentsEmpty = <NotFoundDeployments/>
        }
        return (
            <div>
                { isFetchingDeleteDep }
                { isDeploymentsEmpty }
            </div>
        );
    }
}

DeploymentsContains.propTypes = {
    idName: PropTypes.string.isRequired,
    onDeleteDeployment: PropTypes.func
};

function mapStateToProps(state) {
    return {
        DeploymentsReducer: state.DeploymentsReducer,
        DeleteDeploymentReducer: state.DeleteDeploymentReducer
    };

}

export default connect(mapStateToProps)(DeploymentsContains);
