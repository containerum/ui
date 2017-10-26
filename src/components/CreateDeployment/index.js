import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { onCreateDeployment } from '../../actions/CreateDeploymentActions';

class CreateDeployment extends Component {
    componentDidMount() {
        this.props.onCreateDeployment();
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
    onCreateDeployment: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { CreateDeploymentReducer } = state;

    return {
        CreateDeploymentReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateDeployment: () => {
            dispatch(onCreateDeployment());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeployment);
