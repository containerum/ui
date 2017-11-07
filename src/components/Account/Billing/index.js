import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import scrollToComponent from 'react-scroll-to-component';

import ProfileSidebar from '../ProfileSidebar';
import Paginator from '../../Paginator';
import Information from './Information';
import AddFunds from './AddFunds';
import Spinner from '../../Spinner';
import { getProfileBalance } from '../../../actions/BillingActions/getProfileBalanceAction';
import { getTariffs } from '../../../actions/BillingActions/getTariffsAction';
import { getProfileReport } from '../../../actions/BillingActions/getProfileReportAction';

class Billing extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1
        };
    }
    componentDidMount() {
        this.props.onGetTariffs();
        if (!this.props.GetProfileBalanceReducer.data.balance) {
            this.props.onGetProfileBalance();
        }

        const page = this.props.location.query.page ? parseInt(this.props.location.query.page) : false;
        if (page) {
            this.props.onGetProfileReport(page);
            this.setState({
                currentPage: page
            });
        } else {
            this.props.onGetProfileReport()
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location.query.page !== this.props.location.query.page) {
            const page = nextProps.location.query.page ? parseInt(nextProps.location.query.page) : 1;
            this.props.onGetProfileReport(page);
            this.setState({
                currentPage: page
            });
            scrollToComponent(this.refs.scrollView);
        }
    }
    render() {
        // console.log(this.props.GetProfileReportReducer.data);
        let isFetchingReport = '';
        let isFetchingInformation = '';
        const countPages = this.props.GetProfileReportReducer.data.pages;

        if (this.props.GetProfileBalanceReducer.isFetching === false &&
            this.props.GetTariffsReducer.isFetching === false) {
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
            isFetchingInformation =
                <Information
                    statusUser={statusUser}
                    balance={balance}
                    monthUsage={monthUsage}
                    dailyUsage={dailyUsage}
                    formatDateToActive={formatDateToActive}
                />
        } else {
            isFetchingInformation = <Spinner />;
        }

        if (this.props.GetProfileReportReducer.isFetching === false)
        {
            const operations = Object.keys(this.props.GetProfileReportReducer.data).length ?
                this.props.GetProfileReportReducer.data.operations : [];
            isFetchingReport =
                <tbody>
                {
                    operations.length ? operations.map((item, index) => {
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
                    }) : <div className="light-text">Your billing history will be displayed here</div>
                }
                </tbody>;
        } else {
            isFetchingReport = <Spinner />;
        }
        return (
            <div>
                <div className="content-block">
                    <div className=" container no-back">
                        <div className="row double two-columns">
                            <ProfileSidebar />
                            <div className="col-md-9 col-lg-9 col-xl-10">
                                <div className="content-block">
                                    <div className="content-block-container container container-fluid">
                                        { isFetchingInformation }
                                        <AddFunds />
                                        <div className="block-item" id="history" ref="scrollView">
                                            <div className="block-item__title">History</div>
                                            <div className="row">
                                                <div className="block-item__history col-md-12">
                                                    <table className="block-item__history-table content-block__table table">
                                                        { isFetchingReport }
                                                    </table>
                                                </div>
                                                <nav>
                                                    {
                                                        countPages >= 2 ?
                                                            <Paginator
                                                                countPage={countPages > 25 ? 25 : countPages}
                                                                currentPage={this.state.currentPage}
                                                            /> : ''
                                                    }
                                                </nav>
                                            </div>
                                        </div>
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
        onGetProfileReport: (page = 1) => {
            dispatch(getProfileReport(page));
        },
        onGetTariffs: (monthly=1) => {
            dispatch(getTariffs(monthly));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
