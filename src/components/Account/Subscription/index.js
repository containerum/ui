import React, { Component } from 'react';
// import Switch from 'react-toggle-switch';
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
            <div className="block-item" id="subscriptions">
                <div className="block-item__title">E-mail subscriptions</div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="light-text">If you are not interested in receiving this content, please uncheck the box below to unsubscribe</div>
                    </div>
                    <div className="col-md-6">
                        <form action="" className="" method="">
                            <div className="form-group form-group-inline pt-0">
                                <div className="row double-2 input-group">
                                    <div className="col-md-10">
                                        <input type="checkbox" className="form-group__hidden-input" id="system-notification" />
                                        <label className="form-group__label form-group__label__inline" htmlFor="system-notification">System e-mail notifications</label>
                                        <div className="form-group__helper form-group__helper__inline">You can not turn them off</div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group__switcher"> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-group-inline pt-0">
                                <div className="row double-2 input-group">
                                    <div className="col-md-10">
                                        <input type="checkbox" className="form-group__hidden-input" id="newsletter-subscription" />
                                        <label className="form-group__label form-group__label__inline" htmlFor="newsletter-subscription">Our newsletter subscription</label>
                                        <div className="form-group__helper form-group__helper__inline">We will not spam you</div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group__switcher"> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-group-inline pt-0">
                                <div className="row double-2 input-group">
                                    <div className="col-md-10">
                                        <input
                                            type="checkbox"
                                            className="form-group__hidden-input"
                                            id="funny-cat"
                                            // checked
                                        />
                                        <label className="form-group__label form-group__label__inline" htmlFor="funny-cat">Funny cat video feed</label>
                                        <div className="form-group__helper form-group__helper__inline">You can not turn them off</div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group__switcher form-group__switcher_on"> </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
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
