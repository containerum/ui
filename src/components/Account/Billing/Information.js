import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Information extends Component {
    render() {
        return (
            <div className="block-item" id="information">
                <div className="block-item__title">Information</div>
                <div className="row billing-content-row">
                    <div className="col-md-4">
                        <div className="billing-content-text inline">Status:&nbsp;</div>
                        <div className="billing-information-status-info inline">{this.props.statusUser}</div>
                    </div>

                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="billing-information-data">Balance</div>
                                <div className="billing-information-data">Month usage</div>
                                <div className="billing-information-data">Daily usage</div>
                                {
                                    this.props.formatDateToActive ?
                                        <div className="billing-information-data">Paid up to</div> : ''
                                }
                            </div>
                            <div className="col-md-9">
                                <div className="billing-information-data fw-normal">${this.props.balance ? this.props.balance.toFixed(2) : 0}</div>
                                <div className="billing-information-data">${this.props.monthUsage ? this.props.monthUsage.toFixed(2) : 0}</div>
                                <div className="billing-information-data">${this.props.dailyUsage ? this.props.dailyUsage.toFixed(2) : 0}</div>
                                {
                                    this.props.formatDateToActive ?
                                        <div className="billing-information-data">{this.props.formatDateToActive}</div> : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Information.propTypes = {
    statusUser: PropTypes.string,
    balance: PropTypes.number,
    monthUsage: PropTypes.number,
    dailyUsage: PropTypes.number,
    formatDateToActive: PropTypes.string
};

export default Information;
