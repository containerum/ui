import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import BackPanel from '../BackPanel';

class SuccessTicket extends Component {
    componentDidMount() {
        if (!this.props.location.query.num) {
            browserHistory.push('/');
        }
    }
    render() {
        return (
            <div>
                <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                    <BackPanel />
                </div>
                <div className="container support">
                    <section className="row sup-sidebar">
                        <div className="col-sm-10 col-md-8 col-xs-12 center-block">
                            <h2>Success Ticket</h2><br/>
                            <p className="text-center">Thanks for your question.</p>
                            <p className="text-center">Someone from our teem will respond you shorty.</p>
                        </div>
                    </section>
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
