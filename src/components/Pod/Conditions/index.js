import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Conditions extends Component {
    render() {
        const arrConditionsGetPodReducer = this.props.GetPodReducer.data.conditions ? this.props.GetPodReducer.data.conditions : [];
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
                                            arrConditionsGetPodReducer.map((item, index) => {
                                                const lastProbeTime = <div className="i-td-table i-td-table-pd-top i-td-table-pd-bottom i-td-table-max-width">{item.lastTransitionTime}</div>;
                                                return (
                                                    <div className="i-row-table tr-hover" key={index}>
                                                        { lastProbeTime }
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
    GetPodReducer: PropTypes.object
};

export default Conditions;
