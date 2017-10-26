import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

import ProfileSidebar from '../ProfileSidebar';
import Information from './Information';
import AddFunds from './AddFunds';
import Spinner from '../../Spinner';
import { getProfileBalance } from '../../../actions/BillingActions/getProfileBalanceAction';
import { getTariffs } from '../../../actions/BillingActions/getTariffsAction';
import { getProfileReport } from '../../../actions/BillingActions/getProfileReportAction';

class Billing extends Component {
    componentDidMount() {
        this.props.onGetProfileBalance();
        this.props.onGetTariffs();
        this.props.onGetProfileReport();
    }
    render() {
        // console.log(this.props.GetProfileReportReducer.data);
        let isFetchingComponent = '';
        if (this.props.GetProfileBalanceReducer.isFetching === false &&
            this.props.GetTariffsReducer.isFetching === false &&
            this.props.GetProfileReportReducer.isFetching === false)
        {
            const balance = parseFloat(this.props.GetProfileBalanceReducer.data.balance);
            const monthUsage = this.props.GetTariffsReducer.data.monthly_cost ? parseFloat(this.props.GetTariffsReducer.data.monthly_cost) : 0;
            const dailyUsage = monthUsage ? parseFloat(monthUsage / 30) : 0;
            let formatDateToActive = '';
            const dateNow = new Date;
            if (dailyUsage) {
                const activityDays = Math.floor(balance / dailyUsage);
                if (activityDays) {
                    dateNow.setDate(dateNow.getDate() + activityDays);
                    formatDateToActive = dateFormat(dateNow, "dd/mm/yyyy");
                }
            }
            const statusUser = '' + this.props.GetProfileReducer.data.is_active === 'true' ? 'Active' : 'Inactive';
            const operations = Object.keys(this.props.GetProfileReportReducer.data).length ?
                this.props.GetProfileReportReducer.data.operations : [];
            // console.log(monthUsage, dailyUsage);
            isFetchingComponent =
                <div className="content-block ">
                    <div className=" container no-back">
                        <div className="row double two-columns">
                            <ProfileSidebar />
                            <div className="col-md-9 col-lg-9 col-xl-10">
                                <div className="content-block">
                                    <div className="content-block-container container container-fluid">
                                        <Information
                                            statusUser={statusUser}
                                            balance={balance}
                                            monthUsage={monthUsage}
                                            dailyUsage={dailyUsage}
                                            formatDateToActive={formatDateToActive}
                                        />
                                        <AddFunds />
                                        <div className="block-item" id="history">
                                            <div className="block-item__title">History</div>
                                            <div className="row">
                                                <div className="block-item__history col-md-12">
                                                    <table className="block-item__history-table content-block__table table">
                                                        <tbody>
                                                        {
                                                            operations.length ? operations.map((item, index) => {
                                                                // console.log(item);
                                                                const amount = item.amount;
                                                                const date = item.date;
                                                                const info = item.info;
                                                                return (
                                                                    <tr key={index}>
                                                                        <td className="w-25 table-border">{date}</td>
                                                                        <td className="w-50 table-border">{info}</td>
                                                                        <td className="w-25 table-border">{amount}</td>
                                                                    </tr>
                                                                )
                                                            }) : ''
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            {/*<nav aria-label="Page navigation example">*/}
                                                {/*<ul className="pagination pagination-sm">*/}
                                                    {/*<li className="page-item"><a className="page-link" href="#">Previous</a></li>*/}
                                                    {/*<li className="page-item active"><a className="page-link" href="#">1</a></li>*/}
                                                    {/*<li className="page-item"><a className="page-link" href="#">2</a></li>*/}
                                                    {/*<li className="page-item"><a className="page-link" href="#">3</a></li>*/}
                                                    {/*<li className="page-item"><a className="page-link" href="#">Next</a></li>*/}
                                                {/*</ul>*/}
                                            {/*</nav>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>;
        } else {
            isFetchingComponent = <Spinner />;
        }
        return (
            <div>
                { isFetchingComponent }
            </div>
        );
    }
}

Billing.propTypes = {
    onGetProfileBalance: PropTypes.func,
    GetProfileBalanceReducer: PropTypes.object,
    GetTariffsReducer: PropTypes.object,
    GetProfileReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        GetProfileBalanceReducer: state.GetProfileBalanceReducer,
        GetTariffsReducer: state.GetTariffsReducer,
        GetProfileReducer: state.GetProfileReducer,
        GetProfileReportReducer: state.GetProfileReportReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetProfileBalance: () => {
            dispatch(getProfileBalance());
        },
        onGetProfileReport: () => {
            dispatch(getProfileReport());
        },
        onGetTariffs: (monthly=1) => {
            dispatch(getTariffs(monthly));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
