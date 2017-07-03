import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCreateDeployment } from '../../actions/CreateDeploymentActions';

class CreateDeployment extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getCreateDeployment());
    }
    render() {
        return (
            <div className="container-fluid pt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-block c-table-card-block">
                                <div className="table table-hover c-table-card">
                                    NEW DEPLOYMENT
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateDeployment.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { CreateDeploymentReducer } = state;

    return {
        CreateDeploymentReducer
    };
}

export default connect(mapStateToProps)(CreateDeployment);
