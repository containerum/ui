import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { getDeployments } from '../../actions/DeploymentsActions';
import Posts from './Posts';

class Deployments extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getDeployments('default'));
    }
    handleClickTR(href) {
        browserHistory.push('/Namespaces/default/Deployments/' + href);
    }
    render() {
        let isFetchingComponent = "";
        if (this.props.DeploymentsReducer.isFetching === false) {
            isFetchingComponent =
                <Posts
                    deploymentsDataReducer={this.props.DeploymentsReducer.data}
                    deploymentsErrorMessageReducer={this.props.DeploymentsReducer.errorMessage}
                />
        } else {
            isFetchingComponent =
                <div className="container-fluid pt-3 pb-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="card mt-3">
                                <div className="card-block c-table-card-block">
                                    <table className="table table-hover c-table-card">
                                        <tbody>
                                        <tr>
                                            <td className="i-table-td" onClick={href => this.handleClickTR('demo')}>
                                                <div className="i-table-inline col-3">
                                                    <img className="c-table-card-img mr-1" src="https://www.gravatar.com/avatar/3e2e9bb0425bbbd60b03f2b62a4d821d?s=328&d=identicon&r=PG&f=1" alt="" />
                                                    Deployments name(demo)
                                                </div>
                                                <div className="i-table-inline col-2">1/3 Pods</div>
                                                <div className="i-table-inline col-2">0.571 CPU</div>
                                                <div className="i-table-inline col-2">1024 MB RAM</div>
                                                <div className="i-table-inline col-2">nginx</div>
                                            </td>
                                            <td className="text-right">
                                                <div className="i-table-inline">
                                                    <div className="btn-group">
                                                        <button className="btn btn-sm dropdown-toggle c-table-card-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Action
                                                        </button>
                                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                                                            <button className="dropdown-item text-danger" type="button">Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        }

        return (
            <div>
                { isFetchingComponent }
            </div>
        );
    }
}

Deployments.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps (state) {
    const { DeploymentsReducer } = state;
    const { errorMessage } = DeploymentsReducer;

    return {
        errorMessage,
        DeploymentsReducer
    }
}

export default connect(mapStateToProps)(Deployments)
