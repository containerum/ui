import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import ReactFileReader from 'react-file-reader';
import ReactGA from 'react-ga';

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
            files: [],
            base64: []
        };
    }
    componentWillMount() {
        if (!!this.props.GetProfileReducer.data.login) {
            this.props.onLoadProfileData();
        }
    }
    componentDidMount() {
        this.props.onGetGroupOmnidesk();
        ReactGA.event({
            category: 'UI',
            action: 'UI_support'
        });
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
                group_id: this.refs.group.value.trim(),
                base64: this.state.base64,
                files: this.state.files
            }
        };
        if (this.state.files.length) {
            reqObj.case.files = this.state.files.map(item => {
                return item.name;
            });
        }

        this.props.onSendSupport(reqObj);
    }
    handleDeleteImage(imageName) {
        const arrBase64 = [];
        const newFiles = this.state.files.filter((file, index) => {
            if (file.name !== imageName) arrBase64.push(this.state.base64[index]);
            return file.name !== imageName;
        });

        this.setState({
            ...this.state,
            files: newFiles,
            base64: arrBase64
        });
    }
    handleFiles(files) {
        const errorFiles = [];
        const successFiles = [];
        const successBase64 = [];
        Object.keys(files.fileList).filter((item, index) => {
            if(files.fileList[item].size >= 15728640) {
                errorFiles.push(files.fileList[item]);
            } else {
                successFiles.push(files.fileList[item]);
                successBase64.push(files.base64[index]);
            }
        });
        if (errorFiles.length) {
            toastr.error(`<div>${errorFiles.map(file => (`
${file.name}`))}</div>`,
                `The following files were not downloaded because the attachment size (15 MB maximum) was exceeded:`);
        }
        this.setState({
            ...this.state,
            files: successFiles,
            base64: successBase64
        });
    }
    render() {
        toastr.options = {
            'closeButton': true,
            'debug': false,
            'newestOnTop': false,
            'progressBar': true,
            'positionClass': 'toast-top-right',
            'preventDuplicates': false,
            'onclick': null,
            'showDuration': '300',
            'hideDuration': '1000',
            'timeOut': '5000',
            'extendedTimeOut': '1000',
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        };
        const groupData = this.props.GroupOmnideskReducer.data ? this.props.GroupOmnideskReducer.data : [];
        const profileButtonText = this.props.SupportReducer.isFetching ? <MiniSpinner /> : 'Submit Ticket';
        const isActiveProfileButton = this.props.SupportReducer.isFetching ?
            'feedback-form__submit btn disabled' :
            'feedback-form__submit btn';
        const isActiveProfileState = !!this.props.SupportReducer.isFetching;
        let isFetchingGroup = '';
        if (!this.props.GroupOmnideskReducer.isFetching) {
	        isFetchingGroup =
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
                            <section style={{margin: '15px 0'}}>
						        {
							        this.state.files.length ?
                                        <aside>
									        {
										        this.state.files.map(f =>
                                                    <div
                                                        key={f.name}
                                                        className='dropzone-item'
                                                    ><span className='dropzone-item-span'>{f.name}</span>
                                                        <i onClick={image => this.handleDeleteImage(f.name)}
                                                           className="material-icons">delete</i>
                                                    </div>
										        )
									        }
                                        </aside> :
                                        <ReactFileReader
                                            fileTypes={["image/x-png", "image/gif", "image/jpeg", "application/pdf", "text/plain"]}
                                            base64={true}
                                            multipleFiles={true}
                                            handleFiles={this.handleFiles.bind(this)}
                                        >
                                            <div className='dropzone'>
                                                <p className='dropzone-p'><i className="material-icons">cloud_upload</i>Click here to upload file (.png, .gif, .jpeg, .pdf or .txt)</p>
                                            </div>
                                        </ReactFileReader>
						        }
                            </section>
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
        } else {
	        isFetchingGroup =
                <div style={{
	                width: '665px',
                    padding: '30px',
                    margin: '0 auto'
                }}>
                    <img src={require('../../images/support.svg')} />
                </div>
        }
        return (
            <div>
                {/*<BackPanel />*/}
                <div className="content-block ">
                    <div className="content-block-container container no-back">
                        { isFetchingGroup }
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
