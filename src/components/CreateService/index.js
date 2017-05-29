import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCreateService } from '../../actions/CreateServiceActions';

class CreateService extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getCreateService());
    }
    render() {
        return (
            <div className="container-fluid pt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-block c-table-card-block">
                                <div className="table table-hover c-table-card">
                                    NEW SERVICE
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateService.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps (state) {
    const { CreateServiceReducer } = state;

    return {
        CreateServiceReducer
    }
}

export default connect(mapStateToProps)(CreateService)
