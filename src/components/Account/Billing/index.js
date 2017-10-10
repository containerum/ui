import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfileSidebar from '../ProfileSidebar';
import { getProfileBalance } from '../../../actions/BillingActions/getProfileBalanceAction';

class Billing extends Component {
    componentDidMount() {
        this.props.onGetProfileBalance();
    }
    render() {
        console.log(this.props.GetProfileBalanceReducer);
        return (
            <div className="content-block ">
                <div className=" container no-back">
                    <div className="row double two-columns">
                        <ProfileSidebar />
                        <div className="col-md-9 col-lg-9 col-xl-10">
                            <div className="content-block">
                                <div className="content-block-container container container-fluid">
                                    <div className="block-item" id="information">
                                        <div className="block-item__title">Information</div>
                                        <div className="row billing-content-row">
                                            <div className="col-md-4">
                                                <div className="billing-content-text inline">Status: </div>
                                                <div className="billing-information-status-info inline">Active</div>
                                            </div>

                                            <div className="col-md-8">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <div className="billing-information-data">Balance</div>
                                                        <div className="billing-information-data">Month usage</div>
                                                        <div className="billing-information-data">Daily usage</div>
                                                        <div className="billing-information-data">Paid up to</div>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="billing-information-data fw-normal">35 $</div>
                                                        <div className="billing-information-data">140 $</div>
                                                        <div className="billing-information-data">5 $</div>
                                                        <div className="billing-information-data">13/09/2017</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="block-item" id="add-funds">
                                        <div className="block-item__title">Add funds</div>
                                        <form action="" className="" method="">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="light-text">Здесь что-то написано важное про<br />PayPall</div>
                                                </div>
                                                <div className="col-md-7">
                                                    <div className="form-group pt-0">
                                                        <input type="text" className="form-group__input-text form-control" id="text" />
                                                            <label className="form-group__label" htmlFor="text">Написать текст</label>
                                                            <div className="form-group__helper"> </div>
                                                    </div>
                                                    <div className="form-group pt-0">
                                                        <input type="submit" value="Add funds by Pay Pall" className="button_blue btn btn-outline-primary " />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="block-item" id="history">
                                        <div className="block-item__title">History</div>
                                        <div className="row">
                                            <div className="block-item__history col-md-12">
                                                <table className="block-item__history-table content-block__table table">
                                                    <tbody>
                                                        <tr>
                                                            <td className="w-25 table-border">13/08/2017</td>
                                                            <td className="w-25 table-border">write-offs</td>
                                                            <td className="w-50 table-border">35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>12/08/2017</td>
                                                            <td>adding funds</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>11/08/2017</td>
                                                            <td>adding funds</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/08/2017</td>
                                                            <td>adding funds</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>13/08/2017</td>
                                                            <td>write-offs</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>12/08/2017</td>
                                                            <td>adding funds</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>11/08/2017</td>
                                                            <td>adding funds</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/08/2017</td>
                                                            <td>adding funds</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>13/08/2017</td>
                                                            <td>write-offs</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>12/08/2017</td>
                                                            <td>adding funds</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>11/08/2017</td>
                                                            <td>adding funds</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/08/2017</td>
                                                            <td>adding funds</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>13/08/2017</td>
                                                            <td>write-offs</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>12/08/2017</td>
                                                            <td>adding funds</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>11/08/2017</td>
                                                            <td>adding funds</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/08/2017</td>
                                                            <td>adding funds</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>13/08/2017</td>
                                                            <td>write-offs</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>12/08/2017</td>
                                                            <td>adding funds</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>11/08/2017</td>
                                                            <td>adding funds</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/08/2017</td>
                                                            <td>adding funds</td>
                                                            <td>35 $</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination pagination-sm">
                                                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                            </ul>
                                        </nav>
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
    GetProfileBalanceReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        GetProfileBalanceReducer: state.GetProfileBalanceReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetProfileBalance: () => {
            dispatch(getProfileBalance());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
