import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Conditions extends Component {
    render() {
        const arrConditionsPodReducer = this.props.PodReducer.data.conditions ? this.props.PodReducer.data.conditions : [];
        return (
            <div className="container-fluid pt-3 pb-5">
                <h5>Conditions</h5>
                <div className="row">
                    <div className="col-12">
                        <div className="card i-card-border mt-3">
                            <div className="card-block c-table-card-block">
                                <div className="table table-hover c-table-card i-table-card">
                                    <div className="i-table-tbody">
                                        {
                                            arrConditionsPodReducer.map((item, index) => {
                                                return (
                                                    <div className="i-row-table tr-hover" key={index}>
                                                        <div className="i-td-table i-td-table-pd-top i-td-table-pd-bottom">{item.lastTransitionTime}</div>
                                                        <div className="i-td-table i-td-table-pd-top i-td-table-pd-bottom">{item.status}</div>
                                                        <div className="i-td-table i-td-table-pd-top i-td-table-pd-bottom">{item.type}</div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Conditions.propTypes = {
    PodReducer: PropTypes.object
};

export default Conditions;
