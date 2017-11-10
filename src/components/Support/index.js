import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Dropzone from 'react-dropzone';

import { sendSupport } from '../../actions/SupportActions';
import { getGroupOmnidesk } from '../../actions/getGroupOmnideskActions';
import { getProfile } from '../../actions/ProfileActions/getProfileAction';
// import BackPanel from '../BackPanel';
import './Support.css';
import MiniSpinner from '../MiniSpinner';

class Support extends Component {
    constructor() {
        super();
        this.state = {
            textArea: '',
            files: []
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
    // onDrop(files) {
    //     this.setState({
    //         ...this.state,
    //         files
    //     });
    // }
    // onDropAccepted(files) {
    //     console.log(files)
    // }
    // onDropRejected(files) {
    //     console.log(files)
    // }
    // onFileDialogCancel(files) {
    //     console.log(files)
    // }
    // handleDeleteImage(imageName) {
    //     const newFiles = this.state.files.filter(file => {
    //         return file.name !== imageName;
    //     });
    //     this.setState({
    //         ...this.state,
    //         files: newFiles
    //     });
    // }
    render() {
        const groupData = this.props.GroupOmnideskReducer.data ? this.props.GroupOmnideskReducer.data : [];
        const profileButtonText = this.props.SupportReducer.isFetching ? <MiniSpinner /> : 'Submit Ticket';
        const isActiveProfileButton = this.props.SupportReducer.isFetching ?
            'feedback-form__submit btn disabled' :
            'feedback-form__submit btn';
        const isActiveProfileState = !!this.props.SupportReducer.isFetching;
        // console.log(this.state.files.map(f => {
        //     return f;
        // }));
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
                                                placeholder="Having a trouble with deployment or need assistance?&#13;&#10;Describe your issue here and we'll get back to you shortly."
                                                ref="textArea"
                                                rows="10"
                                                required
                                            > </textarea>
                                        </div>
                                        {/*<section style={{margin: '15px 0'}}>*/}
                                            {/*{*/}
                                                {/*this.state.files.length ?*/}
                                                    {/*<aside>*/}
                                                        {/*{*/}
                                                            {/*this.state.files.map(f =>*/}
                                                                {/*<div*/}
                                                                    {/*key={f.name}*/}
                                                                    {/*className='dropzone-item'*/}
                                                                {/*>{f.name} - {f.size} bytes <i onClick={image => this.handleDeleteImage(f.name)} className="material-icons">delete</i>*/}
                                                                {/*</div>*/}
                                                            {/*)*/}
                                                        {/*}*/}
                                                    {/*</aside> :*/}
                                                    {/*<div className='dropzone'>*/}
                                                        {/*<Dropzone*/}
                                                            {/*onDrop={this.onDrop.bind(this)}*/}
                                                            {/*onDropAccepted={this.onDropAccepted.bind(this)}*/}
                                                            {/*onDropRejected={this.onDropRejected.bind(this)}*/}
                                                            {/*onFileDialogCancel={this.onFileDialogCancel.bind(this)}*/}
                                                            {/*maxSize={15728640}*/}
                                                            {/*accept="image/x-png,image/gif,image/jpeg,application/pdf,text/plain,text/html"*/}
                                                            {/*className='dropzone-wrapper'*/}
                                                        {/*>*/}
                                                            {/*<p className='dropzone-p'><i className="material-icons">cloud_upload</i>Click here to upload image (file)</p>*/}
                                                        {/*</Dropzone>*/}
                                                    {/*</div>*/}
                                            {/*}*/}
                                        {/*</section>*/}
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
