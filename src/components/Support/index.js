import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sendSupport } from '../../actions/SupportActions';
import { getGroupOmnidesk } from '../../actions/getGroupOmnideskActions';
import { getProfile } from '../../actions/ProfileActions/getProfileActions';
// import BackPanel from '../BackPanel';
import './Support.css';
import MiniSpinner from '../MiniSpinner';

class Support extends Component {
    constructor() {
        super();
        this.state = {
            textArea: ''
        };
    }
    componentWillMount() {
        if (!!this.props.GetProfileReducer.data.login) {
            this.props.onLoadProfileData();
        }
    }
    componentDidMount() {
        this.props.onGetGroupOmnidesk();
    }
    handleChangeTextArea(e) {
        const textArea = e.target.value;
        this.setState({
            textArea
        });
    }
    handleOnSubmit(e) {
        e.preventDefault();
        const textArea = this.state.textArea;
        const userEmail = this.props.GetProfileReducer.data.login ? this.props.GetProfileReducer.data.login : '';
        const reqObj = {
            case: {
                user_email: userEmail.trim(),
                subject: 'web-ui',
                content: textArea.trim(),
                group_id: this.refs.group.value.trim()
            }
        };
        this.props.onSendSupport(reqObj);
    }
    render() {
        const groupData = this.props.GroupOmnideskReducer.data ? this.props.GroupOmnideskReducer.data : [];
        const profileButtonText = this.props.SupportReducer.isFetching ? <MiniSpinner /> : 'Submit Ticket';
        const isActiveProfileButton = this.props.SupportReducer.isFetching ?
            'feedback-form__submit btn disabled' :
            'feedback-form__submit btn';
        const isActiveProfileState = !!this.props.SupportReducer.isFetching;
        return (
            <div>
                {/*<BackPanel />*/}
                <div className="content-block ">
                    <div className="content-block-container container no-back">
                        <div className="content-block-content ">
                            <div className="feedback-form">
                                <div className="feedback-form__title title">New support ticket</div>
                                <div className="form-group">
                                    <form onSubmit={this.handleOnSubmit.bind(this)}>
                                        <div className="input-group select">
                                            <select
                                                name="category"
                                                id="feedback-category"
                                                className="custom-select"
                                                ref="group"
                                                required>
                                                {Object.keys(groupData).map((item) => {
                                                    if (!Number.isInteger(groupData[item])) {
                                                        return (
                                                            <option
                                                                key={groupData[item].group.group_id}
                                                                value={groupData[item].group.group_id}
                                                            >{groupData[item].group.group_title}</option>
                                                        );
                                                    }
                                                })}
                                            </select>
                                            <label htmlFor="feedback-category"> </label>
                                        </div>
                                        <div className="input-group">
                                            <textarea
                                                name="textArea"
                                                className="form-control"
                                                value={this.state.textArea}
                                                onChange={this.handleChangeTextArea.bind(this)}
                                                placeholder="Problem description"
                                                ref="textArea"
                                                rows="10"
                                                required
                                            > </textarea>
                                        </div>
                                        <div className="feedback-form__buttons btn-block">
                                            <button
                                                ref="button"
                                                type="submit"
                                                className={isActiveProfileButton}
                                                disabled={isActiveProfileState}
                                            >
                                                { profileButtonText }
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Support.propTypes = {
    onSendSupport: PropTypes.func.isRequired,
    GetProfileReducer: PropTypes.object,
    SupportReducer: PropTypes.object,
    GroupOmnideskReducer: PropTypes.object,
    onLoadProfileData: PropTypes.func,
    onGetGroupOmnidesk: PropTypes.func
};

function mapStateToProps(state) {
    return {
        SupportReducer: state.SupportReducer,
        GetProfileReducer: state.GetProfileReducer,
        GroupOmnideskReducer: state.GroupOmnideskReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetGroupOmnidesk: () => {
            dispatch(getGroupOmnidesk());
        },
        onSendSupport: reqObj => {
            dispatch(sendSupport(reqObj));
        },
        onLoadProfileData: () => {
            dispatch(getProfile());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Support);
