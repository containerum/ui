import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sendSupport } from '../../actions/SupportActions';
import BackPanel from '../BackPanel';
import './Support.css';

class Support extends Component {
    handleOnSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const textArea = form.elements.textArea.value;
        const reqObj = {
            subject: this.refs.subject.value,
            textArea: textArea
        };
        this.props.onSendSupport(reqObj);
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
                            <h2>New Support Ticket</h2><br/>
                            <form onSubmit={this.handleOnSubmit.bind(this)}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="subject"
                                        ref="subject"
                                        className="form-control"
                                        placeholder="Subject"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        name="textArea"
                                        ref="textArea"
                                        rows="10"
                                        placeholder="Problem description"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary pull-right">Submit Ticket</button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

Support.propTypes = {
    onSendSupport: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { SupportReducer } = state;

    return {
        SupportReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSendSupport: reqObj => {
            dispatch(sendSupport(reqObj));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Support);
