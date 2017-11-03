import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

// import BackPanel from '../BackPanel';
import supportCloud from '../../images/support-cloud.png';
import supportMan from '../../images/support-man.png';

class SuccessTicket extends Component {
    componentDidMount() {
        if (!this.props.location.query.num) {
            if (typeof window !== 'undefined') {
                browserHistory.push('/');
            }
        }
    }
    render() {
        return (
            <div>
                {/*<BackPanel />*/}
                <div className="support-feedback">
                    <div className="support-feedback-content">
                        <div className="support-feedback__cloud">
                            <img src={supportCloud} alt="" />
                                <div className="support-feedback__text">Ok, we’ve received your message.</div>
                                <div className="support-feedback__note">* We'll reach out to you by email in less than 24 hours.</div>
                        </div>
                        <div className="support-feedback__man"><img src={supportMan} alt="" /></div>
                    </div>
                </div>
            </div>
        );
    }
}

SuccessTicket.propTypes = {
    SupportReducer: PropTypes.object,
    location: PropTypes.object
};

function mapStateToProps(state) {
    const { SupportReducer } = state;

    return {
        SupportReducer
    };
}

export default connect(mapStateToProps)(SuccessTicket);
