import React, { Component } from 'react';
import Switch from 'react-toggle-switch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../../../../node_modules/react-toggle-switch/dist/css/switch.min.css';
import './Subscription.css';
import { subscriptionsEmail } from '../../../actions/EmailSubscriptionsActions';

class Subscription extends Component {
    constructor() {
        super();
        this.state = {
            on: false
        };
        this.handleToggleSwitch = this.handleToggleSwitch.bind(this);
    }
    handleToggleSwitch() {
        this.setState({
            on: !this.state.on
        });
        // console.log(this.state.on);
        this.props.onSubscriptionsEmail(this.state.on);
    }
    render() {
        return (
            <div className="card mt-3">
                <div className="card-block c-table-card-block">
                    <table className="table i-table-card">
                        <tbody>
                            <tr>
                                <td className="first-td-width">
                                    <h2 id="email-subscriptions">
                                        <a name="email-subscriptions" className="anchor" href="#email-subscriptions">E-mail subscriptions</a>
                                    </h2>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    By subscribing to our email newsletter, you will be opting to
                                    receive updates about new feature releases,<br/> discounts and promotional codes,
                                    security updates and more
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    If you`re not interested in receiving this content, please uncheck the
                                    box below to unsubscribe.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Switch
                                        on={this.state.on}
                                        onClick={this.handleToggleSwitch}
                                    /> Subscribe to new letters
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

Subscription.propTypes = {
    onSubscriptionsEmail: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        ConvertToCompanyReducer: state.ConvertToCompanyReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubscriptionsEmail: stateOn => {
            dispatch(subscriptionsEmail(stateOn));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
