import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import scrollToComponent from 'react-scroll-to-component';
import ReactGA from 'react-ga';

import ProfileSidebar from '../ProfileSidebar';
import Paginator from '../../Paginator';
import Information from './Information';
import AddFunds from './AddFunds';
import Coupon from '../Coupon';
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
	    this.props.onGetProfileBalance();

        const page = this.props.location.query.page ? parseInt(this.props.location.query.page) : false;
        if (page) {
            this.props.onGetProfileReport(page);
            this.setState({
                currentPage: page
            });
        } else {
            this.props.onGetProfileReport()
        }
        ReactGA.event({
            category: 'UI',
            action: 'UI_billing_visit'
        });
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
        let isFetchingInformation = '';
        const countPages = this.props.GetProfileReportReducer.data.pages;

        if (this.props.GetProfileBalanceReducer.isFetching === false &&
            this.props.GetTariffsReducer.isFetching === false &&
	        this.props.GetProfileReportReducer.isFetching === false) {
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
            isFetchingInformation =
                <div className="content-block-container container container-fluid">
                    <Information
                        statusUser={statusUser}
                        balance={balance}
                        monthUsage={monthUsage}
                        dailyUsage={dailyUsage}
                        formatDateToActive={formatDateToActive}
                    />
                    <AddFunds />
                    <Coupon />
                    <div className="block-item" id="history" ref="scrollView">
                        <div className="block-item__title">History</div>
                        <div className="row">
                            <div className="block-item__history col-md-12">
                                <table className="block-item__history-table content-block__table table">
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
								            }) :
                                            <tr className="light-text">
                                                <td>Your billing history will be displayed here</td>
                                            </tr>
						            }
                                    </tbody>
                                </table>
                            </div>
                            <nav>
					            {
						            countPages > 1 ?
                                        <Paginator
                                            countPage={countPages > 25 ? 25 : countPages}
                                            currentPage={this.state.currentPage}
                                        /> : ''
					            }
                            </nav>
                        </div>
                    </div>
                </div>
        } else {
	        isFetchingInformation = <img src={require('../../../images/billing-main.svg')} style={{marginTop: '28px', width: '100%'}} />;
        }

        return (
            <div>
                <div className="content-block">
                    <div className=" container no-back">
                        <div className="row double two-columns">
                            <ProfileSidebar
                                isFetchingReport={this.props.GetProfileReportReducer.isFetching}
                            />
                            <div className="col-md-9 col-lg-9 col-xl-10">
                                <div className="content-block">
                                    { isFetchingInformation }
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
